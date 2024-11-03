export type IconType = 'closed' | 'closing' | 'connecting' | 'open' | 'uninstantiated'

export interface IconProps {
  iconName: IconType
  size: number
}

export interface StyledIconProps {
  size: number
}
