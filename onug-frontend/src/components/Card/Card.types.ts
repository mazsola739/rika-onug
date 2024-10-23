export interface CardProps {
  image: string
  size: number
  playerName?: string
}

export interface StyledCardProps {
  isSelected?: boolean
  ready?: boolean
  size: number
}
