import { RoleImage } from 'components'
import { observer } from 'mobx-react-lite'
import { NarrationProps } from './Narration.types'
import { StyledNarration, NarrationText } from './Narration.styles'

export const Narration: React.FC<NarrationProps> = observer(({ image, text }) => {
  return (
    <StyledNarration>
      <RoleImage image={image} size={80} />
      <NarrationText>{text}</NarrationText>
    </StyledNarration>
  )
})
