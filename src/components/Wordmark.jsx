export function Wordmark({ size = 32 }) {
  return (
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.03em', fontSize: size, lineHeight: 1 }}>
      <span style={{ color: 'var(--tumlet-ink)' }}>chat</span>
      <span style={{ color: 'var(--tumlet-red)' }}>JPT</span>
      <span style={{ display: 'inline-block', width: '0.12em', height: '0.85em', marginLeft: 3,
        background: 'var(--tumlet-red)', transform: 'translateY(0.08em)', verticalAlign: 'middle',
        animation: 'blink 1.05s steps(1) infinite' }} />
    </span>
  )
}
