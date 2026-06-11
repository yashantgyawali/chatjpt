import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Avatar } from '../../components/Avatar'
import { pColor } from '../../data/gameData'

export default function HostAssign({ players, actions }) {
  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader right={<HBtn onClick={actions.startQuestion} tone="red" big>first question →</HBtn>} />
      <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 26px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28 }}>secret rules dealt 🔒</div>
        <p style={{ fontSize: 15, color: 'var(--tumlet-brown)', marginTop: 8 }}>
          every player got one private prompt rule — even you can't see theirs, and they can't see yours. follow it in <em>every</em> answer. they stick for the whole game.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14, maxWidth: 860, margin: '0 auto' }}>
        {players.map(p => (
          <div key={p.id} className="slideup" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--tumlet-ink)', borderRadius: 'var(--radius-md)', padding: '22px 8px', boxShadow: `5px 5px 0 0 ${pColor(p)}` }}>
              <div style={{ fontSize: 34 }}>🔒</div>
              <div style={{ color: 'var(--tumlet-beige)', fontSize: 11, fontWeight: 700, marginTop: 6 }}>rule assigned</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 10 }}>
              <Avatar player={p} size={32} />
              <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
