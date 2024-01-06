import { CardType } from 'types'

export interface CardProps {
  card: CardType
  room_id: string
}

export interface StyledCardProps {
  isSelected: boolean
}
