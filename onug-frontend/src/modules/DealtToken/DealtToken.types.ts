export interface DealtTokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
}

export interface StyledDealtTokenProps {
  size: number
  ready?: boolean
}
