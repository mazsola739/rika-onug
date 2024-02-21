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
} from './constants';
import { selected_cards } from './scene-handler';

const hasRole = (roleId) => selected_cards.includes(roleId)
const containsAllIds = (roleIds) => roleIds.every((cardId) => selected_cards.includes(cardId))
const containsAnyIds = (roleIds) => roleIds.some((cardId) => selected_cards.includes(cardId))

const containsAnyOriginalIds = (players, ids) => ids.some(id => Object.values(players).some(player => player.card.player_original_id === id))
const containsAllOriginalIds = (players, ids) => ids.every(id => Object.values(players).some(player => player.card.player_original_id === id))

const hasEpicBattle = () => {
  const battles = {
    vampire: epicVampireIds.some(id => selected_cards.includes(id)),
    alien: epicAlienIds.some(id => selected_cards.includes(id)),
    werewolf: epicWerewolfIds.some(id => selected_cards.includes(id)),
    villain: epicVillainIds.some(id => selected_cards.includes(id))
  }
  const trueCount = Object.values(battles).filter(val => val).length

  return trueCount >= 2
}

export const hasOraclePlayer = (players) => containsAllOriginalIds(players, [50])
export const hasCopycatPlayer = (players) => containsAllOriginalIds(players, [30])
export const hasMirrorManPlayer = (players) => containsAllOriginalIds(players, [64])
export const hasDoppelgangerPlayer = (players) => containsAllOriginalIds(players, [1])
export const hasAnyVampirePlayers = (players) => containsAnyOriginalIds(players, vampireIds)
export const hasTheCountPlayer = (players) => containsAllOriginalIds(players, [39])
export const hasRenfieldPlayer = (players) => containsAllOriginalIds(players, [38])
export const hasDiseasedPlayer = (players) => containsAllOriginalIds(players, [32])
export const hasCupidPlayer = (players) => containsAllOriginalIds(players, [31])
export const hasInstigatorPlayer = (players) => containsAllOriginalIds(players, [34])
export const hasPriestPlayer = (players) => containsAllOriginalIds(players, [37])
export const hasAssassinPlayer = (players) => containsAllOriginalIds(players, [29])
export const hasApprenticeAssassinPlayer = (players) => containsAllOriginalIds(players, [28])
export const hasSentinelPlayer = (players) => containsAllOriginalIds(players, [25])
export const hasAnyAlienPlayers = (players) => containsAnyOriginalIds(players, alienIds)
export const hasCowPlayer = (players) => containsAllOriginalIds(players, [45])
export const hasGroobAndZerbPlayers = (players) => containsAllOriginalIds(players, groobAndZerbIds)
export const hasLeaderPlayer = (players) => containsAllOriginalIds(players, [48])
export const hasBodySnatcherPlayer = (players) => containsAllOriginalIds(players, [74])
export const hasAnySuperVillainsPlayers = (players) => containsAnyOriginalIds(players, superVillainsIds)
export const hasTemptressPlayer = (players) => containsAllOriginalIds(players, [69])
export const hasDrPeekerPlayer = (players) => containsAllOriginalIds(players, [57])
export const hasRapscallionPlayer = (players) => containsAllOriginalIds(players, [65])
export const hasEvilometerPlayer = (players) => containsAllOriginalIds(players, [58])
export const hasAnyWerewolfPlayers = (players) => containsAnyOriginalIds(players, werewolvesIds)
export const hasDreamWolfPlayer = (players) => containsAllOriginalIds(players, [21])
export const hasAlphaWolfPlayer = (players) => containsAllOriginalIds(players, [17])
export const hasMysticWolfPlayer = (players) => containsAllOriginalIds(players, [22])
export const hasMinionPlayer = (players) => containsAllOriginalIds(players, [7])
export const hasApprenticeTannerPlayer = (players) => containsAllOriginalIds(players, [71])
export const hasTannerPlayer = (players) => containsAllOriginalIds(players, [10])
export const hasMadScientistPlayer = (players) => containsAllOriginalIds(players, [63])
export const hasInternPlayer = (players) => containsAllOriginalIds(players, [62])
export const hasMasonPlayers = (players) => containsAnyOriginalIds(players, masonIds)
export const hasThingPlayer = (players) => containsAllOriginalIds(players, [85])
export const hasAnnoyingLadPlayer = (players) => containsAllOriginalIds(players, [55])
export const hasSeerPlayer = (players) => containsAllOriginalIds(players, [9])
export const hasApprenticeSeerPlayer = (players) => containsAllOriginalIds(players, [18])
export const hasParanormalInvestigatorPlayer = (players) => containsAllOriginalIds(players, [23])
export const hasMarksmanPlayer = (players) => containsAllOriginalIds(players, [35])
export const hasNostradamusPlayer = (players) => containsAllOriginalIds(players, [80])
export const hasPsychicPlayer = (players) => containsAllOriginalIds(players, [51])
export const hasDetectorPlayer = (players) => containsAllOriginalIds(players, [56])
export const hasRobberPlayer = (players) => containsAllOriginalIds(players, [8])
export const hasWitchPlayer = (players) => containsAllOriginalIds(players, [27])
export const hasPickpocketPlayer = (players) => containsAllOriginalIds(players, [36])
export const hasRoleRetrieverPlayer = (players) => containsAllOriginalIds(players, [66])
export const hasVoodooLouPlayer = (players) => containsAllOriginalIds(players, [70])
export const hasTroublemakerPlayer = (players) => containsAllOriginalIds(players, [11])
export const hasVillageIdiotPlayer = (players) => containsAllOriginalIds(players, [26])
//export const hasMarks = (players) => containsAnyOriginalIds(players,hasMarkIds) //! TODO
export const hasAuraSeerPlayer = (players) => containsAllOriginalIds(players, [72])
export const hasGremlinPlayer = (players) => containsAllOriginalIds(players, [33])
export const hasRascalPlayer = (players) => containsAllOriginalIds(players, [52])
export const hasSwitcherooPlayer = (players) => containsAllOriginalIds(players, [68])
export const hasDrunkPlayer = (players) => containsAllOriginalIds(players, [2])
export const hasInsomniacPlayer = (players) => containsAllOriginalIds(players, [4])
export const hasSelfAwarenessGirlPlayer = (players) => containsAllOriginalIds(players, [67])
export const hasSquirePlayer = (players) => containsAllOriginalIds(players, [83])
export const hasBeholderPlayer = (players) => containsAllOriginalIds(players, [73])
export const hasRevealerPlayer = (players) => containsAllOriginalIds(players, [24])
export const hasExposerPlayer = (players) => containsAllOriginalIds(players, [46])
export const hasFlipperPlayer = (players) => containsAllOriginalIds(players, [59])
export const hasEmpathPlayer = (players) => containsAllOriginalIds(players, [77])
export const hasCuratorPlayer = (players) => containsAllOriginalIds(players, [20])
export const hasBlobPlayer = (players) => containsAllOriginalIds(players, [44])
export const hasMorticianPlayer = (players) => containsAllOriginalIds(players, [49])
export const hasFamilyManPlayer = (players) => containsAllOriginalIds(players, [78])
//TODO check
//export const hasInstantAction = () =>containsAnyIds(selected_cards, doppelgangerInstantActionsIds)
//export const hasBothMasons = () =>containsAllIds(selected_cards, masonIds)
//export const hasAnyMason = () =>containsAnyIds(selected_cards, masonIds)
//export const haOneMasonAndDoppelganger = () =>containsAllIds(selected_cards, [1]) && hasAnyMason
//export const hasMasons =  hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
//export const hasSeers = () =>containsAnyIds(selected_cards, seerIds) //TODO check i need it on beholder */

