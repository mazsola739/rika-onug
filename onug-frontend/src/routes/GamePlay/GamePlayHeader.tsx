import { observer } from 'mobx-react-lite'
import { StyledGamePlayHeader } from './GamePlay.styles'
import { GamePlayHeaderProps } from './GamePlay.types'
import { narrationStore } from 'store'

export const GamePlayHeader: React.FC<GamePlayHeaderProps> = observer(() => {
  const narration = narrationStore.getNarrationMessage()
  return <StyledGamePlayHeader>{narration}</StyledGamePlayHeader>
})
