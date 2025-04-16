import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { StyledNightHistory, Narration, NarrationImage, NarrationText } from './NightHistory.styles'

export const NightHistory: React.ComponentType = observer(() => {
  return (
    <StyledNightHistory>
      {voteStore.narrations &&
        voteStore.voteNarration.map((scene, index) => (
          <Narration key={index}>
            <NarrationImage src={`/assets/cards/${scene.image}.webp`} alt="info" />
            <NarrationText>{scene.text}</NarrationText>
          </Narration>
        ))}
    </StyledNightHistory>
  )
})
