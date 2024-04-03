export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  path?: string
  errors?: string[]
  success?: boolean

  type?: string
  room_id?: string
  stage?: string
  title?: string
  message?: string[]
  icon?: string
  votes?: Record<string, number[]>

  selected_cards?: number[]
  selected_expansions?: string[]

  player_name?: string
  player_number?: number
  player_original_id?: number
  player_card_id?: number
  player_role?: string
  player_role_id?: number
  player_team?: string
  player_mark?: string

  actual_scene?: {
    scene_number: number
    scene_start_time: number
    scene_title: string
    scene_end_time: number
  }

  board?: {
    players?: PlayersType[]
    gamePlayBoardCards?: GamePlayBoardCardType[]
    gameTableBoardCards?: GameTableBoardCardType[]
  }

  narration?: string[]
  interaction?: {
    title?: string
    icon?: string
    private_message?: string[]
    new_role_id?: number

    player_name?: string
    player_number?: number
    player_original_id?: number
    player_card_id?: number
    player_role?: string
    player_role_id?: number
    player_team?: string
    player_mark?: string

    selectable_card_limit?: { player: number; center: number }
    selectable_mark_limit?: { mark: number }
    selectable_cards?: string[]
    selectable_marks?: string[]
    shielded_cards: string[]
    artifacted_cards?: string[]
    show_cards?: Record<string, number>[]
    show_marks?: Record<string, string>[]
    
    //unique informations
    answer_options?: string[]

    mark_of_vampire?: string[]
    mark_of_fear?: string[]
    mark_of_bat?: string[]
    mark_of_disease?: string[]
    mark_of_love?: string[]
    mark_of_traitor?: string[]
    mark_of_clarity?: string[]
    mark_of_assassin?: string[]

    shield?: string[]
    artifact?: string[]

    aerial?: string[]
    aliens?: string[]
    alienhand?: string[]
    artifacted?: string[]
    assassins?: string[]
    /* awesome?: string[] */
    /* bear?: string[] */
    /* babyalien?: string[] */
    /* blind?: string[] */
    blob?: string[]
    /* bulb?: string[] */
    claw?: string[]
    /* coffin?: string[] */
    copy?: string[]
    /* cow?: string[] */
    detector?: string[]
    dog?: string[]
    dreamwolf?: string[]
    /* dress?: string[] */
    drunk?: string[]
    /* empath?: string[] */
    /* evil?: string[] */
    evilhand?: string[]
    /* eye?: string[] */
    family?: string[]
    /* friend?: string[] */
    gremlin?: string[]
    groobzerb?: string[]
    idcard?: string[]
    interaction?: string[]
    investigator?: string[]
    /* like?: string[] */
    lonely?: string[]
    lovers?: string[]
    mad?: string[]
    masons?: string[]
    mortician?: string[]
    /* mute?: string[] */
    mystic?: string[]
    /* nice?: string[] */
    /* night?: string[] */
    nostradamus?: string[]
    /* oracle?: string[] */
    peeker?: string[]
    prank?: string[]
    /* pretty?: string[] */
    robber?: string[]
    seers?: string[]
    /* select?: string[] */
    sentinel?: string[]
    /* smell?: string[] */
    /* spy?: string[] */
    /* sus?: string[] */
    swap?: string[]
    tanner?: string[]
    tap?: string[]
    thumb?: string[]
    /* trophy?: string[] */
    ufo?: string[]
    vampires?: string[]
    villains?: string[]
    voodoo?: string[]
    werewolves?: string[]
    witch?: string[]
  }
}

export type RoomType = {
  room_id: string
  room_name: string
  selectedCards: number[]
  players: string[]
}

export type PositionType = {
  position: string
  id?: number
  artifact?: boolean
  shield?: boolean
  mark?: string
  selectable_cards?: boolean
  selectable_marks?: boolean
  ready?: boolean
}

export type PlayersType = {
  player_name: string
  player_number: string
  ready?: boolean  
  voted?: boolean
}

export type GameTableBoardCardType = {
  position: string
  ready: boolean
  card: { id: number }
}

