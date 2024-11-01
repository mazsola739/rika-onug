import { observer } from 'mobx-react-lite'
import { StyledTimer } from './Timer.styles'

export const Timer: React.FC = observer(() => {
  const formatTime = (time: number) => {
    console.log(`formatTime time: ${time}`)
    const seconds = Math.round(time / 1000)
    let minutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds % 60
    minutes = isNaN(minutes) ? 0 : minutes
    remainingSeconds = isNaN(remainingSeconds) ? 0 : remainingSeconds
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return <StyledTimer>{formatTime(0)}</StyledTimer>
})