export const hasGoodGuys = () => containsAnyIds(selected_cards, goodGuyIds)
export const hasBadGuys = () => containsAnyIds(selected_cards, badGuysIds)
//export const hasEpicBattle = ()=> hasEpicBattle() //! TODO
export const hasOracle = () => hasRole(selected_cards, 50)
export const hasCopycat = () => hasRole(selected_cards, 30)
export const hasMirrorMan = () => hasRole(selected_cards, 64)
export const hasDoppelganger = () => hasRole(selected_cards, 1)
export const hasInstantAction = () => containsAnyIds(selected_cards, doppelgangerInstantActionsIds)
export const hasAnyVampire = () => containsAnyIds(selected_cards, vampireIds)
export const hasTheCount = () => hasRole(selected_cards, 39)
export const hasRenfield = () => hasRole(selected_cards, 38)
export const hasDiseased = () => hasRole(selected_cards, 32)
export const hasCupid = () => hasRole(selected_cards, 31)
export const hasInstigator = () => hasRole(selected_cards, 34)
export const hasPriest = () => hasRole(selected_cards, 37)
export const hasAssassin = () => hasRole(selected_cards, 29)
export const hasApprenticeAssassin = () => hasRole(selected_cards, 28)
export const hasSentinel = () => hasRole(selected_cards, 25)
export const hasAnyAlien = () => containsAnyIds(selected_cards, alienIds)
export const hasCow = () => hasRole(selected_cards, 45)
export const hasGroobAndZerb = () => containsAllIds(selected_cards, groobAndZerbIds)
export const hasLeader = () => hasRole(selected_cards, 48)
export const hasBodySnatcher = () => hasRole(selected_cards, 74)
export const hasAnySuperVillains = () => containsAnyIds(selected_cards, superVillainsIds)
export const hasTemptress = () => hasRole(selected_cards, 69)
export const hasDrPeeker = () => hasRole(selected_cards, 57)
export const hasRapscallion = () => hasRole(selected_cards, 65)
export const hasEvilometer = () => hasRole(selected_cards, 58)
export const hasAnyWerewolf = () => containsAnyIds(selected_cards, werewolvesIds)
export const hasDreamWolf = () => hasRole(selected_cards, 21)
export const hasAlphaWolf = () => hasRole(selected_cards, 17)
export const hasMysticWolf = () => hasRole(selected_cards, 22)
export const hasMinion = () => hasRole(selected_cards, 7)
export const hasApprenticeTanner = () => hasRole(selected_cards, 71)
export const hasTanner = () => hasRole(selected_cards, 10)
export const hasMadScientist = () => hasRole(selected_cards, 63)
export const hasIntern = () => hasRole(selected_cards, 62)
export const hasBothMasons = () => containsAllIds(selected_cards, masonIds)
export const hasAnyMason = () => containsAnyIds(selected_cards, masonIds)
export const hasThing = () => hasRole(selected_cards, 85)
export const hasAnnoyingLad = () => hasRole(selected_cards, 55)
export const hasSeer = () => hasRole(selected_cards, 9)
export const hasApprenticeSeer = () => hasRole(selected_cards, 18)
export const hasParanormalInvestigator = () => hasRole(selected_cards, 23)
export const hasMarksman = () => hasRole(selected_cards, 35)
export const hasNostradamus = () => hasRole(selected_cards, 80)
export const hasPsychic = () => hasRole(selected_cards, 51)
export const hasDetector = () => hasRole(selected_cards, 56)
export const hasRobber = () => hasRole(selected_cards, 8)
export const hasWitch = () => hasRole(selected_cards, 27)
export const hasPickpocket = () => hasRole(selected_cards, 36)
export const hasRoleRetriever = () => hasRole(selected_cards, 66)
export const hasVoodooLou = () => hasRole(selected_cards, 70)
export const hasTroublemaker = () => hasRole(selected_cards, 11)
export const hasVillageIdiot = () => hasRole(selected_cards, 26)
export const hasMarks = () => containsAnyIds(selected_cards, hasMarkIds)
export const hasAuraSeer = () => hasRole(selected_cards, 72)
export const hasGremlin = () => hasRole(selected_cards, 33)
export const hasRascal = () => hasRole(selected_cards, 52)
export const hasSwitcheroo = () => hasRole(selected_cards, 68)
export const hasDrunk = () => hasRole(selected_cards, 2)
export const hasInsomniac = () => hasRole(selected_cards, 4)
export const hasSelfAwarenessGirl = () => hasRole(selected_cards, 67)
export const hasSquire = () => hasRole(selected_cards, 83)
export const hasSeers = () => containsAnyIds(selected_cards, seerIds)
export const hasRevealer = () => hasRole(selected_cards, 24)
export const hasExposer = () => hasRole(selected_cards, 46)
export const hasFlipper = () => hasRole(selected_cards, 59)
export const hasEmpath = () => hasRole(selected_cards, 77)
export const hasCurator = () => hasRole(selected_cards, 20)
export const hasBlob = () => hasRole(selected_cards, 44)
export const hasMortician = () => hasRole(selected_cards, 49)
export const hasFamilyMan = () => hasRole(selected_cards, 78)
export const hasRipple = () => containsAnyIds(selected_cards, alienIds) //TODO oracle is enough for ripple?

//export const hasEasterEgg              = !hasGoodGuys || !hasBadGuys || totalPlayers === 12
export const haOneMasonAndDoppelganger = hasDoppelganger && hasAnyMason
export const hasMasons = hasBothMasons || haOneMasonAndDoppelganger
//export const hasBeholder               = hasRole(selected_cards, 73) && hasSeers
