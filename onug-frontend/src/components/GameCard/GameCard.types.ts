export interface GameCardProps {
  id: number
  position: string
  ready?: boolean
  isCenter: boolean
  werewolf?: boolean
  selectable?: boolean
  mason?: boolean
}

export interface StyledGameCardProps {
  backgroundImage: string
  selectable?: boolean
  isSelected?: boolean
}
