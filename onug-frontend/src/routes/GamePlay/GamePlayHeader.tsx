import { observer } from 'mobx-react-lite'
import { StyledGamePlayHeader } from './GamePlay.styles'
import { GamePlayHeaderProps } from './GamePlay.types'

export const GamePlayHeader: React.FC<GamePlayHeaderProps> = observer(
  ({ children }) => <StyledGamePlayHeader>{children}</StyledGamePlayHeader>
)
