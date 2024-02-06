import { observer } from 'mobx-react-lite'
import { CenterCardContainer, StyledDealtCards } from './DealtCards.styles'
import { dealtCardsUtils } from './DealtCards.utils'
import { gameBoardStore } from 'store'

const { renderPlayerCards, renderCenterCard } = dealtCardsUtils

export const DealtCards: React.FC = observer(() => {
  const { centerCards, playerCards } = gameBoardStore

  return (
    <StyledDealtCards>
      {renderPlayerCards(playerCards)}
      <CenterCardContainer>{renderCenterCard(centerCards)}</CenterCardContainer>
    </StyledDealtCards>
  )
})
