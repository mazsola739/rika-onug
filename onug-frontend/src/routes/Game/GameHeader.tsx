import { Header, RoleImage } from 'components'
import { observer } from 'mobx-react-lite'
import { narrationStore } from 'store'
import { Narration, NarrationImage, StyledGameHeader } from './Game.styles'

export const GameHeader: React.FC = observer(() => {
  const narration = narrationStore.getNarrationMessage()
  const img = narrationStore.getNarrationImage()

  return (
    <Header>
      <StyledGameHeader>
      <NarrationImage>
          {img.length > 0 && <RoleImage image={img} size={80} />}
          </NarrationImage>
          <Narration>{narration}</Narration>
      </StyledGameHeader>
    </Header>
  )
})
