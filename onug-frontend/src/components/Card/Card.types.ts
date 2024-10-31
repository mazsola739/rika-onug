export interface CardProps {
  image: string
  isSelectable: boolean
  werewolf: boolean
  dreamwolf: boolean
  size: number
  playerName?: string
}

export interface StyledCardProps {
  sizeW: number
  sizeH?: number
  isSelectable: boolean
  werewolf: boolean
  dreamwolf: boolean
}
