import { Wordmark } from './Wordmark'

export function HHeader({ right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <Wordmark size={30} />
      <span style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--tumlet-brown)', marginLeft: 4 }}>host deck</span>
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  )
}
