import { useState } from 'react'

export function RulePeek({ rule }) {
  const [open, setOpen] = useState(false)
  if (!rule) return null
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '8px 14px 0' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', border: '2px solid var(--tumlet-ink)', cursor: 'pointer',
        borderRadius: 'var(--radius-md)', textAlign: 'left',
        background: open ? 'var(--tumlet-ink)' : 'var(--tumlet-yellow)',
        color: open ? 'var(--tumlet-beige)' : 'var(--tumlet-ink)',
        padding: '10px 14px', boxShadow: '3px 3px 0 0 var(--tumlet-brown)',
        fontFamily: 'var(--font-body)', transition: 'background .2s ease, color .2s ease',
        display: 'block',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.75 }}>
            🔒 your secret rule
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.8 }}>{open ? 'tap to hide' : 'tap to peek'}</span>
        </div>
        {open && (
          <div className="slideup" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>{rule.glyph}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>
              {rule.full}
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
