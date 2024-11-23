export interface TokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  lovers?: boolean
  werewolf?: boolean
  dreamwolf?: boolean
  masons?: boolean
  aliens?: boolean
  cow?: boolean
  groobzerb?: boolean
  vampires?: boolean
  part_of_blob?: boolean
  part_of_family?: boolean
}

export interface StyledTokenProps {
  isSelectable: boolean
  isSelected: boolean
  lovers: boolean
  werewolf: boolean
  dreamwolf: boolean
  masons: boolean
  aliens: boolean
  cow: boolean
  groobzerb: boolean
  vampires: boolean
  part_of_blob: boolean
  part_of_family: boolean
  size: number
}
