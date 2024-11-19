import { Card, RoleToken, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { GuessTokens, StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'
import { usePlayerCard } from './usePlayerCard'

export const PlayerCard: React.FC<PlayerCardProps> = observer(({ card, cardSize = 90, tokenSize = 35 }) => {
  const { playerNumberToken, markProps, isShielded, isArtifacted, isCenterCard, onCardClick, cardProps, guessTokens, hasMarks, hasSentinel, hasCurator } = usePlayerCard(card)

  return (
    <StyledPlayerCard>
      <GuessTokens width={40}>{guessTokens && guessTokens.map(token => <RoleToken key={token.id} size={40} token={token} />)}</GuessTokens>
      <Card {...cardProps} onClick={onCardClick} size={cardSize} />
      {!isCenterCard && (
        <Tokens>
          <Token tokenName={playerNumberToken} size={tokenSize} />
          {hasMarks && <Token size={tokenSize} {...markProps} />}
          {isShielded && hasSentinel && <Token tokenName="shield" size={tokenSize} />}
          {isArtifacted && hasCurator && <Token tokenName="artifact_back" size={tokenSize} />}
        </Tokens>
      )}
    </StyledPlayerCard>
  )
})
