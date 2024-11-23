export interface CardProps {
  image: string
  onClick?: () => void
  isSelectable?: boolean
  isSelected?: boolean
  size: number
  playerName?: string
}

export interface StyledCardProps {
  sizeW: number
  sizeH?: number
  isSelectable: boolean
  isSelected: boolean
}
