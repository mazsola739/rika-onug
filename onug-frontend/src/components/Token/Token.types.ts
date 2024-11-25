export interface IdentificationProps {
  lovers?: boolean
  werewolf?: boolean
  dreamwolf?: boolean
  masons?: boolean
  aliens?: boolean
  cow?: boolean
  groobzerb?: boolean
  vampires?: boolean
  oracle?: boolean
  part_of_blob?: boolean
  part_of_family?: boolean
  current?: boolean
}

export interface TokenProps {
  tokenId?: number
  tokenName: string
  onClick?: () => void
  size: number
  ready?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  identification?: IdentificationProps
}

export interface StyledTokenProps extends IdentificationProps {
  isSelectable: boolean
  isSelected: boolean
  size: number
}
