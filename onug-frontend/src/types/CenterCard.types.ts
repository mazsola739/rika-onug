import { CardType } from './Card.types'

export type CenterCardType = {
  wolf_card: CardType
  center_cards: { left: CardType; middle: CardType; right: CardType }
  villain_card: CardType
}
