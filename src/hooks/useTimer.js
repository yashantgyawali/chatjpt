import { useState, useEffect } from 'react'

export function useTimer(startedAt, duration = 60) {
  const [rem, setRem] = useState(() => {
    if (!startedAt) return duration
    return Math.max(0, duration - Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000))
  })
  useEffect(() => {
    if (!startedAt) return
    const iv = setInterval(() => {
      setRem(Math.max(0, duration - Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)))
    }, 500)
    return () => clearInterval(iv)
  }, [startedAt, duration])
  return rem
}
