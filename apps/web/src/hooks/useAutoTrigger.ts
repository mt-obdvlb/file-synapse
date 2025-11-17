'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const useAutoTrigger = (callback: () => void, seconds: number = 5) => {
  const [remaining, setRemaining] = useState(seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) return // 防止重复启动

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer()
          callback()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearTimer()
  }, [callback, clearTimer])

  return { remaining }
}
