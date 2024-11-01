export const DELUXE_CARD_TYPES = [
    'alien',
    'robber',
    'seer',
    'tanner',
    'troublemaker',
    'vampire',
    'werewolf',
  ]
  
  export const getRandomDeluxe = (name: string): string => {
    switch (name) {
      case 'alien':
        return Math.random() < 0.5 ? '_male' : '_female'
      case 'werewolf':
        return `_${Math.floor(Math.random() * 3) + 1}`
      default:
        return `_${Math.floor(Math.random() * 2) + 1}`
    }
  }
  
  export const getCardImageSrc = (card: any): string => {
    if (!card || !card.position) {
      return ''
    }
    const cardName = card.card_name
  
    if (cardName && DELUXE_CARD_TYPES.includes(cardName)) {
      return `${cardName}${getRandomDeluxe(cardName)}`
    }
  
    return cardName || 'card_background'
  }
  
  export const getPlayerNumberToken = (position: string): string => {
    return position.includes('player_') ? position.replace(/player_/g, '') : ''
  }