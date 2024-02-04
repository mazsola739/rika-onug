import { observer } from 'mobx-react-lite'
import {
  Narration,
  NarrationImage,
  StyledGamePlayHeader,
  Timer,
} from './GamePlay.styles'
import { narrationStore } from 'store'
import { CardImage } from 'components'

export const GamePlayHeader: React.FC = observer(() => {
  const narration = narrationStore.getNarrationMessage()
  const img = narrationStore.getNarrationImage()
  return (
    <StyledGamePlayHeader>
      <NarrationImage>
        {img.length > 0 && <CardImage image={img} size={100} />}
      </NarrationImage>
      <Narration> {narration}</Narration>
      <Timer>00:30</Timer>
    </StyledGamePlayHeader>
  )
})
