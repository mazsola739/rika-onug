import { RoleImage, Timer } from "components"
import { observer } from "mobx-react-lite"
import { narrationStore } from "store"
import { StyledGamePlayHeader, NarrationImage, Narration, TimerContainer } from "./Game.styles"

export const GameHeader: React.FC = observer(() => {
  const narration = narrationStore.getNarrationMessage()
  const img = narrationStore.getNarrationImage()

  return (
    <StyledGamePlayHeader>
      <NarrationImage>
        {img.length > 0 && <RoleImage image={img} size={100} />}
      </NarrationImage>
      <Narration>{narration}</Narration>
      <TimerContainer>
        <p>Time remaining:</p>
        <Timer/>
      </TimerContainer>
    </StyledGamePlayHeader>
  )
})
