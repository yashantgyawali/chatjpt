export function HBtn({ children, onClick, disabled, tone = 'red', big }) {
  const bg = disabled ? '#cbbfae'
    : tone === 'red' ? 'var(--tumlet-red)'
    : tone === 'ink' ? 'var(--tumlet-ink)'
    : 'var(--tumlet-yellow)'
  const col = disabled ? '#8a7d68' : tone === 'yellow' ? 'var(--tumlet-ink)' : '#fff'
  const shadow = disabled ? 'none'
    : tone === 'yellow' ? '5px 5px 0 0 var(--tumlet-brown)'
    : '5px 5px 0 0 var(--tumlet-ink)'
  return (
    <button
      className={disabled ? '' : 'pill-btn'}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ padding: big ? '14px 36px' : '11px 24px', fontSize: big ? 19 : 16, color: col, background: bg, border: 0, borderRadius: 'var(--radius-md)', boxShadow: shadow, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.7 : 1 }}
    >
      {children}
    </button>
  )
}
