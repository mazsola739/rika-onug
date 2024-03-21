import { observer } from 'mobx-react-lite'
import { gameBoardStore } from 'store'
import { StyledDealtCards, CenterCardContainer } from './DealtCards.styles'
import { renderPlayerCards, renderCenterCard } from './DealtCards.utils'

export const DealtCards: React.FC = observer(() => {
  const { centerCards, playerCards } = gameBoardStore

  return (
    <StyledDealtCards>
      {renderPlayerCards(playerCards)}
      <CenterCardContainer>{renderCenterCard(centerCards)}</CenterCardContainer>
    </StyledDealtCards>
  )
})
