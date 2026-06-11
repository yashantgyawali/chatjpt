import { useState, useEffect, useRef, useMemo } from 'react'
import { db, shuffle } from './lib/supabase'
import { RULES, QUESTIONS } from './data/gameData'
import { Wordmark } from './components/Wordmark'
import { Confetti } from './components/Confetti'
import { Splash } from './components/Splash'
// Host views
import HostLobby from './views/host/Lobby'
import HostAssign from './views/host/Assign'
import HostQuestion from './views/host/Question'
import HostReveal from './views/host/Reveal'
import HostScore from './views/host/Score'
import HostEnd from './views/host/End'
// Player views
import PlayerLobby from './views/player/Lobby'
import PlayerAssign from './views/player/Assign'
import PlayerQuestion from './views/player/Question'
import PlayerReveal from './views/player/Reveal'
import PlayerScore from './views/player/Score'
import PlayerEnd from './views/player/End'

export function App() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('chatjpt') || 'null') }
    catch { return null }
  })
  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [confetti, setConfetti] = useState(0)
  const prevRoom = useRef(null)

  const me = useMemo(() => players.find(p => p.id === session?.playerId) || null, [players, session])

  useEffect(() => {
    if (room?.reveal_finalized && !prevRoom.current?.reveal_finalized && room?.reveal_scored) {
      setConfetti(k => k + 1)
    }
    prevRoom.current = room
  }, [room])

  useEffect(() => {
    if (!session) return
    setLoading(true)
    let ch1, ch2

    async function load() {
      const { data: r } = await db.from('chatjpt_rooms').select('*').eq('code', session.roomCode).single()
      if (!r) {
        localStorage.removeItem('chatjpt')
        setSession(null)
        setLoading(false)
        return
      }
      setRoom(r)
      const { data: ps } = await db.from('chatjpt_players').select('*').eq('room_code', session.roomCode).order('sort_order')
      setPlayers(ps || [])
      setLoading(false)

      ch1 = db.channel(`room:${session.roomCode}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chatjpt_rooms', filter: `code=eq.${session.roomCode}` },
          p => setRoom(p.new))
        .subscribe()

      ch2 = db.channel(`players:${session.roomCode}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chatjpt_players', filter: `room_code=eq.${session.roomCode}` },
          p => {
            if (p.eventType === 'INSERT') setPlayers(prev => [...prev, p.new].sort((a, b) => a.sort_order - b.sort_order))
            else if (p.eventType === 'UPDATE') setPlayers(prev => prev.map(x => x.id === p.new.id ? p.new : x))
            else if (p.eventType === 'DELETE') setPlayers(prev => prev.filter(x => x.id !== p.old.id))
          })
        .subscribe()
    }

    load()
    return () => {
      if (ch1) db.removeChannel(ch1)
      if (ch2) db.removeChannel(ch2)
    }
  }, [session])

  const actions = {
    setRounds: async n => {
      const questions = shuffle(QUESTIONS).slice(0, n)
      await db.from('chatjpt_rooms').update({ total_rounds: n, questions }).eq('code', session.roomCode)
    },
    startGame: async () => {
      const ids = shuffle(RULES.map(r => r.id))
      const nonAdmins = players.filter(p => !p.is_admin)
      await Promise.all(nonAdmins.map((p, i) => db.from('chatjpt_players').update({ rule_id: ids[i % ids.length] }).eq('id', p.id)))
      await db.from('chatjpt_rooms').update({ phase: 'assign' }).eq('code', session.roomCode)
    },
    startQuestion: async () => {
      await db.from('chatjpt_players').update({ answer: null, hand_raised: false }).eq('room_code', session.roomCode)
      await db.from('chatjpt_rooms').update({ phase: 'question', timer_started_at: new Date().toISOString(), timer_duration: 60 }).eq('code', session.roomCode)
    },
    startReveal: async () => {
      const order = shuffle(players.filter(p => !p.is_admin).map(p => p.id))
      const firstId = order[0]
      await db.from('chatjpt_rooms').update({ phase: 'reveal', reveal_order: order, reveal_index: 0, reveal_author_id: firstId, reveal_finalized: false, reveal_scored: false }).eq('code', session.roomCode)
    },
    advanceReveal: async () => {
      if (!room) return
      if (!room.reveal_finalized) {
        const others = players.filter(p => p.id !== room.reveal_author_id && !p.is_admin)
        const allRaised = others.length > 0 && others.every(p => p.hand_raised)
        if (allRaised) {
          const author = players.find(p => p.id === room.reveal_author_id)
          if (author) await db.from('chatjpt_players').update({ score: (author.score || 0) + 1 }).eq('id', author.id)
        }
        await db.from('chatjpt_rooms').update({ reveal_finalized: true, reveal_scored: allRaised }).eq('code', session.roomCode)
      } else {
        const order = room.reveal_order || []
        const nextIdx = (room.reveal_index || 0) + 1
        await db.from('chatjpt_players').update({ hand_raised: false }).eq('room_code', session.roomCode)
        if (nextIdx < order.length) {
          await db.from('chatjpt_rooms').update({ reveal_index: nextIdx, reveal_author_id: order[nextIdx], reveal_finalized: false, reveal_scored: false }).eq('code', session.roomCode)
        } else {
          await db.from('chatjpt_rooms').update({ phase: 'score' }).eq('code', session.roomCode)
        }
      }
    },
    nextQuestion: async () => {
      if (!room) return
      const isLast = room.round >= room.total_rounds - 1
      if (isLast) {
        await db.from('chatjpt_rooms').update({ phase: 'end' }).eq('code', session.roomCode)
      } else {
        await db.from('chatjpt_players').update({ answer: null, hand_raised: false }).eq('room_code', session.roomCode)
        await db.from('chatjpt_rooms').update({ phase: 'question', round: room.round + 1, timer_started_at: new Date().toISOString(), timer_duration: 60, reveal_order: null, reveal_index: 0, reveal_author_id: null, reveal_finalized: false, reveal_scored: false }).eq('code', session.roomCode)
      }
    },
    resetGame: async () => {
      if (!room) return
      const questions = shuffle(QUESTIONS).slice(0, room.total_rounds)
      await db.from('chatjpt_players').update({ answer: null, hand_raised: false, score: 0, rule_id: null }).eq('room_code', session.roomCode)
      await db.from('chatjpt_rooms').update({ phase: 'lobby', round: 0, questions, reveal_order: null, reveal_index: 0, reveal_author_id: null, reveal_finalized: false, reveal_scored: false }).eq('code', session.roomCode)
    },
  }

  if (!session) return <Splash onSession={setSession} />

  if (loading || !room || !me) return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <Wordmark size={36} />
      <div style={{ color: 'var(--tumlet-footer)' }}>connecting<span className="typing" style={{ marginLeft: 6 }}><i /><i /><i /></span></div>
    </div>
  )

  const props = { room, players, me, actions }

  const view = me.is_admin ? {
    lobby:    <HostLobby    {...props} />,
    assign:   <HostAssign   {...props} />,
    question: <HostQuestion {...props} />,
    reveal:   <HostReveal   {...props} />,
    score:    <HostScore    {...props} />,
    end:      <HostEnd      {...props} />,
  } : {
    lobby:    <PlayerLobby    {...props} />,
    assign:   <PlayerAssign   {...props} />,
    question: <PlayerQuestion {...props} />,
    reveal:   <PlayerReveal   {...props} />,
    score:    <PlayerScore    {...props} />,
    end:      <PlayerEnd      {...props} />,
  }

  return (
    <>
      {view[room.phase] || null}
      {confetti > 0 && <Confetti key={confetti} />}
    </>
  )
}
