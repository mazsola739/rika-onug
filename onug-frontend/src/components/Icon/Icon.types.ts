export type IconType =
  | 'closed'
  | 'closing'
  | 'connecting'
  | 'open'
  | 'uninstantiated'
  | 'aerial'
  | 'alien'
  | 'alienhand'
  | 'artifact'
  | 'assassin'
  | 'awesome'
  | 'bat'
  | 'bear'
  | 'babyalien'
  | 'blind'
  | 'blob'
  | 'bulb'
  | 'clarity'
  | 'claw'
  | 'coffin'
  | 'copy'
  | 'cow'
  | 'cupid'
  | 'detector'
  | 'diseased'
  | 'dog'
  | 'dreamwolf'
  | 'dress'
  | 'drunk'
  | 'empath'
  | 'evil'
  | 'evilhand'
  | 'eye'
  | 'family'
  | 'fang'
  | 'fear'
  | 'friend'
  | 'gremlin'
  | 'groobzerb'
  | 'id'
  | 'insomniac'
  | 'interaction'
  | 'investigator'
  | 'jest'
  | 'like'
  | 'lover'
  | 'mad'
  | 'mark'
  | 'mason'
  | 'mortician'
  | 'mute'
  | 'mystic'
  | 'nice'
  | 'night'
  | 'nostradamus'
  | 'oracle'
  | 'peeker'
  | 'prank'
  | 'pretty'
  | 'robber'
  | 'secret'
  | 'seer'
  | 'select'
  | 'sentinel'
  | 'shield'
  | 'smell'
  | 'spy'
  | 'sus'
  | 'swap'
  | 'tanner'
  | 'tap'
  | 'target'
  | 'thumb'
  | 'traitor'
  | 'trophy'
  | 'ufo'
  | 'vampire'
  | 'villain'
  | 'voodoo'
  | 'werewolf'
  | 'witch'

export interface IconProps {
  iconName: IconType
  size: number
}

export interface StyledIconProps {
  size: number
}
