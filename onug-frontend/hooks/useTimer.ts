/* import { useState } from 'react'

export function useTimer(): [
  boolean,
  () => void,
  () => void,
  (cb: () => void, delay: number) => void,
] {
  const [paused, setPaused] = useState(false)
  const [callback, setCallback] = useState(null)
  const [delay, setDelay] = useState(0)

  let start = Date.now()

  let timerId: NodeJS.Timeout

  function startTimer(cb: () => void, delay: number) {
    setCallback(cb)
    setDelay(delay)
    timerId = setTimeout(() => {
      console.log('timer time up')
      cb()
    }, delay)
  }

  function setPause() {
    if (!paused) setPaused(true)
    clearTimeout(timerId)
    timerId = null
    setDelay(delay - Date.now() - start)
  }

  function setResume() {
    if (paused) setPaused(true)
    if (timerId) {
      return
    }

    start = Date.now()
    timerId = setTimeout(callback, delay)
  }

  return [paused, setPause, setResume, startTimer]
}
 */
