import { useState } from 'react'
import { db } from '../../lib/supabase'
import { RULE, pColor } from '../../data/gameData'
import { useTimer } from '../../hooks/useTimer'
import { RulePeek } from '../../components/RulePeek'
import { Wordmark } from '../../components/Wordmark'
import { TimerRing } from '../../components/TimerRing'

export default function PlayerQuestion({ room, me }) {
  const rule = me.rule_id ? RULE[me.rule_id] : null
  const question = (room.questions || [])[room.round] || ''
  const [text, setText] = useState('')
  const locked = me.answer != null
  const rem = useTimer(room.timer_started_at, room.timer_duration)
  const passes = rule?.check ? rule.check(text) : null

  async function submit() {
    if (!text.trim()) return
    await db.from('chatjpt_players').update({ answer: text.trim() }).eq('id', me.id)
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {rule && <RulePeek rule={rule} />}
      <div style={{ flex: 1, padding: '12px 16px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Wordmark size={22} />
          <TimerRing seconds={rem} total={room.timer_duration || 60} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>❓</div>
          <div style={{ background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: '4px 16px 16px 16px', padding: '12px 14px', boxShadow: '3px 3px 0 0 var(--tumlet-yellow)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tumlet-footer)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              question {room.round + 1} of {room.total_rounds}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, lineHeight: 1.2 }}>{question}</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {locked ? (
          <div className="slideup" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <div style={{ background: pColor(me), color: '#fff', border: '2px solid var(--tumlet-ink)', borderRadius: '16px 16px 4px 16px', padding: '12px 14px', maxWidth: '85%', boxShadow: '3px 3px 0 0 var(--tumlet-ink)' }}>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{me.answer}</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', borderRadius: 'var(--radius-md)', padding: '12px', fontWeight: 700 }}>
              ✓ answer locked — waiting on the room<span className="typing" style={{ marginLeft: 8 }}><i /><i /><i /></span>
            </div>
          </div>
        ) : (
          <div style={{ paddingBottom: 16 }}>
            <textarea autoFocus value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="type your answer…"
              style={{ width: '100%', resize: 'none', padding: '12px 14px', fontSize: 17, borderRadius: 'var(--radius-md)', background: 'var(--tumlet-paper)', boxSizing: 'border-box' }} />
            {rule && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '6px 2px 8px', fontSize: 13, fontWeight: 700, color: text.trim() ? (passes === true ? 'var(--tumlet-green)' : 'var(--tumlet-footer)') : 'var(--tumlet-footer)' }}>
                {text.trim() && passes !== null
                  ? (passes ? '✓ fits your rule' : "✗ doesn't fit your rule yet")
                  : `${rule.glyph} ${rule.label}`}
              </div>
            )}
            <button className="pill-btn" disabled={!text.trim()} onClick={submit}
              style={{ width: '100%', padding: '15px', fontSize: 19, color: '#fff', background: text.trim() ? 'var(--tumlet-red)' : '#cbbfae', boxShadow: text.trim() ? '5px 5px 0 0 var(--tumlet-ink)' : 'none', border: 0 }}>
              send answer →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
