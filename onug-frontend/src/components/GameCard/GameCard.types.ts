export interface GameCardProps {
  id: number
  position: string
  ready?: boolean
  isCenter: boolean
  selectable?: boolean
  alien?: boolean
  artifact?: boolean
  assassin?: boolean
  awesome?: boolean
  babyalien?: boolean
  bat?: boolean
  blob?: boolean
  bulb?: boolean
  clarity?: boolean
  claw?: boolean
  cow?: boolean
  diseased?: boolean
  dreamwolf?: boolean
  dress?: boolean
  drunk?: boolean
  empath?: boolean
  evil?: boolean
  family?: boolean
  fang?: boolean
  fear?: boolean
  friend?: boolean
  jest?: boolean
  like?: boolean
  lover?: boolean
  mason?: boolean
  mad?: boolean
  mortician?: boolean
  nice?: boolean
  pretty?: boolean
  seer?: boolean
  select?: boolean
  shield?: boolean
  smell?: boolean
  sus?: boolean
  swap?: boolean
  tanner?: boolean
  tap?: boolean
  target?: boolean
  traitor?: boolean
  trophy?: boolean
  ufo?: boolean
  vampire?: boolean
  villain?: boolean
  werewolf?: boolean
}

export interface StyledGameCardProps {
  backgroundImage: string
  selectable?: boolean
  isSelected?: boolean
}
