import { observer } from 'mobx-react-lite'
import { DealtCardsProps } from './DealtCards.types'
import { CenterCardContainer, StyledDealtCards } from './DealtCards.styles'
import { dealtCardsUtils } from './DealtCards.utils'

const { renderPlayerCards, renderCenterCard } = dealtCardsUtils

export const DealtCards: React.FC<DealtCardsProps> = observer(
  ({ boardCards, players }) => {
    const centerCards = boardCards
      ? boardCards.filter((item) => item.position.startsWith('center'))
      : []
    const playerCards = boardCards
      ? boardCards.filter((item) => item.position.startsWith('player'))
      : []

    return (
      <StyledDealtCards>
        {renderPlayerCards(playerCards, players)}
        <CenterCardContainer>
          {renderCenterCard(centerCards)}
        </CenterCardContainer>
      </StyledDealtCards>
    )
  }
)
