import { observer } from 'mobx-react-lite'
import { StyledBoardCards } from './BoardCards.styles'
import { renderPlayerCards, renderCenterCard } from './BoardCards.utils'

export const BoardCards: React.FC = observer(() => {
  return (
    <StyledBoardCards>
      {renderPlayerCards()}
      {renderCenterCard()}
    </StyledBoardCards>
  )
})
