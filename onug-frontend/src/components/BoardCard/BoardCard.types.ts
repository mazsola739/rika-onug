export interface BoardCardProps {
  id: number
  spy?: boolean
  position: string
  isCenter: boolean
  selectable_cards?: boolean
  aliens?: boolean
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
  lovers?: boolean
  masons?: boolean
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
  vampires?: boolean
  villains?: boolean
  werewolves?: boolean
}

export interface StyledBoardCardProps {
  backgroundImage: string
  selectable_cards?: boolean
  isSelected?: boolean
}
