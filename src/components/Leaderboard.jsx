import { RULE, pColor } from '../data/gameData'
import { Avatar } from './Avatar'

export function Leaderboard({ players, me, reveal }) {
  const ranked = [...players].sort((a, b) => b.score - a.score)
  const max = Math.max(1, ...ranked.map(p => p.score))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {ranked.map((p, i) => (
        <div key={p.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: i === 0 ? 'var(--tumlet-yellow)' : 'var(--tumlet-paper)',
          border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)',
          padding: '10px 12px', boxShadow: i === 0 ? '4px 4px 0 0 var(--tumlet-ink)' : 'none',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, width: 22 }}>{i + 1}</span>
          <Avatar player={p} size={34} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}{p.id === me?.id && ' (you)'}</div>
            {reveal && p.rule_id && (
              <div style={{ fontSize: 11, color: 'var(--tumlet-footer)' }}>
                {RULE[p.rule_id]?.glyph} {RULE[p.rule_id]?.label}
              </div>
            )}
            <div style={{ height: 6, background: 'rgba(19,13,1,0.1)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', marginTop: 4 }}>
              <div style={{ width: `${(p.score / max) * 100}%`, height: '100%', background: pColor(p), borderRadius: 'var(--radius-pill)', transition: 'width .5s ease', minWidth: p.score > 0 ? 6 : 0 }} />
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>{p.score}</span>
        </div>
      ))}
    </div>
  )
}
