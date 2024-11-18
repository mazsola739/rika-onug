export interface TokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  lovers?: boolean
}

export interface StyledTokenProps {
  isSelectable?: boolean
  lovers?: boolean
  size: number
}
