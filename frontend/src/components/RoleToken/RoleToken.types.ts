import { GuessTokenType } from "types"

export interface RoleTokenProps {
  token: GuessTokenType
  size?: number
}

export interface StyledRoleTokenProps {
  bgImg: string
  isSelected: boolean
  size: number
}
