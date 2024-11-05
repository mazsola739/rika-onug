import { Card, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { GuessTokens, StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'
import { usePlayerCardSelection } from './usePlayerCardSelection'
import { deckStore } from 'store'

export const PlayerCard: React.FC<PlayerCardProps> = observer(
  ({ card, cardSize = 90, tokenSize = 35 }) => {
    const { playerNumberToken, markProps,  isShielded, isArtifacted, isCenterCard, onCardClick, cardProps } = usePlayerCardSelection(card)
    const { hasMarks, hasSentinel, hasCurator } = deckStore
    console.log(JSON.stringify(markProps))

    return (
      <StyledPlayerCard>
        <GuessTokens width={tokenSize}>{/* here comes tokens */}</GuessTokens>
        <Card {...cardProps} onClick={onCardClick} size={cardSize} />
        {!isCenterCard && (
          <Tokens>
            <Token tokenName={playerNumberToken} size={tokenSize} />
            {hasMarks && <Token size={tokenSize} {...markProps} /> }
            {isShielded && hasSentinel && <Token tokenName='shield' size={tokenSize} />}
            {isArtifacted && hasCurator && <Token tokenName='artifact_back' size={tokenSize} />}
          </Tokens>
        )}
      </StyledPlayerCard>
    )
  }
)
