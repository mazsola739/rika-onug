import { Card, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'
import { usePlayerCardSelection } from './usePlayerCardSelection'

export const PlayerCard: React.FC<PlayerCardProps> = observer(
  ({ card, cardSize = 90, tokenSize = 35 }) => {
    const { playerNumberToken, markProps,  isShielded, isArtifacted, isCenterCard, onCardClick, 
      hasMarks, hasSentinel, hasCurator, cardProps } = usePlayerCardSelection(card)

    return (
      <StyledPlayerCard>
        <Card {...cardProps} onClick={onCardClick} size={cardSize} />
        {!isCenterCard && (
          <Tokens>
            <Token tokenName={playerNumberToken} size={tokenSize} />
            {hasMarks && <Token size={0} {...markProps} /> }
            {isShielded && hasSentinel && <Token tokenName='shield' size={tokenSize} />}
            {isArtifacted && hasCurator && <Token tokenName='artifact_back' size={tokenSize} />}
          </Tokens>
        )}
      </StyledPlayerCard>
    )
  }
)
