import { observer } from 'mobx-react-lite'
import { StyledBoardCards } from './BoardCards.styles'
import { dealtCardsUtils } from './BoardCards.utils'

const { renderPlayerCards, renderCenterCard } = dealtCardsUtils

export const BoardCards: React.FC = observer(() => {
  return (
    <StyledBoardCards>
      {renderPlayerCards()}
      {renderCenterCard()}
    </StyledBoardCards>
  )
})
