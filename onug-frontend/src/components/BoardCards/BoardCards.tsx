import { observer } from 'mobx-react-lite'
import { CenterCardContainer, StyledBoardCards } from './BoardCards.styles'
import { dealtCardsUtils } from './BoardCards.utils'
import { gameBoardStore } from 'store'

const { renderPlayerCards, renderCenterCard } = dealtCardsUtils

export const BoardCards: React.FC = observer(() => {
  const { centerCards, playerCards } = gameBoardStore

  return (
    <StyledBoardCards>
      {renderPlayerCards(playerCards)}
      <CenterCardContainer>{renderCenterCard(centerCards)}</CenterCardContainer>
    </StyledBoardCards>
  )
})
