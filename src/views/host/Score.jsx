import { HHeader } from '../../components/HHeader'
import { HBtn } from '../../components/HBtn'
import { Leaderboard } from '../../components/Leaderboard'

export default function HostScore({ room, players, me, actions }) {
  const last = room.round >= room.total_rounds - 1
  return (
    <div style={{ padding: '28px 36px', minHeight: '100dvh' }}>
      <HHeader room={room} onEnd={actions.endRoom} right={<HBtn onClick={actions.nextQuestion} tone="red" big>{last ? 'final results →' : 'next question →'}</HBtn>} />
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, marginBottom: 16 }}>
        standings after round {room.round + 1}
      </div>
      <div style={{ maxWidth: 680 }}><Leaderboard players={players} me={me} /></div>
      <p style={{ color: 'var(--tumlet-footer)', fontSize: 14, marginTop: 16 }}>
        rules persist — same secret prompt, brand new question.
      </p>
    </div>
  )
}
