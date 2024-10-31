import { Card, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'

const DELUXE_CARD_TYPES = [
  'alien',
  'robber',
  'seer',
  'tanner',
  'troublemaker',
  'vampire',
  'werewolf',
]

const getRandomDeluxe = (name: string): string => {
  switch (name) {
    case 'alien':
      return Math.random() < 0.5 ? '_male' : '_female'
    case 'werewolf':
      return `_${Math.floor(Math.random() * 3) + 1}`
    default:
      return `_${Math.floor(Math.random() * 2) + 1}`
  }
}

const getCardImageSrc = (card: any): string => {
  if (!card || !card.position) {
    return ''
  }
  const cardName = card.card_name

  if (cardName && DELUXE_CARD_TYPES.includes(cardName)) {
    return `${cardName}${getRandomDeluxe(cardName)}`
  }

  return cardName || 'card_background'
}

const getPlayerNumberToken = (position: string): string => {
  return position.includes('player_') ? position.replace(/player_/g, '') : ''
}

export const PlayerCard: React.FC<PlayerCardProps> = observer(
  ({ card, cardSize = 90, tokenSize = 35 }) => {
    const { hasMarks, hasSentinel, hasCurator } = deckStore

    const position = card?.position || ''
    const isCenterCard = position.includes('center_')
/*     const playerName = card?.player_name || '' */ //TODO fix name 
    const imgSrc = getCardImageSrc(card)

    const playerNumberToken = getPlayerNumberToken(position)
    const markName = card?.mark
    const isShielded = card?.shield
    const isArtifacted = card?.artifact
    const isWerewolf = card?.werewolves
    const isDreamwolf = card?.dreamwolf

    const isSelectableCard = card?.selectable_card
    const isSelectableMark = card?.selectable_mark

    return (
      <StyledPlayerCard>
        {/* {playerName && <PlayerName>{playerName}</PlayerName>} */}
        <Card image={imgSrc} size={cardSize} isSelectable={isSelectableCard} werewolf={isWerewolf} dreamwolf={isDreamwolf} />
        {!isCenterCard && (
          <Tokens>
            <Token tokenName={playerNumberToken} size={tokenSize} />
            {hasMarks && <Token tokenName={markName} size={tokenSize} isSelectable={isSelectableMark} />}
            {isShielded && hasSentinel && (<Token tokenName="shield" size={tokenSize} />)}
            {isArtifacted && hasCurator && (<Token tokenName="artifact_back" size={tokenSize} />)}
          </Tokens>
        )}
      </StyledPlayerCard>
    )
  }
)
