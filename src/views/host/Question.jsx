import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Avatar } from '../../components/Avatar'
import { useTimer } from '../../hooks/useTimer'

export default function HostQuestion({ room, players, me, actions }) {
  const question = (room.questions || [])[room.round] || ''
  const gamePlayers = players.filter(p => !p.is_admin)
  const answered = gamePlayers.filter(p => p.answer != null).length
  const rem = useTimer(room.timer_started_at, room.timer_duration)
  const canReveal = answered === gamePlayers.length || rem <= 0

  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: rem <= 10 ? 'var(--tumlet-red)' : 'var(--tumlet-ink)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '8px 16px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
            ⏱ {Math.max(0, rem)}s
          </div>
          <HBtn onClick={actions.startReveal} disabled={!canReveal} tone="red" big>start the reveal →</HBtn>
        </div>
      } room={room} onEnd={actions.endRoom} />
      <div style={{ background: 'var(--tumlet-yellow)', border: '3px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: '22px 26px', boxShadow: '7px 7px 0 0 var(--tumlet-ink)', marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--tumlet-brown)' }}>
          question {room.round + 1} / {room.total_rounds}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, lineHeight: 1.15, marginTop: 4 }}>{question}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>who's answered</div>
        <div style={{ fontWeight: 700, color: 'var(--tumlet-footer)' }}>{answered} / {gamePlayers.length} in</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, maxWidth: 860 }}>
        {gamePlayers.map(p => (
          <div key={p.id} style={{ background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', padding: '14px 10px', textAlign: 'center', boxShadow: p.answer != null ? '4px 4px 0 0 var(--tumlet-green)' : 'none', transition: 'box-shadow .25s' }}>
            <Avatar player={p} size={40} dim={p.answer == null} />
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 7 }}>{p.name}</div>
            <div style={{ marginTop: 5, minHeight: 20 }}>
              {p.answer != null
                ? <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--tumlet-green)' }}>✓ answered</span>
                : <span className="typing" style={{ color: 'var(--tumlet-footer)' }}><i /><i /><i /></span>}
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', color: 'var(--tumlet-footer)', fontSize: 13, marginTop: 18 }}>
        the host never sees the answers or the rules — only who's locked in.
      </p>
    </div>
  )
}
