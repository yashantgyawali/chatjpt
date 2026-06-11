import { useState, useEffect } from 'react'

export function Confetti() {
  const colors = ['#F16147', '#F3B952', '#7184BE', '#5A8A4A', '#130D01']
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 3200)
    return () => clearTimeout(t)
  }, [])
  if (gone) return null
  return (
    <>
      {Array.from({ length: 80 }, (_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: ((i * 1.27) % 100) + '%',
          width: 8 + (i % 9), height: (8 + (i % 9)) * 1.3,
          background: colors[i % colors.length],
          borderRadius: i % 3 === 0 ? '50%' : 2,
          animation: `fall ${2.2 + (i * 0.015) % 1.2}s ${(i * 0.04) % 0.5}s cubic-bezier(.3,.1,.5,1) forwards`,
        }} />
      ))}
    </>
  )
}
