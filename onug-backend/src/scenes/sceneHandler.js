import * as roles from './roles'
import { logInfo } from '../log'
import * as conditions from './conditions'

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO 
//! TODO if must action, random selecting?
//? TODO better private message, private message generator?

export const sceneHandler = gamestate => {
  const newGamestate = { ...gamestate }
  const scene_title = newGamestate.actual_scene.scene_title
  const selected_cards = newGamestate.selected_cards
  const total_players = newGamestate.total_players

  switch (scene_title) {
    case 'EPIC_BATTLE': 
      if (conditions.hasEpicBattle(selected_cards) || conditions.hasEasterEgg(selected_cards, total_players)) {
        newGamestate.actual_scene.started = true
        return roles.epicbattle(newGamestate, scene_title, conditions.hasEasterEgg(selected_cards, total_players), conditions.hasEpicBattle(selected_cards), total_players, !conditions.hasGoodGuys(selected_cards), !conditions.hasBadGuys(selected_cards))
      }
      break

    case 'ORACLE_QUESTION': //MUST
      if (conditions.hasOracle(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.oracleQuestion(newGamestate, scene_title)
      }
      break

    case 'ORACLE_ANSWER':
      if (conditions.hasOracle(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.oracleAnswer(newGamestate, scene_title)
      }
      break

    case 'COPYCAT':
      if (conditions.hasCopycat(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.copycat(newGamestate, scene_title)
      }
      break

    case 'MIRROR_MAN':
      if (conditions.hasMirrorMan(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.mirrorman(newGamestate, scene_title)
      }
      break

    case 'DOPPELGÄNGER':
      if (conditions.hasDoppelganger(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.doppelganger(newGamestate, scene_title)
      }
      break

    case 'DOPPELGÄNGER_INSTANT_ACTION':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasInstantAction(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.doppelgangerinstantaction(newGamestate, scene_title)
      }
      break

    case 'VAMPIRES':
      if (conditions.hasAnyVampire(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.vampires(newGamestate, scene_title)
      }
      break

    case 'VAMPIRES_VOTE':
      if (conditions.hasAnyVampire(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.vampiresVote(newGamestate, scene_title)
      }
      break

    case 'THE_COUNT':
      if (conditions.hasTheCount(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.thecount(newGamestate, scene_title, 'thecount')
      }
      break

    case 'DOPPELGÄNGER_THE_COUNT':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasTheCount(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.thecount(newGamestate, scene_title, 'doppelganger_thecount')
      }
      break

    case 'RENFIELD':
      if (conditions.hasRenfield(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.renfield(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'DISEASED':
      if (conditions.hasDiseased(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.diseased(newGamestate, scene_title)
      }
      break

    case 'CUPID':
      if (conditions.hasCupid(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.cupid(newGamestate, scene_title)
      }
      break

    case 'INSTIGATOR':
      if (conditions.hasInstigator(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.instigator(newGamestate, scene_title)
      }
      break

    case 'PRIEST':
      if (conditions.hasPriest(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.priest(newGamestate, scene_title, 'priest')
      }
      break

    case 'DOPPELGÄNGER_PRIEST':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPriest(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.priest(newGamestate, scene_title, 'doppelganger_priest')
      }
      break

    case 'ASSASSIN':
      if (conditions.hasAssassin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.assassin(newGamestate, scene_title, 'assassin')
      }
      break

    case 'DOPPELGÄNGER_ASSASSIN':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasAssassin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.assassin(newGamestate, scene_title, 'doppelganger_assassin')
      }
      break

    case 'APPRENTICE_ASSASSIN':
      if (conditions.hasApprenticeAssassin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'apprenticeassassin')
      }
      break

    case 'DOPPELGÄNGER_APPRENTICE_ASSASSIN':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasApprenticeAssassin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'doppelganger_apprenticeassassin')
      }
      break

    case 'EVERYONE_MARK':
      if (conditions.hasMarks(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.everyonemark(newGamestate, scene_title)
      }
      break

    case 'LOVERS':
      if (conditions.hasCupid(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.lovers(newGamestate, scene_title)
      }
      break

    case 'SENTINEL':
      if (conditions.hasSentinel(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.sentinel(newGamestate, scene_title)
      }
      break

    case 'ALIENS':
      if (conditions.hasAnyAlien(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.aliens(newGamestate, scene_title)
      }
      break

    case 'ALIENS_VOTE':
      if (conditions.hasAnyVampire(selected_cards) && newGamestate.alien.vote) {
        newGamestate.actual_scene.started = true
        return roles.aliensVote(newGamestate, scene_title)
      }
      break

    case 'COW':
      if (conditions.hasCow(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.cow(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'GROOB_ZERB':
      if (conditions.hasGroobAndZerb(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.groobzerb(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'LEADER':
      if (conditions.hasLeader(selected_cards) && conditions.hasAnyAlien(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.leader(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'LEADER_ZERB_GROOB':
      if (conditions.hasLeader(selected_cards) && conditions.hasGroobAndZerb(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.leaderzerbgroob(newGamestate, scene_title)
      }
      break

    case 'BODY_SNATCHER':
      if (conditions.hasBodySnatcher(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.bodysnatcher(newGamestate, scene_title, 'bodysnatcher')
      }
      break

    case 'DOPPELGÄNGER_BODY_SNATCHER':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasBodySnatcher(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.bodysnatcher(newGamestate, scene_title, 'doppelganger_bodysnatcher')
      }
      break

    case 'SUPER_VILLAINS':
      if (conditions.hasAnySuperVillains(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.supervillains(newGamestate, scene_title)
      }
      break

    case 'TEMPTRESS':
      if (conditions.hasTemptress(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.temptress(newGamestate, scene_title)
      }
      break

    case 'DR_PEEKER':
      if (conditions.hasDrPeeker(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.drpeeker(newGamestate, scene_title)
      }
      break

    case 'RAPSCALLION':
      if (conditions.hasRapscallion(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.rapscallion(newGamestate, scene_title)
      }
      break

    case 'EVILOMETER':
      if (conditions.hasEvilometer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.evilometer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'WEREWOLVES':
      if (conditions.hasAnyWerewolf(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.werewolves(newGamestate, scene_title, conditions.hasDreamWolf(selected_cards))
      }
      break

    case 'ALPHA_WOLF':
      if (conditions.hasAlphaWolf(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.alphawolf(newGamestate, scene_title)
      }
      break

    case 'MYSTIC_WOLF':
      if (conditions.hasMysticWolf(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.mysticwolf(newGamestate, scene_title)
      }
      break

    case 'MINION':
      if (conditions.hasMinion(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.minion(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'APPRENTICE_TANNER':
      if (conditions.hasApprenticeTanner(selected_cards) && conditions.hasTanner(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.apprenticetanner(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'MAD_SCIENTIST':
      if (conditions.hasMadScientist(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.madscientist(newGamestate, scene_title)
      }
      break

    case 'INTERN':
      if (conditions.hasIntern(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.intern(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards))
      }
      break

    case 'MASONS':
      if (conditions.hasMasons(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.masons(newGamestate, scene_title)
      }
      break

    case 'THING':
      if (conditions.hasThing(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.thing(newGamestate, scene_title)
      }
      break

    case 'ANNOYING_LAD':
      if (conditions.hasAnnoyingLad(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.annoyinglad(newGamestate, scene_title)
      }
      break

    case 'SEER':
      if (conditions.hasSeer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.seer(newGamestate, scene_title)
      }
      break

    case 'APPRENTICE_SEER':
      if (conditions.hasApprenticeSeer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.apprenticeseer(newGamestate, scene_title)
      }
      break

    case 'PARANORMAL_INVESTIGATOR':
      if (conditions.hasParanormalInvestigator(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.paranormalinvestigator(newGamestate, scene_title)
      }
      break

    case 'MARKSMAN':
      if (conditions.hasMarksman(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.marksman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'NOSTRADAMUS':
      if (conditions.hasNostradamus(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.nostradamus(newGamestate, scene_title)
      }
      break

    case 'NOSTRADAMUS_REACTION':
      if (conditions.hasNostradamus(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.nostradamusReaction(newGamestate, scene_title)
      }
      break

    case 'PSYCHIC':
      if (conditions.hasPsychic(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.psychic(newGamestate, scene_title, 'psychic')
      }
      break

    case 'DOPPELGÄNGER_PSYCHIC':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPsychic(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.psychic(newGamestate, scene_title, 'doppelganger_psychic')
      }
      break

    case 'DETECTOR':
      if (conditions.hasDetector(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.detector(newGamestate, scene_title)
      }
      break

    case 'ROBBER':
      if (conditions.hasRobber(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.robber(newGamestate, scene_title)
      }
      break

    case 'WITCH':
      if (conditions.hasWitch(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.witch(newGamestate, scene_title)
      }
      break

    case 'PICKPOCKET':
      if (conditions.hasPickpocket(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.pickpocket(newGamestate, scene_title, 'pickpocket')
      }
      break

    case 'DOPPELGÄNGER_PICKPOCKET':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPickpocket(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.pickpocket(newGamestate, scene_title, 'doppelganger_pickpocket')
      }
      break

    case 'ROLE_RETRIEVER':
      if (conditions.hasRoleRetriever(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.roleretriever(newGamestate, scene_title)
      }
      break

    case 'VOODOO_LOU':
      if (conditions.hasVoodooLou(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.voodoolou(newGamestate, scene_title)
      }
      break

    case 'TROUBLEMAKER':
      if (conditions.hasTroublemaker(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.troublemaker(newGamestate, scene_title)
      }
      break

    case 'VILLAGE_IDIOT':
      if (conditions.hasVillageIdiot(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.villageidiot(newGamestate, scene_title)
      }
      break

    case 'AURA_SEER':
      if (conditions.hasAuraSeer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.auraseer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards))
      }
      break

    case 'GREMLIN':
      if (conditions.hasGremlin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.gremlin(newGamestate, scene_title, 'gremlin')
      }
      break

    case 'DOPPELGÄNGER_GREMLIN':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasGremlin(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.gremlin(newGamestate, scene_title, 'doppelganger_gremlin')
      }
      break

    case 'RASCAL':
      if (conditions.hasRascal(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.rascal(newGamestate, scene_title, 'rascal')
      }
      break

    case 'DOPPELGÄNGER_RASCAL':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasRascal(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.rascal(newGamestate, scene_title, 'doppelganger_rascal')
      }
      break

    case 'SWITCHEROO':
      if (conditions.hasSwitcheroo(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.switcheroo(newGamestate, scene_title)
      }
      break

    case 'DRUNK':
      if (conditions.hasDrunk(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.drunk(newGamestate, scene_title)
      }
      break

    case 'INSOMNIAC':
      if (conditions.hasInsomniac(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.insomniac(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'SELF_AWARENESS_GIRL':
      if (conditions.hasSelfAwarenessGirl(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.selfawarenessgirl(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'SQUIRE':
      if (conditions.hasSquire(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.squire(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'BEHOLDER':
      if (conditions.hasBeholder(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.beholder(newGamestate, scene_title, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'REVEALER':
      if (conditions.hasRevealer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.revealer(newGamestate, scene_title, 'revealer')
      }
      break

    case 'DOPPELGÄNGER_REVEALER':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasRevealer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.revealer(newGamestate, scene_title, 'doppelganger_revealer')
      }
      break

    case 'EXPOSER':
      if (conditions.hasExposer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.exposer(newGamestate, scene_title, 'exposer')
      }
      break

    case 'DOPPELGÄNGER_EXPOSER':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasExposer(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.exposer(newGamestate, scene_title, 'doppelganger_exposer')
      }
      break

    case 'FLIPPER':
      if (conditions.hasFlipper(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.flipper(newGamestate, scene_title, 'flipper')
      }
      break

    case 'DOPPELGÄNGER_FLIPPER':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasFlipper(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.flipper(newGamestate, scene_title, 'doppelganger_flipper')
      }
      break

    case 'EMPATH':
      if (conditions.hasEmpath(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.empath(newGamestate, scene_title, 'empath')
      }
      break

    case 'EMPATH_VOTE':
      if (conditions.hasEmpath(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.empathVote(newGamestate, scene_title, 'empath')
      }
      break

    case 'DOPPELGÄNGER_EMPATH':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasEmpath(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.empath(newGamestate, scene_title, 'doppelganger_empath')
      }
      break

    case 'DOPPELGÄNGER_EMPATH_VOTE':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasEmpath(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.empathVote(newGamestate, scene_title, 'doppelganger_empath')
      }
      break

    case 'CURATOR':
      if (conditions.hasCurator(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.curator(newGamestate, scene_title, 'curator')
      }
      break

    case 'DOPPELGÄNGER_CURATOR':
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasCurator(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.curator(newGamestate, scene_title, 'doppelganger_curator')
      }
      break

    case 'BLOB':
      if (conditions.hasBlob(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.blob(newGamestate, scene_title)
      }
      break

    case 'MORTICIAN':
      if (conditions.hasMortician(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.mortician(newGamestate, scene_title, 'mortician')
      }
      break

    case 'DOPPELGÄNGER_MORTICIAN':
      if (conditions.hasMortician(selected_cards) && conditions.hasDoppelganger(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.mortician(newGamestate, scene_title, 'doppelganger_mortician')
      }
      break

    case 'FAMILY_MAN':
      if (conditions.hasFamilyMan(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.familyman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      }
      break

    case 'RIPPLE':
      if (conditions.hasRipple(selected_cards)) {
        newGamestate.actual_scene.started = true
        return roles.ripple(newGamestate, scene_title)
      }
      break

    case 'JOKE':
      newGamestate.actual_scene.started = true
      return roles.joke(newGamestate, scene_title)

    default:
      logInfo(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${scene_title}`)

  }

  return newGamestate
}
