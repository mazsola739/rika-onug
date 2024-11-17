export interface TokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
  isSelectable?: boolean
  isSelected?: boolean
}

export interface StyledTokenProps {
  isSelectable?: boolean
}
