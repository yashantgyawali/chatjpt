import { useState } from 'react'
import { db, genCode, genId, shuffle } from '../lib/supabase'
import { QUESTIONS } from '../data/gameData'
import { Wordmark } from './Wordmark'

export function Splash({ onSession }) {
  const [mode, setMode] = useState(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [rounds, setRounds] = useState(5)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function create() {
    if (!name.trim()) { setErr('Enter your name'); return }
    setBusy(true); setErr('')
    const roomCode = genCode(), playerId = genId()
    const questions = shuffle(QUESTIONS).slice(0, rounds)
    const { error: re } = await db.from('chatjpt_rooms').insert({ code: roomCode, total_rounds: rounds, questions })
    if (re) { setErr(re.message); setBusy(false); return }
    const { error: pe } = await db.from('chatjpt_players').insert({ id: playerId, room_code: roomCode, name: name.trim(), is_admin: true, sort_order: 0 })
    if (pe) { setErr(pe.message); setBusy(false); return }
    const s = { playerId, roomCode, isAdmin: true }
    localStorage.setItem('chatjpt', JSON.stringify(s))
    onSession(s)
  }

  async function join() {
    if (!name.trim()) { setErr('Enter your name'); return }
    if (code.length !== 6) { setErr('Enter the 6-digit room code'); return }
    setBusy(true); setErr('')
    const { data: room, error: re } = await db.from('chatjpt_rooms').select('phase').eq('code', code).single()
    if (re || !room) { setErr('Room not found'); setBusy(false); return }
    if (room.phase !== 'lobby') { setErr('Game already started'); setBusy(false); return }
    const { data: existing } = await db.from('chatjpt_players').select('id').eq('room_code', code)
    const playerId = genId()
    const { error: pe } = await db.from('chatjpt_players').insert({ id: playerId, room_code: code, name: name.trim(), is_admin: false, sort_order: (existing || []).length })
    if (pe) { setErr(pe.message); setBusy(false); return }
    const s = { playerId, roomCode: code, isAdmin: false }
    localStorage.setItem('chatjpt', JSON.stringify(s))
    onSession(s)
  }

  const card = { background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: '6px 6px 0 0 var(--tumlet-yellow)', width: '100%', maxWidth: 340 }
  const lbl = { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--tumlet-footer)', display: 'block', marginBottom: 6 }
  const inp = { width: '100%', padding: '10px 12px', fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 700 }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <Wordmark size={48} />
        <div style={{ fontFamily: 'var(--font-hand)', color: 'var(--tumlet-brown)', fontSize: 18, transform: 'rotate(-1.5deg)', marginTop: 4 }}>
          everyone's an AI. one secret rule each.
        </div>
      </div>

      {!mode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
          <button className="pill-btn" onClick={() => setMode('create')} style={{ padding: '18px', fontSize: 20, color: '#fff', background: 'var(--tumlet-red)', boxShadow: '5px 5px 0 0 var(--tumlet-ink)', border: 0 }}>
            🎮 Create a Room
          </button>
          <button className="pill-btn" onClick={() => setMode('join')} style={{ padding: '18px', fontSize: 20, color: 'var(--tumlet-ink)', background: 'var(--tumlet-yellow)', boxShadow: '5px 5px 0 0 var(--tumlet-brown)', border: 0 }}>
            🚪 Join a Room
          </button>
        </div>
      )}

      {mode && (
        <div style={card}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 18 }}>
            {mode === 'create' ? '🎮 Create Room' : '🚪 Join Room'}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Your name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex"
              onKeyDown={e => e.key === 'Enter' && (mode === 'create' ? create() : join())} style={inp} />
          </div>
          {mode === 'join' && (
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Room code</label>
              <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456"
                style={{ ...inp, fontSize: 28, letterSpacing: '0.2em' }} />
            </div>
          )}
          {mode === 'create' && (
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Questions per game</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[3, 5, 8].map(n => (
                  <button key={n} onClick={() => setRounds(n)} style={{ flex: 1, padding: '10px 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, cursor: 'pointer', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', background: rounds === n ? 'var(--tumlet-yellow)' : 'var(--tumlet-paper)', boxShadow: rounds === n ? '3px 3px 0 0 var(--tumlet-ink)' : 'none' }}>{n}</button>
                ))}
              </div>
            </div>
          )}
          {err && <div style={{ color: 'var(--tumlet-red)', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{err}</div>}
          <button className="pill-btn" disabled={busy} onClick={mode === 'create' ? create : join}
            style={{ width: '100%', padding: '14px', fontSize: 18, color: '#fff', background: busy ? '#cbbfae' : 'var(--tumlet-red)', boxShadow: busy ? 'none' : '5px 5px 0 0 var(--tumlet-ink)', border: 0 }}>
            {busy ? 'Loading…' : mode === 'create' ? 'Create →' : 'Join →'}
          </button>
          <button onClick={() => { setMode(null); setErr('') }} style={{ width: '100%', marginTop: 10, padding: '10px', fontSize: 15, color: 'var(--tumlet-footer)', background: 'transparent', border: 0, cursor: 'pointer', textDecoration: 'underline' }}>
            ← Back
          </button>
        </div>
      )}
    </div>
  )
}
