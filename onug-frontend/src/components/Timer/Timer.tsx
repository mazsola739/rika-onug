import { observer } from 'mobx-react-lite'
import { StyledTimer } from './Timer.styles'
import { TimerProps } from './Timer.types'
import { useEffect, useState } from 'react'
import { gameBoardStore } from 'store'

export const Timer: React.FC<TimerProps> = observer(
  ({ startingTime, actionTime = 5000 }) => {
    const [remainingTime, setRemainingTime] = useState(0)

    //TODO rethink
    useEffect(() => {
      const intervalId = setInterval(() => {
        const currentTime = Date.now()
        const remaining = startingTime - currentTime + actionTime
        setRemainingTime(remaining < 0 ? 0 : remaining)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }, [startingTime, actionTime])

    useEffect(() => {
      console.log(remainingTime)
      if (remainingTime === 0) {
        gameBoardStore.closeYourEyes()
      }
    }, [remainingTime, gameBoardStore, gameBoardStore])

    const formatTime = (time: number) => {
      const seconds = Math.floor(time / 1000)
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    return (
      <StyledTimer>Time remaining: {formatTime(remainingTime)}</StyledTimer>
    )
  }
)
