import { observer } from 'mobx-react-lite'
import { StyledCenterTokens } from './CenterTokens.styles'
import { renderTokens } from './CenterTokens.utils'

export const CenterTokens: React.FC = observer(() => (
  <StyledCenterTokens>{renderTokens()}</StyledCenterTokens>
))
