import { Leaderboard } from '../../components/Leaderboard'

export default function PlayerScore({ room, players, me }) {
  return (
    <div style={{ padding: '40px 18px 40px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--tumlet-footer)' }}>
          after round {room.round + 1}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26 }}>the standings</div>
      </div>
      <div style={{ flex: 1 }}><Leaderboard players={players} me={me} /></div>
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--tumlet-footer)' }}>
        rules stay the same. next question incoming<span className="typing" style={{ marginLeft: 6 }}><i /><i /><i /></span>
      </div>
    </div>
  )
}
