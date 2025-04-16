import { TokenImage } from 'components/TokenImage/TokenImage'
import { observer } from 'mobx-react-lite'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.ComponentType<TokenProps> = observer(
  ({ tokenName, onClick, size, ready, isSelectable, isSelected, aliens, cow, current, dreamwolf, groobzerb, lovers, masons, part_of_blob, part_of_family, vampires, werewolf, witness }) => {
    const props = { size, isSelectable, isSelected, ready, aliens, cow, current, dreamwolf, groobzerb, lovers, masons, part_of_blob, part_of_family, vampires, werewolf, witness }
    return (
      <StyledToken onClick={onClick} {...props}>
        <TokenImage ready={ready} size={size} image={tokenName} />
      </StyledToken>
    )
  }
)
