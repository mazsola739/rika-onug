export interface CardProps {
  image: string
  onClick?: () => void
  isSelectable: boolean
  isSelected: boolean
  werewolf: boolean
  dreamwolf: boolean
  size: number
  playerName?: string
  position?: string
}

export interface StyledCardProps {
  sizeW: number
  sizeH?: number
  isSelectable: boolean
  werewolf: boolean
  dreamwolf: boolean
}
