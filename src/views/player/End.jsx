import { Wordmark } from '../../components/Wordmark'
import { Avatar } from '../../components/Avatar'
import { Leaderboard } from '../../components/Leaderboard'

export default function PlayerEnd({ players, me }) {
  const ranked = [...players].sort((a, b) => b.score - a.score)
  const winner = ranked[0]
  return (
    <div style={{ padding: '40px 18px 40px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center' }}>
        <Wordmark size={28} />
        <div style={{ fontFamily: 'var(--font-hand)', color: 'var(--tumlet-brown)', fontSize: 16 }}>game over</div>
      </div>
      {winner && (
        <div className="hand-pop" style={{ textAlign: 'center', margin: '18px 0', background: 'var(--tumlet-ink)', color: 'var(--tumlet-beige)', border: '3px solid var(--tumlet-ink)', borderRadius: 'var(--radius-lg)', padding: '22px', boxShadow: '6px 6px 0 0 var(--tumlet-red)' }}>
          <div style={{ fontSize: 44 }}>👑</div>
          <Avatar player={winner} size={56} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, marginTop: 8 }}>{winner.name} wins</div>
          <div style={{ fontSize: 13, opacity: .8 }}>{winner.score} point{winner.score === 1 ? '' : 's'} · best prompt-smuggler</div>
        </div>
      )}
      <div style={{ flex: 1 }}><Leaderboard players={players} me={me} reveal /></div>
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--tumlet-footer)' }}>
        host can start a new game
      </div>
    </div>
  )
}
