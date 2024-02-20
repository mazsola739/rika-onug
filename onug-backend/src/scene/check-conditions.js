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
} from './constants';

const hasRole        = (selectedCards, roleId)  => selectedCards.includes(roleId)
const containsAllIds = (selectedCards, roleIds) => roleIds.every((cardId) => selectedCards.includes(cardId))
const containsAnyIds = (selectedCards, roleIds) => roleIds.some( (cardId) => selectedCards.includes(cardId))
const hasEpicBattle  = (selectedCards) => {
  const battles = {
    vampire:  epicVampireIds.some( id => selectedCards.includes(id)),
    alien:    epicAlienIds.some(   id => selectedCards.includes(id)),
    werewolf: epicWerewolfIds.some(id => selectedCards.includes(id)),
    villain:  epicVillainIds.some( id => selectedCards.includes(id))
  }
  const trueCount = Object.values(battles).filter(val => val).length

  return trueCount >= 2
}

export const checkCards = (selectedCards, totalPlayers) => {
  const conditions = {
    hasGoodGuys:               containsAnyIds(selectedCards, goodGuyIds),
    hasBadGuys:                containsAnyIds(selectedCards, badGuysIds),
    hasEpicBattle:             hasEpicBattle(selectedCards),
    hasOracle:                 hasRole(selectedCards, 50),
    hasCopycat:                hasRole(selectedCards, 30),
    hasMirrorMan:              hasRole(selectedCards, 64),
    hasDoppelganger:           hasRole(selectedCards, 1),
    hasInstantAction:          containsAnyIds(selectedCards, doppelgangerInstantActionsIds),
    hasAnyVampire:             containsAnyIds(selectedCards, vampireIds),
    hasTheCount:               hasRole(selectedCards, 39),
    hasRenfield:               hasRole(selectedCards, 38),
    hasDiseased:               hasRole(selectedCards, 32),
    hasCupid:                  hasRole(selectedCards, 31),
    hasInstigator:             hasRole(selectedCards, 34),
    hasPriest:                 hasRole(selectedCards, 37),
    hasAssassin:               hasRole(selectedCards, 29),
    hasApprenticeAssassin:     hasRole(selectedCards, 28),
    hasSentinel:               hasRole(selectedCards, 25),
    hasAnyAlien:               containsAnyIds(selectedCards, alienIds),
    hasCow:                    hasRole(selectedCards, 45),
    hasGroobAndZerb:           containsAllIds(selectedCards, groobAndZerbIds),
    hasLeader:                 hasRole(selectedCards, 48),
    hasBodySnatcher:           hasRole(selectedCards, 74),
    hasAnySuperVillains:       containsAnyIds(selectedCards, superVillainsIds),
    hasTemptress:              hasRole(selectedCards, 69),
    hasDrPeeker:               hasRole(selectedCards, 57),
    hasRapscallion:            hasRole(selectedCards, 65),
    hasEvilometer:             hasRole(selectedCards, 58),
    hasAnyWerewolf:            containsAnyIds(selectedCards, werewolvesIds),
    hasDreamWolf:              hasRole(selectedCards, 21),
    hasAlphaWolf:              hasRole(selectedCards, 17),
    hasMysticWolf:             hasRole(selectedCards, 22),
    hasMinion:                 hasRole(selectedCards, 7),
    hasApprenticeTanner:       hasRole(selectedCards, 71),
    hasTanner:                 hasRole(selectedCards, 10),
    hasMadScientist:           hasRole(selectedCards, 63),
    hasIntern:                 hasRole(selectedCards, 62),
    hasBothMasons:             containsAllIds(selectedCards, masonIds),
    hasAnyMason:               containsAnyIds(selectedCards, masonIds),
    hasThing:                  hasRole(selectedCards, 85),
    hasAnnoyingLad:            hasRole(selectedCards, 55),
    hasSeer:                   hasRole(selectedCards, 9),
    hasApprenticeSeer:         hasRole(selectedCards, 18),
    hasParanormalInvestigator: hasRole(selectedCards, 23),
    hasMarksman:               hasRole(selectedCards, 35),
    hasNostradamus:            hasRole(selectedCards, 80),
    hasPsychic:                hasRole(selectedCards, 51),
    hasDetector:               hasRole(selectedCards, 56),
    hasRobber:                 hasRole(selectedCards, 8),
    hasWitch:                  hasRole(selectedCards, 27),
    hasPickpocket:             hasRole(selectedCards, 36),
    hasRoleRetriever:          hasRole(selectedCards, 66),
    hasVoodooLou:              hasRole(selectedCards, 70),
    hasTroublemaker:           hasRole(selectedCards, 11),
    hasVillageIdiot:           hasRole(selectedCards, 26),
    hasMarks:                  containsAnyIds(selectedCards, hasMarkIds),
    hasAuraSeer:               hasRole(selectedCards, 72),
    hasGremlin:                hasRole(selectedCards, 33),
    hasRascal:                 hasRole(selectedCards, 52),
    hasSwitcheroo:             hasRole(selectedCards, 68),
    hasDrunk:                  hasRole(selectedCards, 2),
    hasInsomniac:              hasRole(selectedCards, 4),
    hasSelfAwarenessGirl:      hasRole(selectedCards, 67),
    hasSquire:                 hasRole(selectedCards, 83),
    hasSeers:                  containsAnyIds(selectedCards, seerIds),
    hasRevealer:               hasRole(selectedCards, 24),
    hasExposer:                hasRole(selectedCards, 46),
    hasFlipper:                hasRole(selectedCards, 59),
    hasEmpath:                 hasRole(selectedCards, 77),
    hasCurator:                hasRole(selectedCards, 20),
    hasBlob:                   hasRole(selectedCards, 44),
    hasMortician:              hasRole(selectedCards, 49),
    hasFamilyMan:              hasRole(selectedCards, 78),
    hasRipple:                 containsAnyIds(selectedCards, alienIds), //TODO oracle is enough for ripple?
  }
  conditions.hasEasterEgg              = !conditions.hasGoodGuys || !conditions.hasBadGuys || totalPlayers === 12
  conditions.haOneMasonAndDoppelganger = conditions.hasDoppelganger && conditions.hasAnyMason
  conditions.hasMasons                 = conditions.hasBothMasons || conditions.haOneMasonAndDoppelganger
  conditions.hasBeholder               = hasRole(selectedCards, 73) && conditions.hasSeers

  return conditions
};

