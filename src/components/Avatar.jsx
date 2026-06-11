import { pColor } from '../data/gameData'

export function Avatar({ player, size = 40, dim = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: pColor(player), color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size * 0.42, flexShrink: 0,
      border: '2px solid var(--tumlet-ink)', boxShadow: '2px 2px 0 0 rgba(19,13,1,0.25)',
      opacity: dim ? 0.32 : 1, transition: 'opacity .25s ease', userSelect: 'none',
    }}>
      {(player.name || '?')[0].toUpperCase()}
    </div>
  )
}
