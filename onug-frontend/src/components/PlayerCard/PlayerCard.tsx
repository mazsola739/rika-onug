import { Card, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'

const DELUXE_CARD_TYPES = ['alien', 'robber', 'seer', 'tanner', 'troublemaker', 'vampire', 'werewolf']

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

export const PlayerCard: React.FC<PlayerCardProps> = observer(({ card, cardSize = 90, tokenSize = 35 }) => {
    const { hasMarks, hasSentinel, hasCurator } = deckStore

    const position = card?.position || ''
    const isCenterCard = position.includes('center_')
    const imgSrc = getCardImageSrc(card)
    const playerNumberToken = getPlayerNumberToken(position)
    const markName = card?.mark || ''
    const playerName = card?.player_name || ''

    return (
        <StyledPlayerCard>
            <Card image={imgSrc} size={cardSize} playerName={playerName} />
            {!isCenterCard && (
                <Tokens>
                    <Token tokenName={playerNumberToken} size={tokenSize} />
                    {hasMarks && <Token tokenName={markName} size={tokenSize} />}
                    {card?.shield && hasSentinel && <Token tokenName="shield" size={tokenSize} />}
                    {card?.artifact && hasCurator && <Token tokenName="artifact_back" size={tokenSize} />}
                </Tokens>
            )}
        </StyledPlayerCard>
    )
})