//TODO check if i can merge into conditions
/* const hasInstantAction = containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
const hasBothMasons = containsAllIds(selectedCards, masonIds)
const hasAnyMason = containsAnyIds(selectedCards, masonIds)
const haOneMasonAndDoppelganger = containsAllIds(selectedCards, [1]) && hasAnyMason
const hasMasons = hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
const hasSeers = containsAnyIds(selectedCards, seerIds) //TODO check i need it on beholder */

export const checkCards = (selectedCards, totalPlayers) => {
  const conditions = {
    hasGoodGuys:               containsAnyIds(selectedCards, goodGuyIds),
    hasBadGuys:                containsAnyIds(selectedCards, badGuysIds),
    hasEpicBattle:             hasEpicBattle(selectedCards),
    hasOracle:                 hasRole(selectedCards, 50),
    hasCopycat:                hasRole(selectedCards, 30),
    hasMirrorMan:              hasRole(selectedCards, 64),
    hasDoppelganger:           hasRole(selectedCards, 1),
    hasInstantAction:          containsAnyIds(selectedCards, doppelgangerInstantActionsIds),
    hasAnyVampire:             containsAnyIds(selectedCards, vampireIds),
    hasTheCount:               hasRole(selectedCards, 39),
    hasRenfield:               hasRole(selectedCards, 38),
    hasDiseased:               hasRole(selectedCards, 32),
    hasCupid:                  hasRole(selectedCards, 31),
    hasInstigator:             hasRole(selectedCards, 34),
    hasPriest:                 hasRole(selectedCards, 37),
    hasAssassin:               hasRole(selectedCards, 29),
    hasApprenticeAssassin:     hasRole(selectedCards, 28),
    hasSentinel:               hasRole(selectedCards, 25),
    hasAnyAlien:               containsAnyIds(selectedCards, alienIds),
    hasCow:                    hasRole(selectedCards, 45),
    hasGroobAndZerb:           containsAllIds(selectedCards, groobAndZerbIds),
    hasLeader:                 hasRole(selectedCards, 48),
    hasBodySnatcher:           hasRole(selectedCards, 74),
    hasAnySuperVillains:       containsAnyIds(selectedCards, superVillainsIds),
    hasTemptress:              hasRole(selectedCards, 69),
    hasDrPeeker:               hasRole(selectedCards, 57),
    hasRapscallion:            hasRole(selectedCards, 65),
    hasEvilometer:             hasRole(selectedCards, 58),
    hasAnyWerewolf:            containsAnyIds(selectedCards, werewolvesIds),
    hasDreamWolf:              hasRole(selectedCards, 21),
    hasAlphaWolf:              hasRole(selectedCards, 17),
    hasMysticWolf:             hasRole(selectedCards, 22),
    hasMinion:                 hasRole(selectedCards, 7),
    hasApprenticeTanner:       hasRole(selectedCards, 71),
    hasTanner:                 hasRole(selectedCards, 10),
    hasMadScientist:           hasRole(selectedCards, 63),
    hasIntern:                 hasRole(selectedCards, 62),
    hasBothMasons:             containsAllIds(selectedCards, masonIds),
    hasAnyMason:               containsAnyIds(selectedCards, masonIds),
    hasThing:                  hasRole(selectedCards, 85),
    hasAnnoyingLad:            hasRole(selectedCards, 55),
    hasSeer:                   hasRole(selectedCards, 9),
    hasApprenticeSeer:         hasRole(selectedCards, 18),
    hasParanormalInvestigator: hasRole(selectedCards, 23),
    hasMarksman:               hasRole(selectedCards, 35),
    hasNostradamus:            hasRole(selectedCards, 80),
    hasPsychic:                hasRole(selectedCards, 51),
    hasDetector:               hasRole(selectedCards, 56),
    hasRobber:                 hasRole(selectedCards, 8),
    hasWitch:                  hasRole(selectedCards, 27),
    hasPickpocket:             hasRole(selectedCards, 36),
    hasRoleRetriever:          hasRole(selectedCards, 66),
    hasVoodooLou:              hasRole(selectedCards, 70),
    hasTroublemaker:           hasRole(selectedCards, 11),
    hasVillageIdiot:           hasRole(selectedCards, 26),
    hasMarks:                  containsAnyIds(selectedCards, hasMarkIds),
    hasAuraSeer:               hasRole(selectedCards, 72),
    hasGremlin:                hasRole(selectedCards, 33),
    hasRascal:                 hasRole(selectedCards, 52),
    hasSwitcheroo:             hasRole(selectedCards, 68),
    hasDrunk:                  hasRole(selectedCards, 2),
    hasInsomniac:              hasRole(selectedCards, 4),
    hasSelfAwarenessGirl:      hasRole(selectedCards, 67),
    hasSquire:                 hasRole(selectedCards, 83),
    hasSeers:                  containsAnyIds(selectedCards, seerIds),
    hasRevealer:               hasRole(selectedCards, 24),
    hasExposer:                hasRole(selectedCards, 46),
    hasFlipper:                hasRole(selectedCards, 59),
    hasEmpath:                 hasRole(selectedCards, 77),
    hasCurator:                hasRole(selectedCards, 20),
    hasBlob:                   hasRole(selectedCards, 44),
    hasMortician:              hasRole(selectedCards, 49),
    hasFamilyMan:              hasRole(selectedCards, 78),
    hasRipple:                 containsAnyIds(selectedCards, alienIds), //TODO oracle is enough for ripple?
  }
  conditions.hasEasterEgg              = !conditions.hasGoodGuys || !conditions.hasBadGuys || totalPlayers === 12
  conditions.haOneMasonAndDoppelganger = conditions.hasDoppelganger && conditions.hasAnyMason
  conditions.hasMasons                 = conditions.hasBothMasons || conditions.haOneMasonAndDoppelganger
  conditions.hasBeholder               = hasRole(selectedCards, 73) && conditions.hasSeers

  return conditions
};

