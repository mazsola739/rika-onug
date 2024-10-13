import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useBoolean, useEffectOnce, useInterval } from 'react-use'
import { gameStore } from 'store'
import { StyledTimer } from './Timer.styles'

export const Timer: React.FC = observer(() => {
  const [isRunning, toggleIsRunning] = useBoolean(true)
  const [remainingMs, setRemainingMs] = useState(0)

  useEffectOnce(() => {
    gameStore.setToggleIsRunning(toggleIsRunning)
  })

  useEffect(() => {
    if (isNaN(gameStore.remainingTime?.[0])) return

    const remainingTime = gameStore.shiftRemainingTimeFromStore()
    console.log(`useEffect remainingTime: ${remainingTime}`)
    setRemainingMs(remainingTime)
  }, [gameStore.remainingTime?.[0]])

  useInterval(
    () => {
      const remaining = remainingMs - 1000 >= 0 ? remainingMs - 1000 : 0
      setRemainingMs(remaining)
    },
    isRunning ? 1000 : null
  )

  const formatTime = (time: number) => {
    console.log(`formatTime time: ${time}`)
    const seconds = Math.round(time / 1000)
    let minutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds % 60
    minutes = isNaN(minutes) ? 0 : minutes
    remainingSeconds = isNaN(remainingSeconds) ? 0 : remainingSeconds
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return <StyledTimer>{formatTime(remainingMs)}</StyledTimer>
})
