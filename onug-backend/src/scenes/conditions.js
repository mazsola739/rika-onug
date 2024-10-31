import { IDS } from '../constants'

export const hasEpicBattle = (selected_cards) => {
  const battles = {
    vampire: IDS.ALL_VAMPIRE_IDS.some((id) => selected_cards.includes(id)),
    alien: IDS.ALL_ALIEN_IDS.some((id) => selected_cards.includes(id)),
    werewolf: IDS.ALL_WEREWOLF_IDS.some((id) => selected_cards.includes(id)),
    villain: IDS.ALL_SUPER_VILLAIN_IDS.some((id) => selected_cards.includes(id)),
  }
  const trueCount = Object.values(battles).filter((val) => val).length

  return trueCount >= 2
}

export const hasGoodGuys               = (selected_cards) => IDS.GOOD_GUY_IDS.some((id) => selected_cards.includes(id))
export const hasBadGuys                = (selected_cards) => IDS.BAD_GUY_IDS.some((id) => selected_cards.includes(id))
export const hasOracle                 = (selected_cards) => selected_cards.includes(50)
export const hasCopycat                = (selected_cards) => selected_cards.includes(30)
export const hasMirrorMan              = (selected_cards) => selected_cards.includes(64)
export const hasDoppelganger           = (selected_cards) => selected_cards.includes(1)
export const hasInstantAction          = (selected_cards) => IDS.DOPPELGANGER_INSTANT_ACTION_IDS.some((id) => selected_cards.includes(id))
export const hasAnyVampire             = (selected_cards) => IDS.ALL_VAMPIRE_IDS.some((id) => selected_cards.includes(id))
export const hasTheCount               = (selected_cards) => selected_cards.includes(39)
export const hasRenfield               = (selected_cards) => selected_cards.includes(38)
export const hasDiseased               = (selected_cards) => selected_cards.includes(32)
export const hasCupid                  = (selected_cards) => selected_cards.includes(31)
export const hasInstigator             = (selected_cards) => selected_cards.includes(34)
export const hasPriest                 = (selected_cards) => selected_cards.includes(37)
export const hasAssassin               = (selected_cards) => selected_cards.includes(29)
export const hasApprenticeAssassin     = (selected_cards) => selected_cards.includes(28)
export const hasSentinel               = (selected_cards) => selected_cards.includes(25)
export const hasAnyAlien               = (selected_cards) => IDS.ALL_ALIEN_IDS.some((id) => selected_cards.includes(id))
export const hasCow                    = (selected_cards) => selected_cards.includes(45)
export const hasGroobAndZerb           = (selected_cards) => IDS.GROOB_AND_ZERB_IDS.every((cardId) => selected_cards.includes(cardId))
export const hasLeader                 = (selected_cards) => selected_cards.includes(48)
export const hasBodySnatcher           = (selected_cards) => selected_cards.includes(74)
export const hasAnySuperVillains       = (selected_cards) => IDS.ALL_SUPER_VILLAIN_IDS.some((id) => selected_cards.includes(id))
export const hasTemptress              = (selected_cards) => selected_cards.includes(69)
export const hasDrPeeker               = (selected_cards) => selected_cards.includes(57)
export const hasRapscallion            = (selected_cards) => selected_cards.includes(65)
export const hasEvilometer             = (selected_cards) => selected_cards.includes(58)
export const hasAnyWerewolf            = (selected_cards) => IDS.ALL_WEREWOLF_IDS.some((id) => selected_cards.includes(id))
export const hasDreamWolf              = (selected_cards) => selected_cards.includes(21)
export const hasAlphaWolf              = (selected_cards) => selected_cards.includes(17)
export const hasMysticWolf             = (selected_cards) => selected_cards.includes(22)
export const hasMinion                 = (selected_cards) => selected_cards.includes(7)
export const hasApprenticeTanner       = (selected_cards) => selected_cards.includes(71)
export const hasTanner                 = (selected_cards) => selected_cards.includes(10)
export const hasMadScientist           = (selected_cards) => selected_cards.includes(63)
export const hasIntern                 = (selected_cards) => selected_cards.includes(62)
export const hasBothMasons             = (selected_cards) => IDS.MASONS.every((cardId) => selected_cards.includes(cardId))
export const hasAnyMason               = (selected_cards) => IDS.MASONS.some((id) => selected_cards.includes(id))
export const hasThing                  = (selected_cards) => selected_cards.includes(85)
export const hasAnnoyingLad            = (selected_cards) => selected_cards.includes(55)
export const hasSeer                   = (selected_cards) => selected_cards.includes(9)
export const hasApprenticeSeer         = (selected_cards) => selected_cards.includes(18)
export const hasParanormalInvestigator = (selected_cards) => selected_cards.includes(23)
export const hasMarksman               = (selected_cards) => selected_cards.includes(35)
export const hasNostradamus            = (selected_cards) => selected_cards.includes(80)
export const hasPsychic                = (selected_cards) => selected_cards.includes(51)
export const hasDetector               = (selected_cards) => selected_cards.includes(56)
export const hasRobber                 = (selected_cards) => selected_cards.includes(8)
export const hasWitch                  = (selected_cards) => selected_cards.includes(27)
export const hasPickpocket             = (selected_cards) => selected_cards.includes(36)
export const hasRoleRetriever          = (selected_cards) => selected_cards.includes(66)
export const hasVoodooLou              = (selected_cards) => selected_cards.includes(70)
export const hasTroublemaker           = (selected_cards) => selected_cards.includes(11)
export const hasVillageIdiot           = (selected_cards) => selected_cards.includes(26)
export const hasMarks                  = (selected_cards) => IDS.HAS_MARK_IDS.some((id) => selected_cards.includes(id))
export const hasAuraSeer               = (selected_cards) => selected_cards.includes(72)
export const hasGremlin                = (selected_cards) => selected_cards.includes(33)
export const hasRascal                 = (selected_cards) => selected_cards.includes(52)
export const hasSwitcheroo             = (selected_cards) => selected_cards.includes(68)
export const hasDrunk                  = (selected_cards) => selected_cards.includes(2)
export const hasInsomniac              = (selected_cards) => selected_cards.includes(4)
export const hasSelfAwarenessGirl      = (selected_cards) => selected_cards.includes(67)
export const hasSquire                 = (selected_cards) => selected_cards.includes(83)
export const hasSeers                  = (selected_cards) => IDS.SEERS.some((id) => selected_cards.includes(id))
export const hasRevealer               = (selected_cards) => selected_cards.includes(24)
export const hasExposer                = (selected_cards) => selected_cards.includes(46)
export const hasFlipper                = (selected_cards) => selected_cards.includes(59)
export const hasEmpath                 = (selected_cards) => selected_cards.includes(77)
export const hasCurator                = (selected_cards) => selected_cards.includes(20)
export const hasBlob                   = (selected_cards) => selected_cards.includes(44)
export const hasMortician              = (selected_cards) => selected_cards.includes(49)
export const hasFamilyMan              = (selected_cards) => selected_cards.includes(78)
export const hasRipple                 = (selected_cards) => IDS.ALL_ALIEN_IDS.some((id) => selected_cards.includes(id)) //TODO oracle is enough for ripple

export const hasEasterEgg              = (selected_cards, totalPlayers) =>  !hasGoodGuys(selected_cards) || !hasBadGuys(selected_cards) || totalPlayers === 12
export const haOneMasonAndDoppelganger = (selected_cards) =>  hasDoppelganger(selected_cards) && hasAnyMason(selected_cards)
export const hasMasons                 = (selected_cards) =>  hasBothMasons(selected_cards) || haOneMasonAndDoppelganger(selected_cards)
export const hasBeholder               = (selected_cards) =>  selected_cards.includes(73) && hasSeers
