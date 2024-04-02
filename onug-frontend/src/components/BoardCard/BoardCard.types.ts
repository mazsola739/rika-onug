export interface BoardCardProps {
  id: number
  mark?: string
  position: string
  isCenter: boolean
  selectable_cards?: boolean
  selectable_marks?: boolean
}

export interface StyledBoardCardProps {
  cardBackgroundImage: string
  selectable_cards?: boolean
  isSelectedCard?: boolean
}

export interface StyledBoardMarkProps {
  markBackgroundImage: string
  selectable_marks?: boolean
  isSelectedMark?: boolean
}
