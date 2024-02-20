import { logDebug } from '../log';
import { checkPlayers } from './check-conditions';
import { doppelgangerInstantActionsIds, werewolvesIds, seerIds, masonIds } from './constants';
import { roleInteractions } from './roles';
import { doppelganger_instant_action } from './roles/doppelgangerinstantaction-interaction';
import { getTokensByOriginalIds, containsAnyIds, containsAllIds } from './utils';

//TODO action_history
export const interactionHandler = (gameState) => {
  const newGameState = { ...gameState }
  const sceneTitle = newGameState.actual_scene.scene_title

  const conditions = checkPlayers(newGameState.players)

  const hasInstantAction = containsAnyIds(newGameState.selected_cards, doppelgangerInstantActionsIds)
  const hasBothMasons = containsAllIds(newGameState.selected_cards, masonIds)
  const hasAnyMason = containsAnyIds(newGameState.selected_cards, masonIds)
  const haOneMasonAndDoppelganger = containsAllIds(newGameState.selected_cards, [1]) && hasAnyMason
  const hasMasons = hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
  const hasSeers = containsAnyIds(newGameState.selected_cards, seerIds) //TODO check i need it on beholder */

  let tokens = []
  //! TODO if must action, random selecting?
  switch (sceneTitle) {
    //! T W I L L I G H T
    /* 
    case "ORACLE_QUESTION":
      if (conditions.hasOraclePlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roleInteractions.oracle_question(newGameState, tokens, sceneTitle)
      }
      break

    case "ORACLE_REACTION": //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswerPlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roleInteractions.oracle_reaction(newGameState, tokens, sceneTitle)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycatPlayer) {
        tokens = getTokensByOriginalIds(players, [30])
        return roleInteractions.copycat(newGameState, tokens, sceneTitle)
      }
      break

    case "MIRROR_MAN": //COPYCAT
      if (conditions.hasMirrorManPlayer) {
        tokens = getTokensByOriginalIds(players, [64])
        return roleInteractions.copycat(newGameState, tokens, sceneTitle)
      }
      break */

    case 'DOPPELGÄNGER':
      if (conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [1])
        return roleInteractions.doppelganger(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_INSTANT_ACTION':
      if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
        tokens = getTokensByOriginalIds(newGameState.players, [1])
        return doppelganger_instant_action(newGameState, tokens, sceneTitle)
      }
      break

    //! D U S K
    /*
    case "VAMPIRES": //TODO check vampire ids
      if (conditions.hasAnyVampirePlayer) {
        tokens = getTokensByOriginalIds(players, [vampireIds]) 
        return roleInteractions.vampires(newGameState, tokens, sceneTitle)
      }
      break

    case "THE_COUNT": 
      if (conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [39])
        return roleInteractions.thecount(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_THE_COUNT": //TODO 39 the count
      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [1]) 
        return roleInteractions.doppelganger_thecount(newGameState, tokens, sceneTitle)
      }
      break

    case "RENFIELD": 
      if (conditions.hasRenfieldPlayer) {
        tokens = getTokensByOriginalIds(players, [38])
        return roleInteractions.renfield(newGameState, tokens, sceneTitle)
      }
      break

    case "DISEASED": 
      if (conditions.hasDiseasedPlayer) {
        tokens = getTokensByOriginalIds(players, [32])
        return roleInteractions.diseased(newGameState, tokens, sceneTitle)
      }
      break

    case "CUPID": 
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [31])
        return roleInteractions.cupid(newGameState, tokens, sceneTitle)
      }
      break

    case "INSTIGATOR": 
      if (conditions.hasInstigatorPlayer) {
        tokens = getTokensByOriginalIds(players, [34])
        return roleInteractions.instigator(newGameState, tokens, sceneTitle)
      }
      break

    case "PRIEST": 
      if (conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [37])
        return roleInteractions.priest(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PRIEST": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_priest(newGameState, tokens, sceneTitle)
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassinPlayer) { 
        tokens = getTokensByOriginalIds(players, [29])
        return roleInteractions.assassin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_assassin(newGameState, tokens, sceneTitle)
      }
      break

    case "APPRENTICE_ASSASSIN": 
      if (conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [28])
        return roleInteractions.apprenticeassassin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_apprenticeassassin(newGameState, tokens, sceneTitle)
      }
      break

    case "EVERYONE_MARK": 
      if (conditions.hasMarksPlayer) {
        tokens = getAllPlayerTokens(players)
        return roleInteractions.everyonemark(newGameState, tokens, sceneTitle)
      }
      break*/
    //! N I G H T
    /*
    case "LOVERS": //TODO mark_of_love   tokens = ?
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.lovers(newGameState, tokens, sceneTitle)
      }
      break */

    case 'SENTINEL': //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinelPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [25])
        return roleInteractions.sentinel(newGameState, tokens, sceneTitle)
      }
      break /*

    case "ALIENS": 
      if (conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.aliens(newGameState, tokens, sceneTitle)
      }
      break

    case "COW": 
      if (conditions.hasCowPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.cow(newGameState, tokens, sceneTitle)
      }
      break

    case "GROOB_ZERB": 
      if (conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.groobzerb(newGameState, tokens, sceneTitle)}
      break

    case "LEADER": 
      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.leader(newGameState, tokens, sceneTitle)
      }
      break

    case "LEADER_ZERB_GROOB": 
      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.leader_zerbgroob(newGameState, tokens, sceneTitle)
      }
      break

    case "BODY_SNATCHER": 
      if (conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.bodysnatcher(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_bodysnatcher(newGameState, tokens, sceneTitle)
      }
      break

    case "SUPER_VILLAINS": 
      if (conditions.hasAnySuperVillainsPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.supervillains(newGameState, tokens, sceneTitle)
      }
      break

    case "TEMPTRESS": 
      if (conditions.hasTemptressPlayer) {
        tokens = getTokensByOriginalIds(players, [69])
        return roleInteractions.temptress(newGameState, tokens, sceneTitle)
      }
      break

    case "DR_PEEKER": 
      if (conditions.hasDrPeekerPlayer) {
        tokens = getTokensByOriginalIds(players, [57])
        return roleInteractions.drpeeker(newGameState, tokens, sceneTitle)
      }
      break

    case "RAPSCALLION": 
      if (conditions.hasRapscallionPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.rapscallion(newGameState, tokens, sceneTitle)
      }
      break

    case "EVILOMETER": 
      if (conditions.hasEvilometerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.evilometer(newGameState, tokens, sceneTitle)
      }
      break */

    case 'WEREWOLVES': //! doppelganger?
      if (conditions.hasAnyWerewolfPlayers) {
        tokens = getTokensByOriginalIds(newGameState.players, werewolvesIds)
        return roleInteractions.werewolves(newGameState, tokens, sceneTitle)
      }
      break

    case 'ALPHA_WOLF':
      if (conditions.hasAlphaWolfPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [17])
        return roleInteractions.alphawolf(newGameState, tokens, sceneTitle)
      }
      break

    case 'MYSTIC_WOLF':
      if (conditions.hasMysticWolfPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [22])
        return roleInteractions.mysticwolf(newGameState, tokens, sceneTitle)
      }
      break

    case 'MINION': //! doppelganger?
      if (conditions.hasMinionPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [7])
        return roleInteractions.minion(newGameState, tokens, sceneTitle)
      }
      break

    case 'APPRENTICE_TANNER': //! doppelganger?
      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [71])
        return roleInteractions.apprenticetanner(newGameState, tokens, sceneTitle)
      }
      break

    case 'INTERN': //! doppelganger?, hasMad?
      if (conditions.hasInternPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, conditions.hasDoppelgangerPlayer ? [62, 1] : [62])
        return roleInteractions.intern(newGameState, tokens, sceneTitle)
      }
      break

    case 'MASONS': //! TODO mason players
      if (conditions.hasMasonPlayers) {
        tokens = getTokensByOriginalIds(newGameState.players, masonIds)
        return roleInteractions.masons(newGameState, tokens, sceneTitle)
      }
      break

    case 'THING':
      if (conditions.hasThingPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [85])
        return roleInteractions.thing(newGameState, tokens, sceneTitle)
      }
      break

    case 'ANNOYING_LAD': //? same as thing
      if (conditions.hasAnnoyingLadPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [55])
        return roleInteractions.thing(newGameState, tokens, sceneTitle)
      }
      break

    case 'SEER':
      if (conditions.hasSeerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [9])
        return roleInteractions.seer(newGameState, tokens, sceneTitle)
      }
      break

    case 'APPRENTICE_SEER':
      if (conditions.hasApprenticeSeerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [18])
        return roleInteractions.apprenticeseer(newGameState, tokens, sceneTitle)
      }
      break

    case 'PARANORMAL_INVESTIGATOR':
      if (conditions.hasParanormalInvestigatorPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [23])
        return roleInteractions.paranormalinvestigator(newGameState, tokens, sceneTitle)
      }
      break /*

    case "MARKSMAN": 
      if (conditions.hasMarksmanPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.marksman(newGameState, tokens, sceneTitle)
      }
      break

    case "NOSTRADAMUS": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.nostradamus(newGameState, tokens, sceneTitle)
      }
      break

    case "NOSTRADAMUS_REACTION": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.nostradamus_reaction(newGameState, tokens, sceneTitle)
      }
      break

    case "PSYCHIC": 
      if (conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.psychic(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PSYCHIC": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_psychic(newGameState, tokens, sceneTitle)
      }
      break */

    case "DETECTOR": //? same as seer
      if (conditions.hasDetectorPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [56])
        return roleInteractions.seer(newGameState, tokens, sceneTitle)
      }
      break

    case 'ROBBER':
      if (conditions.hasRobberPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [8])
        return roleInteractions.robber(newGameState, tokens, sceneTitle)
      }
      break

    case 'WITCH':
      if (conditions.hasWitchPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [27])
        return roleInteractions.witch(newGameState, tokens, sceneTitle)
      }
      break /*

    case "PICKPOCKET": 
      if (conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.pickpocket(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_pickpocket(newGameState, tokens, sceneTitle)
      }
      break */

    case 'ROLE_RETRIEVER': //? same as robber
      if (conditions.hasRoleRetrieverPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [66])
        return roleInteractions.robber(newGameState, tokens, sceneTitle)
      }
      break

    case 'VOODOO_LOU':
      if (conditions.hasVoodooLouPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [70])
        return roleInteractions.witch(newGameState, tokens, sceneTitle)
      }
      break

    case 'TROUBLEMAKER':
      if (conditions.hasTroublemakerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [11])
        return roleInteractions.troublemaker(newGameState, tokens, sceneTitle)
      }
      break /*

    case "VILLAGE_IDIOT": 
      if (conditions.hasVillageIdiotPlayer) {
        tokens = getTokensByOriginalIds(players, [26])
        return roleInteractions.villageidiot(newGameState, tokens, sceneTitle)
      }
      break

    case "AURA_SEER": 
      if (conditions.hasAuraSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.auraseer(newGameState, tokens, sceneTitle)
      }
      break

    case "GREMLIN": 
      if (conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.gremlin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_GREMLIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_gremlin(newGameState, tokens, sceneTitle)
      }
      break

    case "RASCAL": 
      if (conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.rascal(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_RASCAL": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_rascal(newGameState, tokens, sceneTitle)
      }
      break */

    case 'SWITCHEROO': //? same as troublemaker
      if (conditions.hasSwitcherooPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [68])
        return roleInteractions.troublemaker(newGameState, tokens, sceneTitle)
      }
      break

    case 'DRUNK':
      if (conditions.hasDrunkPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [2])
        return roleInteractions.drunk(newGameState, tokens, sceneTitle)
      }
      break

    case 'INSOMNIAC':
      if (conditions.hasInsomniacPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [4])
        return roleInteractions.insomniac(newGameState, tokens, sceneTitle)
      }
      break

    case 'SELF_AWARENESS_GIRL': //? Same as insomniac
      if (conditions.hasSelfAwarenessGirlPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [67])
        return roleInteractions.insomniac(newGameState, tokens, sceneTitle)
      }
      break /*

    case "SQUIRE": 
      if (conditions.hasSquirePlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.squire(newGameState, tokens, sceneTitle)
      }
      break

    case "BEHOLDER": 
      if (conditions.hasBeholderPlayer && hasSeers) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.beholder(newGameState, tokens, sceneTitle)
      }
      break */

    case 'REVEALER':
      if (conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [24])
        return roleInteractions.revealer(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_REVEALER':
      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [1])
        return roleInteractions.revealer(newGameState, tokens, sceneTitle)
      }
      break /*

    case "EXPOSER":
      if (conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.exposer(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_exposer(newGameState, tokens, sceneTitle) 
    break */

    case 'FLIPPER': //? Same as revealer
      if (conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [59])
        return roleInteractions.revealer(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_FLIPPER':
      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [1])
        return roleInteractions.revealer(newGameState, tokens, sceneTitle)
      }
      break /*

    case "EMPATH": 
      if (conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.empath(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_EMPATH": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_empath(newGameState, tokens, sceneTitle)
      }
      break */

    case 'CURATOR':
      if (conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [20])
        return roleInteractions.curator(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_CURATOR':
      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(newGameState.players, [1])
        return roleInteractions.curator(newGameState, tokens, sceneTitle)
      }
      break /*

    case "BLOB": 
      if (conditions.hasBlobPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.blob(newGameState, tokens, sceneTitle)
      }
      break

    case "MORTICIAN": 
      if (conditions.hasMorticianPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.mortician(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_MORTICIAN": 
      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.doppelganger_mortician(newGameState, tokens, sceneTitle)
      }
      break

    case "FAMILY_MAN": 
      if (conditions.hasFamilyManPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roleInteractions.familyman(newGameState, tokens, sceneTitle)
      }
      break */

    default:
      logDebug(
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
};
