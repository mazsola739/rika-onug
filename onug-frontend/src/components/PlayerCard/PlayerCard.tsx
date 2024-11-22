import { Card, RoleToken, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { CardContainer, GuessTokens, StyledPlayerCard, Tokens, PlayerName, CardHolder } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'
import { usePlayerCard } from './usePlayerCard'

export const PlayerCard: React.FC<PlayerCardProps> = observer(({ card, cardSize = 80, tokenSize = 30, ownCard = false }) => {
  const { playerNumberToken, playerName, markProps, isShielded, isArtifacted, isCenterCard, onCardClick, cardProps, guessTokens, hasMarks, hasSentinel, hasCurator } = usePlayerCard(card, ownCard)

  return (
    <StyledPlayerCard ownCard={ownCard}>
      {ownCard && (
        <GuessTokens ownCard={ownCard} width={40}>
          {guessTokens && guessTokens.map(token => <RoleToken key={token.id} size={40} token={token} />)}
        </GuessTokens>
      )}
      <CardContainer>
        <CardHolder>
          <Card {...cardProps} onClick={onCardClick} size={cardSize} />
          {!isCenterCard && <PlayerName>{playerName}</PlayerName>}
        </CardHolder>

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
        <GuessTokens ownCard={ownCard} width={40}>
          {guessTokens && guessTokens.map(token => <RoleToken key={token.id} size={40} token={token} />)}
        </GuessTokens>
      )}
    </StyledPlayerCard>
  )
})
