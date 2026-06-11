import { Wordmark } from './Wordmark'

export function HHeader({ right, room, onEnd }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
      <Wordmark size={30} />
      <span style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--tumlet-brown)' }}>host deck</span>
      {room && (
        <div style={{ background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', borderRadius: 'var(--radius-md)', padding: '4px 10px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, letterSpacing: '0.12em' }}>
          {room.code}
        </div>
      )}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {onEnd && (
          <button onClick={onEnd} style={{ padding: '7px 12px', fontSize: 12, color: 'var(--tumlet-footer)', background: 'transparent', border: '1.5px solid rgba(19,13,1,0.25)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
            end room ×
          </button>
        )}
        {right}
      </div>
    </div>
  )
}
