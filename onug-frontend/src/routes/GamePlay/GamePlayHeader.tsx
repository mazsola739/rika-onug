import { CardImage, Timer } from 'components'
import { observer } from 'mobx-react-lite'
import { gamePlayStore, narrationStore } from 'store'
import { StyledGamePlayHeader, NarrationImage, Narration, TimerContainer } from './GamePlay.styles'

export const GamePlayHeader: React.FC = observer(() => {
  const startingTime = gamePlayStore.startingTime
  const narration = narrationStore.getNarrationMessage()
  const img = narrationStore.getNarrationImage()

  return (
    <StyledGamePlayHeader>
      <NarrationImage>
        {img.length > 0 && <CardImage image={img} size={100} />}
      </NarrationImage>
      <Narration>{narration}</Narration>
      <TimerContainer>
        <p>Time remaining:</p>
        <Timer startingTime={startingTime} actionTime={20000} />
      </TimerContainer>
    </StyledGamePlayHeader>
  )
})
