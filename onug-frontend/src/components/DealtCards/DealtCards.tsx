import { observer } from 'mobx-react-lite'
import { DealtCardsProps } from './DealtCards.types'
import { Token } from 'components'
import { CenterCardContainer, StyledDealtCards } from './DealtCards.styles'
import { dealtCardsUtils } from './DealtCards.utils'

const { renderPlayerCards, renderCenterExtraCard, renderCenterCard } =
  dealtCardsUtils

export const DealtCards: React.FC<DealtCardsProps> = observer(
  ({ players, hasSentinel, hasAlphaWolf, hasTemptress }) => {
    return (
      <StyledDealtCards>
        {players && renderPlayerCards(players)}
        <CenterCardContainer>
          {hasSentinel && <Token tokenName="shield" size={70} />}
          {hasAlphaWolf && renderCenterExtraCard('Werewolf')}
          {renderCenterCard('Center')}
          {hasTemptress && renderCenterExtraCard('Villain')}
        </CenterCardContainer>
      </StyledDealtCards>
    )
  }
)
