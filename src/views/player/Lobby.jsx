import { Wordmark } from '../../components/Wordmark'
import { Avatar } from '../../components/Avatar'

export default function PlayerLobby({ room, players, me }) {
  return (
    <div style={{ padding: '30px 18px 40px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Wordmark size={36} />
        <div style={{ fontFamily: 'var(--font-hand)', color: 'var(--tumlet-brown)', fontSize: 16, transform: 'rotate(-1.5deg)', marginTop: 2 }}>
          everyone's an AI. play along.
        </div>
      </div>
      <div style={{ background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: 18, boxShadow: '5px 5px 0 0 var(--tumlet-yellow)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: 'var(--tumlet-footer)' }}>room code</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '0.2em' }}>{room.code}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--tumlet-footer)', marginBottom: 8 }}>
        in the lobby · {players.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {players.map(p => (
          <div key={p.id} className="slideup" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', padding: '8px 12px' }}>
            <Avatar player={p} size={34} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {p.name}{p.id === me.id && <span style={{ color: 'var(--tumlet-red)' }}> (you)</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--tumlet-footer)' }}>{p.is_admin ? 'host' : 'player'}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--tumlet-green)' }}>ready</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--tumlet-footer)' }}>
        waiting for the host to start<span className="typing" style={{ marginLeft: 6 }}><i /><i /><i /></span>
      </div>
    </div>
  )
}
