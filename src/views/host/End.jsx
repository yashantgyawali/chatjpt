import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Leaderboard } from '../../components/Leaderboard'

export default function HostEnd({ players, me, actions }) {
  const ranked = [...players].sort((a, b) => b.score - a.score)
  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader right={<HBtn onClick={actions.resetGame} tone="ink" big>play again ↺</HBtn>} />
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 52 }}>👑</div>
        {ranked[0] && (
          <>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32 }}>
              {ranked[0].name} is the best AI in the room
            </div>
            <div style={{ color: 'var(--tumlet-brown)' }}>
              smuggled their rule past everyone {ranked[0].score} time{ranked[0].score === 1 ? '' : 's'}
            </div>
          </>
        )}
      </div>
      <div style={{ maxWidth: 680, margin: '0 auto' }}><Leaderboard players={players} me={me} reveal /></div>
    </div>
  )
}
