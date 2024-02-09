const { logError } = require("../../log")
const { doppelgangerInstantActionsIds, vampireIds, alienIds, groobAndZerbIds, superVillainsIds, werewolvesIds, hasMarkIds, seerIds, masonIds } = require("./constants")
const { roles } = require("./roles")
const { doppelganger_instant_action } = require("./roles/doppelgangerinstantaction")
const { containsAnyOriginalIds, containsAllOriginalIds, getTokenByOriginalIds, getAllPlayerTokens, containsAnyIds, containsAllIds, getTokensByOriginalIds } = require("./utils")

//TODO action_history
exports.interactionHandler = (gameState) => {
  const newGameState = { ...gameState }
  const sceneTitle = newGameState.actual_scene.scene_title
  const players = newGameState.players

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
    //hasMarks:                       containsAllOriginalIds(players, hasMarkIds),
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

  const selectedCards = gameState.selected_cards
  const hasInstantAction = containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
  const hasBothMasons = containsAllIds(selectedCards, masonIds)
  const hasAnyMason = containsAnyIds(selectedCards, masonIds)
  const haOneMasonAndDoppelganger = containsAllIds(selectedCards, [1]) && hasAnyMason
  const hasMasons = hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
  const hasSeers = containsAnyIds(selectedCards, seerIds) //TODO check i need it on beholder

  let token = ""
  let tokens = []

  switch (sceneTitle) {
    // case "JOKE":// (Scene Number 0)
    // case "EPIC_BATTLE":// (Scene Number: 1)
    /*  T W I L L I G H T */ /*
    case "ORACLE_QUESTION": // (Scene Number: 2)
      token = getTokenByOriginalIds(players, [50])

      if (conditions.hasOraclePlayer) return roles.oracle_question(newGameState, token)
      break

    case "ORACLE_REACTION": // (Scene Number: 3)
      token = getTokenByOriginalIds(players, [50])

      if (conditions.hasOracle && oracleAnswerPlayer) return roles.oracle_reaction(newGameState, token) //TODO make sure always have answer if oracle in selected cards
      break

    case "COPYCAT": // (Scene Number: 4)
      if (conditions.hasCopycatPlayer) {
        token = getTokenByOriginalIds(players, [30])
        return roles.copycat(newGameState, token)
      }
      break

    case "MIRROR_MAN": // (Scene Number: 5)
      if (conditions.hasMirrorManPlayer) {
        token = getTokenByOriginalIds(players, [64])
        return roles.mirrorman(newGameState, token)
      }
      break*/

    case "DOPPELGÄNGER": // (Scene Number: 6)
      if (conditions.hasDoppelgangerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
        const new_role_id = newGameState.role_interactions?.new_role_id
        token = getTokenByOriginalIds(players, [1])
        return doppelganger_instant_action(newGameState, new_role_id, token)
      }
      break

      /*  D U S K  */ /*

    case "VAMPIRES": // (Scene Number: 8)
      token = getTokenByOriginalIds(players, [vampireIds]) //TODO check vampire ids

      if (conditions.hasAnyVampirePlayer) return roles.vampires(newGameState, token)
      break

    case "THE_COUNT": // (Scene Number: 9)
      token = getTokenByOriginalIds(players, [39])

      if (conditions.hasTheCountPlayer) return roles.thecount(newGameState, token)
      break

    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      token = getTokenByOriginalIds(players, [1]) //TODO 39 the count

      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) return roles.doppelganger_thecount(newGameState, token)
      break

    case "RENFIELD": // (Scene Number: 11)
      token = getTokenByOriginalIds(players, [38])

      if (conditions.hasRenfieldPlayer) return roles.renfield(newGameState, token)
      break

    case "DISEASED": // (Scene Number: 12)
      token = getTokenByOriginalIds(players, [32])

      if (conditions.hasDiseasedPlayer) return roles.diseased(newGameState, token)
      break

    case "CUPID": // (Scene Number: 13)
      token = getTokenByOriginalIds(players, [31])

      if (conditions.hasCupidPlayer) return roles.cupid(newGameState, token)
      break

    case "INSTIGATOR": // (Scene Number: 14)
      token = getTokenByOriginalIds(players, [34])

      if (conditions.hasInstigatorPlayer) return roles.instigator(newGameState, token)
      break

    case "PRIEST": // (Scene Number: 15)
      token = getTokenByOriginalIds(players, [37])

      if (conditions.hasPriestPlayer) return roles.priest(newGameState, token)
      break

    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) return roles.doppelganger_priest(newGameState, token)
      break

    case "ASSASSIN": // (Scene Number: 17)
      token = getTokenByOriginalIds(players, [29])

      if (conditions.hasAssassinPlayer) return roles.assassin(newGameState, token)
    break

    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) return roles.doppelganger_assassin(newGameState, token)
    break

    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      token = getTokenByOriginalIds(players, [28])

      if (conditions.hasApprenticeAssassinPlayer) return roles.apprenticeassassin(newGameState, token)
    break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) return roles.doppelganger_apprenticeassassin(newGameState, token)
    break

    case "EVERYONE_MARK": // (Scene Number: 21)
      token = getAllPlayerTokens(players)

      if (conditions.hasMarksPlayer) return roles.everyonemark(newGameState, token)
          break*/

      /*  N I G H T  */ /*

    case "LOVERS": // (Scene Number: 22)
      token = //TODO mark_of_love

      if (conditions.hasCupidPlayer) return roles.lovers(newGameState, token)*/
      break

    case "SENTINEL": // (Scene Number: 23) //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinelPlayer) {
        token = getTokenByOriginalIds(players, [25])
        return roles.sentinel(newGameState, token)
      }
      break /*

    case "ALIENS": // (Scene Number: 24)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasAnyAlienPlayer) return roles.aliens(newGameState, token)
    break

    case "COW": // (Scene Number: 25)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasCowPlayer) return roles.cow(newGameState, token)
    break

    case "GROOB_ZERB": // (Scene Number: 26)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasGroobAndZerbPlayer) return roles.groobzerb(newGameState, token)
    break

    case "LEADER": // (Scene Number: 27)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) return roles.leader(newGameState, token)
    break

    case "LEADER_ZERB_GROOB": // (Scene Number: 28)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) return roles.leader_zerbgroob(newGameState, token)
    break

    case "BODY_SNATCHER": // (Scene Number: 29)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasBodySnatcherPlayer) return roles.bodysnatcher(newGameState, token)
    break

    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 30)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) return roles.doppelganger_bodysnatcher(newGameState, token)
    break

    case "SUPER_VILLAINS": // (Scene Number: 31)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasAnySuperVillainsPlayer) return roles.supervillains(newGameState, token)
    break

    case "TEMPTRESS": // (Scene Number: 32)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasTemptressPlayer) return roles.temptress(newGameState, token)
    break

    case "DR_PEEKER": // (Scene Number: 33)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDrPeekerPlayer) return roles.drpeeker(newGameState, token)
    break

    case "RAPSCALLION": // (Scene Number: 34)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasRapscallionPlayer) return roles.rapscallion(newGameState, token)
    break

    case "EVILOMETER": // (Scene Number: 35)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasEvilometerPlayer) return roles.evilometer(newGameState, token)
          break*/

    case "WEREWOLVES": // (Scene Number: 36)
      if (conditions.hasAnyWerewolfPlayers) {
        tokens = getTokensByOriginalIds(players, werewolvesIds)
        return roles.werewolves(newGameState, tokens)
      }
      break

    case "ALPHA_WOLF": // (Scene Number: 37)
      if (conditions.hasAlphaWolfPlayer) {
        token = getTokenByOriginalIds(players, [17])
        return roles.alphawolf(newGameState, token)
      }
      break

    case "MYSTIC_WOLF": // (Scene Number: 38)
      if (conditions.hasMysticWolfPlayer) {
        token = getTokenByOriginalIds(players, [22])
        return roles.mysticwolf(newGameState, token)
      }
      break

    case "MINION": // (Scene Number: 39)
      if (conditions.hasMinionPlayer) {
        token = getTokenByOriginalIds(players, [7])
        return roles.minion(newGameState, token)
      }
      break

    case "APPRENTICE_TANNER": // (Scene Number: 40)
      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) {
        token = getTokenByOriginalIds(players, [71])
        return roles.apprenticetanner(newGameState, token)
      }
      break /*

    case "MAD_SCIENTIST": // (Scene Number: 41)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasMadScientistPlayer) return roles.madscientist(newGameState, token)
    break

    case "INTERN": // (Scene Number: 42)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasInternPlayer) return roles.intern(newGameState, token)
      break */

    case "MASONS": // (Scene Number: 43) //! TODO mason players
      if (conditions.hasMasonPlayers) {
        tokens = getTokensByOriginalIds(players, masonIds)
        return roles.masons(newGameState, token)
      }
      break /*

    case "THING": // (Scene Number: 44)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasThingPlayer) return roles.thing(newGameState, token)
    break

    case "ANNOYING_LAD": // (Scene Number: 45)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasAnnoyingLadPlayer) return roles.annoyinglad(newGameState, token)
      break */

    case "SEER": // (Scene Number: 46)
      if (conditions.hasSeerPlayer) {
        token = getTokenByOriginalIds(players, [9])
        return roles.seer(newGameState, token)
      }
      break

    case "APPRENTICE_SEER": // (Scene Number: 47)
      if (conditions.hasApprenticeSeerPlayer) {
        token = getTokenByOriginalIds(players, [18])
        return roles.apprenticeseer(newGameState, token)
      } /*

    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 48)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasParanormalInvestigatorPlayer) return roles.paranormalinvestigator(newGameState, token)
    break

    case "MARKSMAN": // (Scene Number: 49)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasMarksmanPlayer) return roles.marksman(newGameState, token)
    break

    case "NOSTRADAMUS": // (Scene Number: 50)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasNostradamusPlayer) return roles.nostradamus(newGameState, token)
    break

    case "NOSTRADAMUS_REACTION": // (Scene Number: 51)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasNostradamusPlayer) return roles.nostradamus_reaction(newGameState, token)
    break

    case "PSYCHIC": // (Scene Number: 52)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasPsychicPlayer) return roles.psychic(newGameState, token)
    break

    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 53)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) return roles.doppelganger_psychic(newGameState, token)
    break

    case "DETECTOR": // (Scene Number: 54)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDetectorPlayer) return roles.detector(newGameState, token)
    break */

    case "ROBBER": // (Scene Number: 55)
      if (conditions.hasRobberPlayer) {
        token = getTokenByOriginalIds(players, [8])
        return roles.robber(newGameState, token)
      }
      break /*

    case "WITCH": // (Scene Number: 56)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasWitchPlayer) return roles.witch(newGameState, token)
    break

    case "PICKPOCKET": // (Scene Number: 57)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasPickpocketPlayer) return roles.pickpocket(newGameState, token)
    break

    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 58)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) return roles.doppelganger_pickpocket(newGameState, token)
    break

    case "ROLE_RETRIEVER": // (Scene Number: 59)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasRoleRetrieverPlayer) return roles.roleretriever(newGameState, token)
    break

    case "VOODOO_LOU": // (Scene Number: 60)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasVoodooLouPlayer) return roles.voodoolou(newGameState, token)
          break*/

    case "TROUBLEMAKER": // (Scene Number: 61)
      if (conditions.hasTroublemakerPlayer) {
        token = getTokenByOriginalIds(players, [11])
        return roles.troublemaker(newGameState, token)
      }
      break /*

    case "VILLAGE_IDIOT": // (Scene Number: 62)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasVillageIdiotPlayer) return roles.villageidiot(newGameState, token)
    break

    case "AURA_SEER": // (Scene Number: 63)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasAuraSeerPlayer) return roles.auraseer(newGameState, token)
    break

    case "GREMLIN": // (Scene Number: 64)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasGremlinPlayer) return roles.gremlin(newGameState, token)
    break

    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 65)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) return roles.doppelganger_gremlin(newGameState, token)
    break

    case "RASCAL": // (Scene Number: 66)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasRascalPlayer) return roles.rascal(newGameState, token)
    break

    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 67)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) return roles.doppelganger_rascal(newGameState, token)
    break

    case "SWITCHEROO": // (Scene Number: 68)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasSwitcherooPlayer) return roles.switcheroo(newGameState, token)
      break*/

    case "DRUNK": // (Scene Number: 69)
      if (conditions.hasDrunkPlayer) {
        token = getTokenByOriginalIds(players, [2])
        return roles.drunk(newGameState, token)
      }
      break

    case "INSOMNIAC": // (Scene Number: 70)
      if (conditions.hasInsomniacPlayer) {
        token = getTokenByOriginalIds(players, [4])
        return roles.insomniac(newGameState, token)
      }
      break

    case "SELF_AWARENESS_GIRL": // (Scene Number: 71)
      if (conditions.hasSelfAwarenessGirlPlayer) {
        token = getTokenByOriginalIds(players, [67])
        return roles.selfawarenessgirl(newGameState, token)
      }
      break
    /*

    case "SQUIRE": // (Scene Number: 72)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasSquirePlayer) return roles.squire(newGameState, token)
    break

    case "BEHOLDER": // (Scene Number: 73)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasBeholderPlayer && hasSeers) return roles.beholder(newGameState, token)
    break

    case "REVEALER": // (Scene Number: 74) //! FLIPPED
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasRevealerPlayer) return roles.revealer(newGameState, token)
    break

    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 75)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) return roles.doppelganger_revealer(newGameState, token) //! FLIPPED
    break

    case "EXPOSER": // (Scene Number: 76) //! FLIPPED
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasExposerPlayer) return roles.exposer(newGameState, token)
    break

    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 77)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) return roles.doppelganger_exposer(newGameState, token) //! FLIPPED
    break

    case "FLIPPER": // (Scene Number: 78)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasFlipperPlayer) return roles.flipper(newGameState, token)
    break

    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 79)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) return roles.doppelganger_flipper(newGameState, token)
    break

    case "EMPATH": // (Scene Number: 80)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasEmpathPlayer) return roles.empath(newGameState, token)
    break

    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 81)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) return roles.doppelganger_empath(newGameState, token)
    break

    case "CURATOR": // (Scene Number: 82) //! ARTIFACT visibility
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasCuratorPlayer) return roles.curator(newGameState, token)
    break

    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 83)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) return roles.doppelganger_curator(newGameState, token) //! ARTIFACT visibility
    break

    case "BLOB": // (Scene Number: 84)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasBlobPlayer) return roles.blob(newGameState, token)
    break

    case "MORTICIAN": // (Scene Number: 85)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasMorticianPlayer) return roles.mortician(newGameState, token)
    break

    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 86)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) return roles.doppelganger_mortician(newGameState, token)
    break

    case "FAMILY_MAN": // (Scene Number: 87)
      token = getTokenByOriginalIds(players, [1])

      if (conditions.hasFamilyManPlayer) return roles.familyman(newGameState, token)
    break*/

    default:
      logError(
        `INTERACTION_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`
      )

    /* 
    //Ripple Scene:
      RIPPLE":// (Scene Number: 88) 
    //Day Scenes:
      INVESTIGATION":// (Scene Number: 89)
      VOTE":// (Scene Number: 90)
      WINNERS":// (Scene Number: 91)  
      */
  }

  return newGameState
}
