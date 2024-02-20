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
const containsAnyOriginalIds = (players, ids) => ids.some(id =>  Object.values(players).some(player = (player) => player.card.player_original_id === id))
const containsAllOriginalIds = (players, ids) => ids.every(id => Object.values(players).some(player = (player) => player.card.player_original_id === id))

export const hasOraclePlayer = (players)                 => containsAllOriginalIds(players, [50])
export const hasCopycatPlayer = (players)                => containsAllOriginalIds(players, [30])
export const hasMirrorManPlayer = (players)              => containsAllOriginalIds(players, [64])
export const hasDoppelgangerPlayer = (players)           => containsAllOriginalIds(players, [1])
export const hasAnyVampirePlayers = (players)            => containsAnyOriginalIds(players, vampireIds)
export const hasTheCountPlayer = (players)               => containsAllOriginalIds(players, [39])
export const hasRenfieldPlayer = (players)               => containsAllOriginalIds(players, [38])
export const hasDiseasedPlayer = (players)               => containsAllOriginalIds(players, [32])
export const hasCupidPlayer = (players)                  => containsAllOriginalIds(players, [31])
export const hasInstigatorPlayer = (players)             => containsAllOriginalIds(players, [34]) 
export const hasPriestPlayer = (players)                 => containsAllOriginalIds(players, [37])
export const hasAssassinPlayer = (players)               => containsAllOriginalIds(players, [29])
export const hasApprenticeAssassinPlayer = (players)     => containsAllOriginalIds(players, [28])
export const hasSentinelPlayer = (players)               => containsAllOriginalIds(players, [25])
export const hasAnyAlienPlayers = (players)              => containsAnyOriginalIds(players, alienIds)
export const hasCowPlayer = (players)                    => containsAllOriginalIds(players, [45])
export const hasGroobAndZerbPlayers = (players)          => containsAllOriginalIds(players, groobAndZerbIds)
export const hasLeaderPlayer = (players)                 => containsAllOriginalIds(players, [48])
export const hasBodySnatcherPlayer = (players)           => containsAllOriginalIds(players, [74])
export const hasAnySuperVillainsPlayers = (players)      => containsAnyOriginalIds(players, superVillainsIds)
export const hasTemptressPlayer = (players)              => containsAllOriginalIds(players, [69])
export const hasDrPeekerPlayer = (players)               => containsAllOriginalIds(players, [57])
export const hasRapscallionPlayer = (players)            => containsAllOriginalIds(players, [65])
export const hasEvilometerPlayer = (players)             => containsAllOriginalIds(players, [58])
export const hasAnyWerewolfPlayers = (players)           => containsAnyOriginalIds(players, werewolvesIds)
export const hasDreamWolfPlayer = (players)              => containsAllOriginalIds(players, [21])
export const hasAlphaWolfPlayer = (players)              => containsAllOriginalIds(players, [17])
export const hasMysticWolfPlayer = (players)             => containsAllOriginalIds(players, [22])
export const hasMinionPlayer = (players)                 => containsAllOriginalIds(players, [7])
export const hasApprenticeTannerPlayer = (players)       => containsAllOriginalIds(players, [71])
export const hasTannerPlayer = (players)                 => containsAllOriginalIds(players, [10])
export const hasMadScientistPlayer = (players)           => containsAllOriginalIds(players, [63])
export const hasInternPlayer = (players)                 => containsAllOriginalIds(players, [62])
export const hasMasonPlayers = (players)                 => containsAnyOriginalIds(players, masonIds)
export const hasThingPlayer = (players)                  => containsAllOriginalIds(players, [85])
export const hasAnnoyingLadPlayer = (players)            => containsAllOriginalIds(players, [55])
export const hasSeerPlayer = (players)                   => containsAllOriginalIds(players, [9])
export const hasApprenticeSeerPlayer = (players)         => containsAllOriginalIds(players, [18])
export const hasParanormalInvestigatorPlayer = (players) => containsAllOriginalIds(players, [23])
export const hasMarksmanPlayer = (players)               => containsAllOriginalIds(players, [35])
export const hasNostradamusPlayer = (players)            => containsAllOriginalIds(players, [80])
export const hasPsychicPlayer = (players)                => containsAllOriginalIds(players, [51])
export const hasDetectorPlayer = (players)               => containsAllOriginalIds(players, [56])
export const hasRobberPlayer = (players)                 => containsAllOriginalIds(players, [8])
export const hasWitchPlayer = (players)                  => containsAllOriginalIds(players, [27])
export const hasPickpocketPlayer = (players)             => containsAllOriginalIds(players, [36])
export const hasRoleRetrieverPlayer = (players)          => containsAllOriginalIds(players, [66])
export const hasVoodooLouPlayer = (players)              => containsAllOriginalIds(players, [70])
export const hasTroublemakerPlayer = (players)           => containsAllOriginalIds(players, [11])
export const hasVillageIdiotPlayer = (players)           => containsAllOriginalIds(players, [26])
//export const hasMarks = (players)                        => containsAnyOriginalIds(players,hasMarkIds) //! TODO
export const hasAuraSeerPlayer = (players)               => containsAllOriginalIds(players, [72])
export const hasGremlinPlayer = (players)                => containsAllOriginalIds(players, [33])
export const hasRascalPlayer = (players)                 => containsAllOriginalIds(players, [52])
export const hasSwitcherooPlayer = (players)             => containsAllOriginalIds(players, [68])
export const hasDrunkPlayer = (players)                  => containsAllOriginalIds(players, [2])
export const hasInsomniacPlayer = (players)              => containsAllOriginalIds(players, [4])
export const hasSelfAwarenessGirlPlayer = (players)      => containsAllOriginalIds(players, [67])
export const hasSquirePlayer = (players)                 => containsAllOriginalIds(players, [83])
export const hasBeholderPlayer = (players)               => containsAllOriginalIds(players, [73])
export const hasRevealerPlayer = (players)               => containsAllOriginalIds(players, [24])
export const hasExposerPlayer = (players)                => containsAllOriginalIds(players, [46])
export const hasFlipperPlayer = (players)                => containsAllOriginalIds(players, [59])
export const hasEmpathPlayer = (players)                 => containsAllOriginalIds(players, [77])
export const hasCuratorPlayer = (players)                => containsAllOriginalIds(players, [20])
export const hasBlobPlayer = (players)                   => containsAllOriginalIds(players, [44])
export const hasMorticianPlayer = (players)              => containsAllOriginalIds(players, [49])
export const hasFamilyManPlayer = (players)              => containsAllOriginalIds(players, [78])

