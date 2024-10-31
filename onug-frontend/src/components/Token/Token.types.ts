export interface TokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
  isSelectable?: boolean
}

export interface StyledTokenProps {
  size: number
  ready?: boolean
  isSelectable?: boolean
}
