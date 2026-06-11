import { useState } from 'react'
import { RULE } from '../../data/gameData'

export default function PlayerAssign({ me }) {
  if (!me.rule_id) return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 18px', gap: 12 }}>
      <div style={{ fontSize: 48 }}>⏳</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24 }}>joining next round</div>
      <div style={{ color: 'var(--tumlet-footer)', fontSize: 14, maxWidth: 280 }}>you'll get your secret rule when the next question starts</div>
      <div style={{ color: 'var(--tumlet-footer)', marginTop: 8 }}>hang tight<span className="typing" style={{ marginLeft: 6 }}><i /><i /><i /></span></div>
    </div>
  )
  const rule = me.rule_id ? RULE[me.rule_id] : null
  const [flipped, setFlipped] = useState(false)
  return (
    <div style={{ padding: '50px 18px 40px', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--tumlet-footer)', marginBottom: 14 }}>
        you've been prompted
      </div>
      <button onClick={() => setFlipped(true)} style={{
        border: '3px solid var(--tumlet-ink)', cursor: flipped ? 'default' : 'pointer',
        borderRadius: 'var(--radius-lg)', padding: '34px 22px', minHeight: 220,
        background: flipped ? 'var(--tumlet-yellow)' : 'var(--tumlet-ink)',
        color: flipped ? 'var(--tumlet-ink)' : 'var(--tumlet-beige)',
        boxShadow: '7px 7px 0 0 var(--tumlet-red)', transition: 'background .3s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, width: '100%',
      }}>
        {!flipped ? (
          <>
            <span style={{ fontSize: 60 }}>🔒</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
              tap to reveal your<br />secret prompt rule
            </span>
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: 16, opacity: 0.7 }}>don't let the others see…</span>
          </>
        ) : rule ? (
          <div className="hand-pop">
            <div style={{ fontSize: 64 }}>{rule.glyph}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, lineHeight: 1.15, marginTop: 8 }}>{rule.full}</div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 17, marginTop: 12 }}>follow it in every answer →</div>
          </div>
        ) : <span>Loading…</span>}
      </button>
      <div style={{ marginTop: 22, fontSize: 13, color: 'var(--tumlet-footer)' }}>
        {flipped ? 'memorise it. the host is dealing the first question…' : 'this rule stays with you all game'}
      </div>
    </div>
  )
}