//TODO check
//export const hasInstantAction = (selectedCards) =>containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
//export const hasBothMasons = (selectedCards) =>containsAllIds(selectedCards, masonIds)
//export const hasAnyMason = (selectedCards) =>containsAnyIds(selectedCards, masonIds)
//export const haOneMasonAndDoppelganger = (selectedCards) =>containsAllIds(selectedCards, [1]) && hasAnyMason
//export const hasMasons =  hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
//export const hasSeers = (selectedCards) =>containsAnyIds(selectedCards, seerIds) //TODO check i need it on beholder */


export const hasGoodGuys = (selectedCards)               => containsAnyIds(selectedCards, goodGuyIds)
export const hasBadGuys = (selectedCards)                => containsAnyIds(selectedCards, badGuysIds)
//export const hasEpicBattle = (selectedCards)             => hasEpicBattle(selectedCards) //! TODO
export const hasOracle = (selectedCards)                 => hasRole(selectedCards, 50)
export const hasCopycat = (selectedCards)                => hasRole(selectedCards, 30)
export const hasMirrorMan = (selectedCards)              => hasRole(selectedCards, 64)
export const hasDoppelganger = (selectedCards)           => hasRole(selectedCards, 1)
export const hasInstantAction = (selectedCards)          => containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
export const hasAnyVampire = (selectedCards)             => containsAnyIds(selectedCards, vampireIds)
export const hasTheCount = (selectedCards)               => hasRole(selectedCards, 39)
export const hasRenfield = (selectedCards)               => hasRole(selectedCards, 38)
export const hasDiseased = (selectedCards)               => hasRole(selectedCards, 32)
export const hasCupid = (selectedCards)                  => hasRole(selectedCards, 31)
export const hasInstigator = (selectedCards)             => hasRole(selectedCards, 34)
export const hasPriest = (selectedCards)                 => hasRole(selectedCards, 37)
export const hasAssassin = (selectedCards)               => hasRole(selectedCards, 29)
export const hasApprenticeAssassin = (selectedCards)     => hasRole(selectedCards, 28)
export const hasSentinel = (selectedCards)               => hasRole(selectedCards, 25)
export const hasAnyAlien = (selectedCards)               => containsAnyIds(selectedCards, alienIds)
export const hasCow = (selectedCards)                    => hasRole(selectedCards, 45)
export const hasGroobAndZerb = (selectedCards)           => containsAllIds(selectedCards, groobAndZerbIds)
export const hasLeader = (selectedCards)                 => hasRole(selectedCards, 48)
export const hasBodySnatcher = (selectedCards)           => hasRole(selectedCards, 74)
export const hasAnySuperVillains = (selectedCards)       => containsAnyIds(selectedCards, superVillainsIds)
export const hasTemptress = (selectedCards)              => hasRole(selectedCards, 69)
export const hasDrPeeker = (selectedCards)               => hasRole(selectedCards, 57)
export const hasRapscallion = (selectedCards)            => hasRole(selectedCards, 65)
export const hasEvilometer = (selectedCards)             => hasRole(selectedCards, 58)
export const hasAnyWerewolf = (selectedCards)            => containsAnyIds(selectedCards, werewolvesIds)
export const hasDreamWolf = (selectedCards)              => hasRole(selectedCards, 21)
export const hasAlphaWolf = (selectedCards)              => hasRole(selectedCards, 17)
export const hasMysticWolf = (selectedCards)             => hasRole(selectedCards, 22)
export const hasMinion = (selectedCards)                 => hasRole(selectedCards, 7)
export const hasApprenticeTanner = (selectedCards)       => hasRole(selectedCards, 71)
export const hasTanner = (selectedCards)                 => hasRole(selectedCards, 10)
export const hasMadScientist = (selectedCards)           => hasRole(selectedCards, 63)
export const hasIntern = (selectedCards)                 => hasRole(selectedCards, 62)
export const hasBothMasons = (selectedCards)             => containsAllIds(selectedCards, masonIds)
export const hasAnyMason = (selectedCards)               => containsAnyIds(selectedCards, masonIds)
export const hasThing = (selectedCards)                  => hasRole(selectedCards, 85)
export const hasAnnoyingLad = (selectedCards)            => hasRole(selectedCards, 55)
export const hasSeer = (selectedCards)                   => hasRole(selectedCards, 9)
export const hasApprenticeSeer = (selectedCards)         => hasRole(selectedCards, 18)
export const hasParanormalInvestigator = (selectedCards) => hasRole(selectedCards, 23)
export const hasMarksman = (selectedCards)               => hasRole(selectedCards, 35)
export const hasNostradamus = (selectedCards)            => hasRole(selectedCards, 80)
export const hasPsychic = (selectedCards)                => hasRole(selectedCards, 51)
export const hasDetector = (selectedCards)               => hasRole(selectedCards, 56)
export const hasRobber = (selectedCards)                 => hasRole(selectedCards, 8)
export const hasWitch = (selectedCards)                  => hasRole(selectedCards, 27)
export const hasPickpocket = (selectedCards)             => hasRole(selectedCards, 36)
export const hasRoleRetriever = (selectedCards)          => hasRole(selectedCards, 66)
export const hasVoodooLou = (selectedCards)              => hasRole(selectedCards, 70)
export const hasTroublemaker = (selectedCards)           => hasRole(selectedCards, 11)
export const hasVillageIdiot = (selectedCards)           => hasRole(selectedCards, 26)
export const hasMarks = (selectedCards)                  => containsAnyIds(selectedCards, hasMarkIds)
export const hasAuraSeer = (selectedCards)               => hasRole(selectedCards, 72)
export const hasGremlin = (selectedCards)                => hasRole(selectedCards, 33)
export const hasRascal = (selectedCards)                 => hasRole(selectedCards, 52)
export const hasSwitcheroo = (selectedCards)             => hasRole(selectedCards, 68)
export const hasDrunk = (selectedCards)                  => hasRole(selectedCards, 2)
export const hasInsomniac = (selectedCards)              => hasRole(selectedCards, 4)
export const hasSelfAwarenessGirl = (selectedCards)      => hasRole(selectedCards, 67)
export const hasSquire = (selectedCards)                 => hasRole(selectedCards, 83)
export const hasSeers = (selectedCards)                  => containsAnyIds(selectedCards, seerIds)
export const hasRevealer = (selectedCards)               => hasRole(selectedCards, 24)
export const hasExposer = (selectedCards)                => hasRole(selectedCards, 46)
export const hasFlipper = (selectedCards)                => hasRole(selectedCards, 59)
export const hasEmpath = (selectedCards)                 => hasRole(selectedCards, 77)
export const hasCurator = (selectedCards)                => hasRole(selectedCards, 20)
export const hasBlob = (selectedCards)                   => hasRole(selectedCards, 44)
export const hasMortician = (selectedCards)              => hasRole(selectedCards, 49)
export const hasFamilyMan = (selectedCards)              => hasRole(selectedCards, 78)
export const hasRipple = (selectedCards)                 => containsAnyIds(selectedCards, alienIds) //TODO oracle is enough for ripple?

//export const hasEasterEgg              = !hasGoodGuys || !hasBadGuys || totalPlayers === 12
export const haOneMasonAndDoppelganger = hasDoppelganger && hasAnyMason
export const hasMasons                 = hasBothMasons || haOneMasonAndDoppelganger
//export const hasBeholder               = hasRole(selectedCards, 73) && hasSeers


