import { observer } from 'mobx-react-lite'
import { StyledRoleImage } from './RoleImage.styles'
import { RoleImageProps } from './RoleImage.types'

export const RoleImage: React.FC<RoleImageProps> = observer(
  ({ image, onClick, size }) => (
    <StyledRoleImage onClick={onClick} src={`/assets/cards/${image}.webp`} alt={image} size={size} />
  )
)
