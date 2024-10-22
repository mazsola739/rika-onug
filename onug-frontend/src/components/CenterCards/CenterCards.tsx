import { observer } from 'mobx-react-lite'
import { boardStore } from 'store'
import { StyledCenterCards, CenterCardContainer } from './CenterCards.styles'
import { renderCenterCard } from './CenterCards.utils'

export const CenterCards: React.FC = observer(() => {
  const { centerCards } = boardStore

  return (
    <StyledCenterCards>
      <CenterCardContainer>{renderCenterCard(centerCards)}</CenterCardContainer>
    </StyledCenterCards>
  )
})
