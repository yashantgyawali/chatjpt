import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Avatar } from '../../components/Avatar'

export default function HostReveal({ room, players, actions }) {
  const authorId = room.reveal_author_id
  const author = players.find(p => p.id === authorId)
  const revealOrder = room.reveal_order || []
  const gamePlayers = players.filter(p => !p.is_admin)
  const upCount = gamePlayers.filter(p => p.id === authorId || p.hand_raised).length
  const isLast = (room.reveal_index || 0) === revealOrder.length - 1
  const btnLabel = room.reveal_finalized ? (isLast ? 'round results →' : 'next answer →') : '🔒 lock the hands'

  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontWeight: 700, color: 'var(--tumlet-footer)' }}>
            answer {(room.reveal_index || 0) + 1} / {revealOrder.length}
          </div>
          <HBtn onClick={actions.advanceReveal} tone={room.reveal_finalized ? 'ink' : 'red'} big>{btnLabel}</HBtn>
        </div>
      } room={room} onEnd={actions.endRoom} />
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div className="slideup" key={authorId} style={{ background: 'var(--tumlet-paper)', border: '3px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: '24px 26px', boxShadow: '7px 7px 0 0 var(--tumlet-yellow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--tumlet-footer)', fontWeight: 700, marginBottom: 10 }}>
              {author && <Avatar player={author} size={28} />}
              <span style={{ fontWeight: 700, color: 'var(--tumlet-ink)' }}>{author ? author.name : '…'}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1.2 }}>
              "{author ? author.answer : '…'}"
            </div>
            {room.reveal_finalized && (
              <div className="slideup" style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: room.reveal_scored ? 'var(--tumlet-green)' : 'var(--tumlet-footer)' }}>
                {room.reveal_scored ? '🎉 +1 point' : 'no point'}
              </div>
            )}
          </div>
          {!room.reveal_finalized && (
            <p style={{ color: 'var(--tumlet-footer)', fontSize: 14, marginTop: 14 }}>
              players are deciding if this answer <em>secretly</em> satisfies their own rule. lock when ready.
            </p>
          )}
        </div>
        <div style={{ width: 270, flexShrink: 0, background: 'var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: '6px 6px 0 0 var(--tumlet-red)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', color: 'var(--tumlet-beige)', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>hands raised</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28 }}>
              {upCount}<span style={{ opacity: .5, fontSize: 18 }}>/{gamePlayers.length}</span>
            </span>
          </div>
          {gamePlayers.map(p => {
            const up = p.id === authorId || p.hand_raised
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 'var(--radius-sm)', background: up ? 'rgba(243,185,82,0.18)' : 'rgba(255,255,255,0.04)', transition: 'background .25s', marginBottom: 4 }}>
                <Avatar player={p} size={28} dim={!up} />
                <span style={{ color: 'var(--tumlet-beige)', fontWeight: 700, fontSize: 14, opacity: up ? 1 : .5 }}>{p.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 18 }} className={up ? 'hand-pop' : ''}>{up ? '✋' : ''}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
