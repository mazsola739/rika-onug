//@ts-check
import {
  vampireIds,
  alienIds,
  groobAndZerbIds,
  superVillainsIds,
  werewolvesIds,
  masonIds,
  goodGuyIds,
  badGuysIds,
  doppelgangerInstantActionsIds,
  seerIds,
  hasMarkIds,
  epicVampireIds,
  epicAlienIds,
  epicWerewolfIds,
  epicVillainIds,
} from '../constant';

const hasRole = (roleId, selected_cards) => selected_cards.includes(roleId)
const containsAllIds = (roleIds, selected_cards) => roleIds.every((cardId) => selected_cards.includes(cardId))
const containsAnyIds = (roleIds, selected_cards) => roleIds.some((cardId) => selected_cards.includes(cardId))

export const hasEpicBattle = (selected_cards) => {
  const battles = {
    vampire: epicVampireIds.some(id => selected_cards.includes(id)),
    alien: epicAlienIds.some(id => selected_cards.includes(id)),
    werewolf: epicWerewolfIds.some(id => selected_cards.includes(id)),
    villain: epicVillainIds.some(id => selected_cards.includes(id))
  }
  const trueCount = Object.values(battles).filter(val => val).length

  return trueCount >= 2
}

export const hasGoodGuys = (selected_cards) => containsAnyIds(selected_cards, goodGuyIds)
export const hasBadGuys = (selected_cards) => containsAnyIds(selected_cards, badGuysIds)
export const hasOracle = (selected_cards) => hasRole(selected_cards, 50)
export const hasCopycat = (selected_cards) => hasRole(selected_cards, 30)
export const hasMirrorMan = (selected_cards) => hasRole(selected_cards, 64)
export const hasDoppelganger = (selected_cards) => hasRole(selected_cards, 1)
export const hasInstantAction = (selected_cards) => containsAnyIds(selected_cards, doppelgangerInstantActionsIds)
export const hasAnyVampire = (selected_cards) => containsAnyIds(selected_cards, vampireIds)
export const hasTheCount = (selected_cards) => hasRole(selected_cards, 39)
export const hasRenfield = (selected_cards) => hasRole(selected_cards, 38)
export const hasDiseased = (selected_cards) => hasRole(selected_cards, 32)
export const hasCupid = (selected_cards) => hasRole(selected_cards, 31)
export const hasInstigator = (selected_cards) => hasRole(selected_cards, 34)
export const hasPriest = (selected_cards) => hasRole(selected_cards, 37)
export const hasAssassin = (selected_cards) => hasRole(selected_cards, 29)
export const hasApprenticeAssassin = (selected_cards) => hasRole(selected_cards, 28)
export const hasSentinel = (selected_cards) => hasRole(selected_cards, 25)
export const hasAnyAlien = (selected_cards) => containsAnyIds(selected_cards, alienIds)
export const hasCow = (selected_cards) => hasRole(selected_cards, 45)
export const hasGroobAndZerb = (selected_cards) => containsAllIds(selected_cards, groobAndZerbIds)
export const hasLeader = (selected_cards) => hasRole(selected_cards, 48)
export const hasBodySnatcher = (selected_cards) => hasRole(selected_cards, 74)
export const hasAnySuperVillains = (selected_cards) => containsAnyIds(selected_cards, superVillainsIds)
export const hasTemptress = (selected_cards) => hasRole(selected_cards, 69)
export const hasDrPeeker = (selected_cards) => hasRole(selected_cards, 57)
export const hasRapscallion = (selected_cards) => hasRole(selected_cards, 65)
export const hasEvilometer = (selected_cards) => hasRole(selected_cards, 58)
export const hasAnyWerewolf = (selected_cards) => containsAnyIds(selected_cards, werewolvesIds)
export const hasDreamWolf = (selected_cards) => hasRole(selected_cards, 21)
export const hasAlphaWolf = (selected_cards) => hasRole(selected_cards, 17)
export const hasMysticWolf = (selected_cards) => hasRole(selected_cards, 22)
export const hasMinion = (selected_cards) => hasRole(selected_cards, 7)
export const hasApprenticeTanner = (selected_cards) => hasRole(selected_cards, 71)
export const hasTanner = (selected_cards) => hasRole(selected_cards, 10)
export const hasMadScientist = (selected_cards) => hasRole(selected_cards, 63)
export const hasIntern = (selected_cards) => hasRole(selected_cards, 62)
export const hasBothMasons = (selected_cards) => containsAllIds(selected_cards, masonIds)
export const hasAnyMason = (selected_cards) => containsAnyIds(selected_cards, masonIds)
export const hasThing = (selected_cards) => hasRole(selected_cards, 85)
export const hasAnnoyingLad = (selected_cards) => hasRole(selected_cards, 55)
export const hasSeer = (selected_cards) => hasRole(selected_cards, 9)
export const hasApprenticeSeer = (selected_cards) => hasRole(selected_cards, 18)
export const hasParanormalInvestigator = (selected_cards) => hasRole(selected_cards, 23)
export const hasMarksman = (selected_cards) => hasRole(selected_cards, 35)
export const hasNostradamus = (selected_cards) => hasRole(selected_cards, 80)
export const hasPsychic = (selected_cards) => hasRole(selected_cards, 51)
export const hasDetector = (selected_cards) => hasRole(selected_cards, 56)
export const hasRobber = (selected_cards) => hasRole(selected_cards, 8)
export const hasWitch = (selected_cards) => hasRole(selected_cards, 27)
export const hasPickpocket = (selected_cards) => hasRole(selected_cards, 36)
export const hasRoleRetriever = (selected_cards) => hasRole(selected_cards, 66)
export const hasVoodooLou = (selected_cards) => hasRole(selected_cards, 70)
export const hasTroublemaker = (selected_cards) => hasRole(selected_cards, 11)
export const hasVillageIdiot = (selected_cards) => hasRole(selected_cards, 26)
export const hasMarks = (selected_cards) => containsAnyIds(selected_cards, hasMarkIds)
export const hasAuraSeer = (selected_cards) => hasRole(selected_cards, 72)
export const hasGremlin = (selected_cards) => hasRole(selected_cards, 33)
export const hasRascal = (selected_cards) => hasRole(selected_cards, 52)
export const hasSwitcheroo = (selected_cards) => hasRole(selected_cards, 68)
export const hasDrunk = (selected_cards) => hasRole(selected_cards, 2)
export const hasInsomniac = (selected_cards) => hasRole(selected_cards, 4)
export const hasSelfAwarenessGirl = (selected_cards) => hasRole(selected_cards, 67)
export const hasSquire = (selected_cards) => hasRole(selected_cards, 83)
export const hasSeers = (selected_cards) => containsAnyIds(selected_cards, seerIds)
export const hasRevealer = (selected_cards) => hasRole(selected_cards, 24)
export const hasExposer = (selected_cards) => hasRole(selected_cards, 46)
export const hasFlipper = (selected_cards) => hasRole(selected_cards, 59)
export const hasEmpath = (selected_cards) => hasRole(selected_cards, 77)
export const hasCurator = (selected_cards) => hasRole(selected_cards, 20)
export const hasBlob = (selected_cards) => hasRole(selected_cards, 44)
export const hasMortician = (selected_cards) => hasRole(selected_cards, 49)
export const hasFamilyMan = (selected_cards) => hasRole(selected_cards, 78)
export const hasRipple = (selected_cards) => containsAnyIds(selected_cards, alienIds) //TODO oracle is enough for ripple?

export const hasEasterEgg = (totalPlayers) => !hasGoodGuys || !hasBadGuys || totalPlayers === 12
/* export const haOneMasonAndDoppelganger = hasDoppelganger  && hasAnyMason
export const hasMasons = hasBothMasons || haOneMasonAndDoppelganger */
export const hasBeholder = (selected_cards) => hasRole(selected_cards, 73) && hasSeers
