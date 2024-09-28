type BoardCard = {
  position?: string
  cardId?: number
  markId?: string
  isCenter?: boolean

  selectable_cards?: boolean
  selectable_marks?: boolean

  shield?: boolean
  artifact?: boolean

  fang?: boolean
  fear?: boolean
  bat?: boolean
  diseased?: boolean
  cupid?: boolean
  traitor?: boolean
  clarity?: boolean
  target?: boolean

  aerial?: boolean
  alien?: boolean
  alienhand?: boolean
  artifacted?: boolean
  assassin?: boolean
  blob?: boolean
  claw?: boolean
  copy?: boolean
  detector?: boolean
  dog?: boolean
  dreamwolf?: boolean
  drunk?: boolean
  evilhand?: boolean
  family?: boolean
  gremlin?: boolean
  groobzerb?: boolean
  idcard?: boolean
  interaction?: boolean
  investigator?: boolean
  lonely?: boolean
  lover?: boolean
  mad?: boolean
  mason?: boolean
  mortician?: boolean
  mystic?: boolean
  nostradamus?: boolean
  peeker?: boolean
  prank?: boolean
  robber?: boolean
  seer?: boolean
  sentinel?: boolean
  swap?: boolean
  tanner?: boolean
  tap?: boolean
  thumb?: boolean
  ufo?: boolean
  vampire?: boolean
  villain?: boolean
  voodoo?: boolean
  werewolf?: boolean
  witch?: boolean
}

export interface BoardCardProps {
  isCenter: boolean
  boardCard: BoardCard
}

export interface StyledBoardCardProps {
  cardBackgroundImage: string
  selectable_cards?: boolean
  isSelectedCard?: boolean
}

export interface StyledBoardMarkProps {
  markBackgroundImage: string
  selectable_marks?: boolean
  isSelectedMark?: boolean
}
