import { db } from '../../lib/supabase'
import { RULE } from '../../data/gameData'
import { RulePeek } from '../../components/RulePeek'
import { Avatar } from '../../components/Avatar'

function JoiningNextRound() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 18px', gap: 12 }}>
      <div style={{ fontSize: 48 }}>⏳</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24 }}>joining next round</div>
      <div style={{ color: 'var(--tumlet-footer)', fontSize: 14, maxWidth: 280 }}>you'll get your secret rule when the next question starts</div>
      <div style={{ color: 'var(--tumlet-footer)', marginTop: 8 }}>hang tight<span className="typing" style={{ marginLeft: 6 }}><i /><i /><i /></span></div>
    </div>
  )
}

export default function PlayerReveal({ room, players, me }) {
  if (!me.rule_id) return <JoiningNextRound />
  const rule = me.rule_id ? RULE[me.rule_id] : null
  const authorId = room.reveal_author_id
  const author = players.find(p => p.id === authorId)
  const revealOrder = room.reveal_order || []
  const isMyAnswer = authorId === me.id
  const gamePlayers = players.filter(p => !p.is_admin)
  const upCount = gamePlayers.filter(p => p.id === authorId || p.hand_raised).length

  async function toggleHand() {
    if (isMyAnswer || room.reveal_finalized) return
    await db.from('chatjpt_players').update({ hand_raised: !me.hand_raised }).eq('id', me.id)
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {rule && <RulePeek rule={rule} />}
      <div style={{ flex: 1, padding: '12px 16px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--tumlet-footer)', marginBottom: 12 }}>
          reveal · answer {(room.reveal_index || 0) + 1} of {revealOrder.length}
        </div>
        <div className="slideup" key={authorId} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🤖</div>
          <div style={{ background: 'var(--tumlet-paper)', border: '2px solid var(--tumlet-ink)', borderRadius: '4px 18px 18px 18px', padding: '14px 16px', boxShadow: '4px 4px 0 0 var(--tumlet-yellow)', flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tumlet-footer)' }}>{author ? author.name : '…'} answered</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, lineHeight: 1.25, marginTop: 4 }}>"{author ? author.answer : '…'}"</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
            {gamePlayers.map(p => {
              const up = p.id === authorId || p.hand_raised
              return (
                <div key={p.id} style={{ position: 'relative' }}>
                  {up && <div className="hand-pop" style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 16 }}>✋</div>}
                  <Avatar player={p} size={36} dim={!up} />
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
            {upCount} / {gamePlayers.length} hands up
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ paddingBottom: 18 }}>
          {room.reveal_finalized ? (
            <div className="hand-pop" style={{ background: room.reveal_scored ? 'var(--tumlet-green)' : 'var(--tumlet-ink)', color: '#fff', border: '3px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'center', boxShadow: room.reveal_scored ? '6px 6px 0 0 var(--tumlet-yellow)' : '5px 5px 0 0 var(--tumlet-red)' }}>
              <div style={{ fontSize: 36 }}>{room.reveal_scored ? '🎉' : '🙅'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, marginTop: 4 }}>
                {room.reveal_scored ? `ALL hands up! +1 for ${author ? author.name : '…'}` : 'not everyone bit.'}
              </div>
              <div style={{ fontSize: 13, opacity: .85, marginTop: 4 }}>
                {room.reveal_scored ? 'every secret rule was satisfied 🤯' : "no point — that's the brutal math"}
              </div>
            </div>
          ) : isMyAnswer ? (
            <div style={{ background: 'var(--tumlet-yellow)', border: '2px solid var(--tumlet-ink)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center', boxShadow: '4px 4px 0 0 var(--tumlet-brown)' }}>
              <div style={{ fontSize: 30 }}>🎤</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginTop: 4 }}>that's YOUR answer on stage</div>
              <div style={{ fontSize: 13, color: 'var(--tumlet-brown)', marginTop: 2 }}>sit tight — see who raises for you</div>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--tumlet-footer)', marginBottom: 10 }}>
                does this answer secretly satisfy <b>{rule ? `${rule.glyph} ${rule.label}` : 'your rule'}</b>?
              </div>
              <button onClick={toggleHand} style={{
                width: '100%', border: '3px solid var(--tumlet-ink)', cursor: 'pointer',
                borderRadius: 'var(--radius-lg)', padding: '22px 16px',
                background: me.hand_raised ? 'var(--tumlet-ink)' : 'var(--tumlet-yellow)',
                color: me.hand_raised ? 'var(--tumlet-yellow)' : 'var(--tumlet-ink)',
                boxShadow: me.hand_raised ? '2px 2px 0 0 var(--tumlet-red)' : '6px 6px 0 0 var(--tumlet-red)',
                transform: me.hand_raised ? 'translate(4px,4px) rotate(-0.88deg)' : 'rotate(-0.88deg)',
                transition: 'transform .1s ease,box-shadow .1s ease,background .15s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <span className={me.hand_raised ? 'hand-pop' : ''} style={{ fontSize: 46, lineHeight: 1 }}>✋</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>
                  {me.hand_raised ? "hand's up!" : 'Raise Hand'}
                </span>
                {me.hand_raised && <span style={{ fontSize: 12, fontWeight: 700, opacity: .85 }}>tap to lower</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