export type GamePlayBoardCardType = {
  position: string
  card: { 
    id: number, 
    mark: string,
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
    awesome?: boolean
    bear?: boolean
    babyalien?: boolean
    blind?: boolean
    blob?: boolean
    bulb?: boolean
    claw?: boolean
    coffin?: boolean
    copy?: boolean
    cow?: boolean
    detector?: boolean
    dog?: boolean
    dreamwolf?: boolean
    dress?: boolean
    drunk?: boolean
    empath?: boolean
    evil?: boolean
    evilhand?: boolean
    eye?: boolean
    family?: boolean
    friend?: boolean
    gremlin?: boolean
    groobzerb?: boolean
    idcard?: boolean
    interaction?: boolean
    investigator?: boolean
    jest?: boolean
    like?: boolean
    lonely?: boolean
    lover?: boolean
    mad?: boolean
    mason?: boolean
    mortician?: boolean
    mute?: boolean
    mystic?: boolean
    nice?: boolean
    night?: boolean
    nostradamus?: boolean
    oracle?: boolean
    peeker?: boolean
    prank?: boolean
    pretty?: boolean
    robber?: boolean
    secret?: boolean
    seer?: boolean
    select?: boolean
    sentinel?: boolean
    shielded?: boolean
    smell?: boolean
    spy?: boolean
    sus?: boolean
    swap?: boolean
    tanner?: boolean
    tap?: boolean
    thumb?: boolean
    trophy?: boolean
    ufo?: boolean
    vampire?: boolean
    villain?: boolean
    voodoo?: boolean
    werewolf?: boolean
    witch?: boolean 
  }
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card_id: number
  player_original_id: number
  player_role: string
  player_role_id: number
  player_team: string
  player_mark: string
}

export type PositionKeys =
  | 'center_left'
  | 'center_middle'
  | 'center_right'
  | 'center_wolf'
  | 'center_villain'
  | 'player_1'
  | 'player_2'
  | 'player_3'
  | 'player_4'
  | 'player_5'
  | 'player_6'
  | 'player_7'
  | 'player_8'
  | 'player_9'
  | 'player_10'
  | 'player_11'
  | 'player_12'

export type PlayerPositionProperties = {
  position: string
  ready?: boolean
  selectable_cards?: boolean
  selectable_marks?: boolean
  id?: number
  mark?: string

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
  awesome?: boolean
  bear?: boolean
  babyalien?: boolean
  blind?: boolean
  blob?: boolean
  bulb?: boolean
  claw?: boolean
  coffin?: boolean
  copy?: boolean
  cow?: boolean
  detector?: boolean
  dog?: boolean
  dreamwolf?: boolean
  dress?: boolean
  drunk?: boolean
  empath?: boolean
  evil?: boolean
  evilhand?: boolean
  eye?: boolean
  family?: boolean
  friend?: boolean
  gremlin?: boolean
  groobzerb?: boolean
  idcard?: boolean
  interaction?: boolean
  investigator?: boolean
  jest?: boolean
  like?: boolean
  lover?: boolean
  mad?: boolean
  mason?: boolean
  mortician?: boolean
  mute?: boolean
  mystic?: boolean
  nice?: boolean
  night?: boolean
  nostradamus?: boolean
  oracle?: boolean
  peeker?: boolean
  prank?: boolean
  pretty?: boolean
  robber?: boolean
  secret?: boolean
  seer?: boolean
  select?: boolean
  sentinel?: boolean
  shielded?: boolean
  smell?: boolean
  spy?: boolean
  sus?: boolean
  swap?: boolean
  tanner?: boolean
  tap?: boolean
  thumb?: boolean
  trophy?: boolean
  ufo?: boolean
  vampire?: boolean
  villain?: boolean
  voodoo?: boolean
  werewolf?: boolean
  witch?: boolean
}

export type CenterPositionProperties = {
  position: string
  selectable_cards?: boolean
  id?: number

  alienhand?: boolean
  copy?: boolean
  drunk?: boolean
  idcard?: boolean
  lonely?: boolean
  prank?: boolean
  seer?: boolean
  swap?: boolean
  voodoo?: boolean
  witch?: boolean
}
