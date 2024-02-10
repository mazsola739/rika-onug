export type IconType =
  | 'closed'
  | 'closing'
  | 'connecting'
  | 'open'
  | 'uninstantiated'
  | 'alien'
  | 'artifact'
  | 'assassin'
  | 'blind'
  | 'blob'
  | 'cow'
  | 'claw'
  | 'dreamwolf'
  | 'eye'
  | 'family'
  | 'fang'
  | 'interaction'
  | 'lover'
  | 'mason'
  | 'mortician'
  | 'mute'
  | 'secret'
  | 'seer'
  | 'select'
  | 'shield'
  | 'spinner'
  | 'supervillain'
  | 'tanner'
  | 'ufo'
  | 'vampire'
  | 'werewolf'

export interface IconProps {
  iconName: IconType
  size: number
}

export interface StyledIconProps {
  size: number
}
