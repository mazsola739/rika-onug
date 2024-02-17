const vampireIds       = [39, 40, 41]
const alienIds         = [42, 43, 47, 53, 54, 74]
const groobAndZerbIds  = [47, 54]
const superVillainsIds = [57, 60, 65, 69]
const werewolvesIds    = [15, 16, 17, 22]
const masonIds         = [5, 6]

const containsAnyOriginalIds = (players, ids) => ids.some(id =>  Object.values(players).some(player => player.card.player_original_id === id))
const containsAllOriginalIds = (players, ids) => ids.every(id => Object.values(players).some(player => player.card.player_original_id === id))

exports.checkConditions = (players) => {
  const conditions = { 
    hasOraclePlayer:                  containsAllOriginalIds(players, [50]),
    hasCopycatPlayer:                 containsAllOriginalIds(players, [30]),
    hasMirrorManPlayer:               containsAllOriginalIds(players, [64]),
    hasDoppelgangerPlayer:            containsAllOriginalIds(players, [1]),
    hasAnyVampirePlayers:             containsAnyOriginalIds(players, vampireIds),
    hasTheCountPlayer:                containsAllOriginalIds(players, [39]),
    hasRenfieldPlayer:                containsAllOriginalIds(players, [38]),
    hasDiseasedPlayer:                containsAllOriginalIds(players, [32]),
    hasCupidPlayer:                   containsAllOriginalIds(players, [31]),
    hasInstigatorPlayer:              containsAllOriginalIds(players, [34]), 
    hasPriestPlayer:                  containsAllOriginalIds(players, [37]),
    hasAssassinPlayer:                containsAllOriginalIds(players, [29]),
    hasApprenticeAssassinPlayer:      containsAllOriginalIds(players, [28]),
    hasSentinelPlayer:                containsAllOriginalIds(players, [25]),
    hasAnyAlienPlayers:               containsAnyOriginalIds(players, alienIds),
    hasCowPlayer:                     containsAllOriginalIds(players, [45]),
    hasGroobAndZerbPlayers:           containsAllOriginalIds(players, groobAndZerbIds),
    hasLeaderPlayer:                  containsAllOriginalIds(players, [48]),
    hasBodySnatcherPlayer:            containsAllOriginalIds(players, [74]),
    hasAnySuperVillainsPlayers:       containsAnyOriginalIds(players, superVillainsIds),
    hasTemptressPlayer:               containsAllOriginalIds(players, [69]),
    hasDrPeekerPlayer:                containsAllOriginalIds(players, [57]),
    hasRapscallionPlayer:             containsAllOriginalIds(players, [65]),
    hasEvilometerPlayer:              containsAllOriginalIds(players, [58]),
    hasAnyWerewolfPlayers:            containsAnyOriginalIds(players, werewolvesIds),
    hasDreamWolfPlayer:               containsAllOriginalIds(players, [21]),
    hasAlphaWolfPlayer:               containsAllOriginalIds(players, [17]),
    hasMysticWolfPlayer:              containsAllOriginalIds(players, [22]),
    hasMinionPlayer:                  containsAllOriginalIds(players, [7]),
    hasApprenticeTannerPlayer:        containsAllOriginalIds(players, [71]),
    hasTannerPlayer:                  containsAllOriginalIds(players, [10]),
    hasMadScientistPlayer:            containsAllOriginalIds(players, [63]),
    hasInternPlayer:                  containsAllOriginalIds(players, [62]),
    hasMasonPlayers:                  containsAnyOriginalIds(players, masonIds),
    hasThingPlayer:                   containsAllOriginalIds(players, [85]),
    hasAnnoyingLadPlayer:             containsAllOriginalIds(players, [55]),
    hasSeerPlayer:                    containsAllOriginalIds(players, [9]),
    hasApprenticeSeerPlayer:          containsAllOriginalIds(players, [18]),
    hasParanormalInvestigatorPlayer:  containsAllOriginalIds(players, [23]),
    hasMarksmanPlayer:                containsAllOriginalIds(players, [35]),
    hasNostradamusPlayer:             containsAllOriginalIds(players, [80]),
    hasPsychicPlayer:                 containsAllOriginalIds(players, [51]),
    hasDetectorPlayer:                containsAllOriginalIds(players, [56]),
    hasRobberPlayer:                  containsAllOriginalIds(players, [8]),
    hasWitchPlayer:                   containsAllOriginalIds(players, [27]),
    hasPickpocketPlayer:              containsAllOriginalIds(players, [36]),
    hasRoleRetrieverPlayer:           containsAllOriginalIds(players, [66]),
    hasVoodooLouPlayer:               containsAllOriginalIds(players, [70]),
    hasTroublemakerPlayer:            containsAllOriginalIds(players, [11]),
    hasVillageIdiotPlayer:            containsAllOriginalIds(players, [26]),
    //hasMarks:                       containsAnyOriginalIds(players, hasMarkIds),
    hasAuraSeerPlayer:                containsAllOriginalIds(players, [72]),
    hasGremlinPlayer:                 containsAllOriginalIds(players, [33]),
    hasRascalPlayer:                  containsAllOriginalIds(players, [52]),
    hasSwitcherooPlayer:              containsAllOriginalIds(players, [68]),
    hasDrunkPlayer:                   containsAllOriginalIds(players, [2]),
    hasInsomniacPlayer:               containsAllOriginalIds(players, [4]),
    hasSelfAwarenessGirlPlayer:       containsAllOriginalIds(players, [67]),
    hasSquirePlayer:                  containsAllOriginalIds(players, [83]),
    hasBeholderPlayer:                containsAllOriginalIds(players, [73]),
    hasRevealerPlayer:                containsAllOriginalIds(players, [24]),
    hasExposerPlayer:                 containsAllOriginalIds(players, [46]),
    hasFlipperPlayer:                 containsAllOriginalIds(players, [59]),
    hasEmpathPlayer:                  containsAllOriginalIds(players, [77]),
    hasCuratorPlayer:                 containsAllOriginalIds(players, [20]),
    hasBlobPlayer:                    containsAllOriginalIds(players, [44]),
    hasMorticianPlayer:               containsAllOriginalIds(players, [49]),
    hasFamilyManPlayer:               containsAllOriginalIds(players, [78]),
  }

  return conditions
}

//TODO check if i can merge into conditions
/* const hasInstantAction = containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
const hasBothMasons = containsAllIds(selectedCards, masonIds)
const hasAnyMason = containsAnyIds(selectedCards, masonIds)
const haOneMasonAndDoppelganger = containsAllIds(selectedCards, [1]) && hasAnyMason
const hasMasons = hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
const hasSeers = containsAnyIds(selectedCards, seerIds) //TODO check i need it on beholder */