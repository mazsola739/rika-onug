import { observer } from 'mobx-react-lite'
import { gameBoardStore } from 'store'
import { StyledDealtCards, CenterCardContainer } from './DealtCards.styles'
import { renderCenterCard } from './DealtCards.utils'

export const DealtCards: React.FC = observer(() => {
  const { centerCards } = gameBoardStore

  return (
    <StyledDealtCards>
      <CenterCardContainer>{renderCenterCard(centerCards)}</CenterCardContainer>
    </StyledDealtCards>
  )
})
