import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Avatar } from '../../components/Avatar'
import { pColor } from '../../data/gameData'

export default function HostLobby({ room, players, me, actions }) {
  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader right={<HBtn onClick={actions.startGame} tone="red" big>deal the rules →</HBtn>} />
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ width: 270, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--tumlet-footer)', marginBottom: 10 }}>
            join at chatjpt.party
          </div>
          <div style={{ background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', borderRadius: 'var(--radius-lg)', padding: '22px', textAlign: 'center', boxShadow: '7px 7px 0 0 var(--tumlet-yellow)' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', opacity: .7 }}>ROOM CODE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 52, letterSpacing: '0.12em', lineHeight: 1.1 }}>{room.code}</div>
          </div>
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tumlet-footer)', marginBottom: 8 }}>questions this game</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[3, 5, 8].map(n => (
                <button key={n} onClick={() => actions.setRounds(n)} style={{ flex: 1, padding: '10px 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, cursor: 'pointer', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', background: room.total_rounds === n ? 'var(--tumlet-yellow)' : 'var(--tumlet-paper)', boxShadow: room.total_rounds === n ? '3px 3px 0 0 var(--tumlet-ink)' : 'none' }}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 14 }}>
            {players.length} player{players.length === 1 ? '' : 's'} in lobby
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
            {players.map(p => (
              <div key={p.id} className="slideup" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', padding: '12px 14px', boxShadow: `4px 4px 0 0 ${pColor(p)}` }}>
                <Avatar player={p} size={40} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {p.name}{p.id === me.id && <span style={{ color: 'var(--tumlet-red)' }}> · you</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--tumlet-footer)' }}>{p.is_admin ? 'host' : 'player'}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--tumlet-green)' }}>● ready</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
