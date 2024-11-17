import { TokenImage } from 'components/TokenImage/TokenImage'
import { observer } from 'mobx-react-lite'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.FC<TokenProps> = observer(({ tokenName, onClick, size, ready, isSelectable }) => (
  <StyledToken onClick={onClick} isSelectable={isSelectable}>
    <TokenImage ready={ready} size={size} image={tokenName} />
  </StyledToken>
))
