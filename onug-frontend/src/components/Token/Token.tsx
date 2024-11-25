import { TokenImage } from 'components/TokenImage/TokenImage'
import { observer } from 'mobx-react-lite'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.FC<TokenProps> = observer(({ tokenName, onClick, size, ready, isSelectable, isSelected, identification }) => {
  const props = { size, isSelectable, isSelected, ready, identification }
  return (
    <StyledToken onClick={onClick} {...props}>
      <TokenImage ready={ready} size={size} image={tokenName} />
    </StyledToken>
  )
})
