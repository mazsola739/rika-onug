import { Card, RoleToken, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { GuessTokens, StyledPlayerCard, Tokens, CardContainer } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'
import { usePlayerCard } from './usePlayerCard'

export const PlayerCard: React.FC<PlayerCardProps> = observer(({ card, cardSize = 80, tokenSize = 30, ownCard = false }) => {
  const { playerNumberToken, markProps, isShielded, isArtifacted, isCenterCard, onCardClick, cardProps, guessTokens, hasMarks, hasSentinel, hasCurator } = usePlayerCard(card)

  return (
    <StyledPlayerCard ownCard={ownCard}>
      {ownCard && <GuessTokens ownCard={ownCard} width={50}>{guessTokens && guessTokens.map(token => <RoleToken key={token.id} size={50} token={token} />)}</GuessTokens>}
      <CardContainer>
        <Card {...cardProps} onClick={onCardClick} size={cardSize} />
        {!isCenterCard && (
          <Tokens>
            <Token tokenName={playerNumberToken} size={tokenSize} />
            {hasMarks && <Token size={tokenSize} {...markProps} />}
            {isShielded && hasSentinel && <Token tokenName="shield" size={tokenSize} />}
            {isArtifacted && hasCurator && <Token tokenName="artifact_back" size={tokenSize} />}
          </Tokens>
        )}
      </CardContainer>
      {!ownCard && (
        <GuessTokens ownCard={ownCard} width={50}>
          {guessTokens && guessTokens.map(token => <RoleToken key={token.id} size={50} token={token} />)}
        </GuessTokens>
      )}
    </StyledPlayerCard>
  )
})
