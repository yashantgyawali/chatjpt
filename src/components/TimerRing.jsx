export function TimerRing({ seconds, total }) {
  const r = 16, c = 2 * Math.PI * r
  const frac = Math.max(0, seconds) / total
  const low = seconds <= 10
  return (
    <div style={{ position: 'relative', width: 44, height: 44 }}>
      <svg width="44" height="44" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(19,13,1,0.12)" strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none"
          stroke={low ? 'var(--tumlet-red)' : 'var(--tumlet-ink)'} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={c * (1 - frac)} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
        color: low ? 'var(--tumlet-red)' : 'var(--tumlet-ink)',
      }}>
        {Math.max(0, seconds)}
      </div>
    </div>
  )
}
