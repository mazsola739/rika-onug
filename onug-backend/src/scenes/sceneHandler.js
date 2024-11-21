import { logInfo, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import * as conditions from './conditions'
import * as roles from './roles'

//! todo save action identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
export const sceneHandler = async (gamestate, scene_title) => {
  logTrace(`sceneHandler in room [${gamestate.room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }

  const selected_cards = newGamestate.selected_cards
  const total_players = newGamestate.total_players

  switch (scene_title) {
    case 'ALIENS':
      newGamestate = roles.aliens(newGamestate, scene_title)
      break
    case 'ALPHA_WOLF':
      /* MUST */
      newGamestate = roles.alphawolf(newGamestate, scene_title)
      break
    case 'ANNOYING_LAD':
      /* MUST */
      newGamestate = roles.annoyinglad(newGamestate, scene_title)
      break
    case 'APPRENTICE_ASSASSIN':
      /* MUST & MAY*/
      newGamestate = roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'apprenticeassassin')
      break
    case 'APPRENTICE_SEER':
      newGamestate = roles.apprenticeseer(newGamestate, scene_title)
      break
    case 'APPRENTICE_TANNER':
      newGamestate = roles.apprenticetanner(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'ASSASSIN':
      /* MUST */
      newGamestate = roles.assassin(newGamestate, scene_title, conditions.hasApprenticeAssassin(selected_cards), 'assassin')
      break
    case 'AURA_SEER':
      newGamestate = roles.auraseer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards))
      break
    case 'BEHOLDER':
      newGamestate = roles.beholder(newGamestate, scene_title, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards))
      break
    case 'BLOB':
      newGamestate = roles.blob(newGamestate, scene_title)
      break
    case 'BODY_SNATCHER':
      /* MUST */
      newGamestate = roles.bodysnatcher(newGamestate, scene_title, 'bodysnatcher')
      break
    case 'COPYCAT':
      newGamestate = roles.copycat(newGamestate, scene_title)
      break
    case 'COW':
      /* MUST */
      newGamestate = roles.cow(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'CUPID':
      /* MUST */
      newGamestate = roles.cupid(newGamestate, scene_title)
      break
    case 'CURATOR':
      newGamestate = roles.curator(newGamestate, scene_title, 'curator')
      break
    case 'DETECTOR':
      newGamestate = roles.detector(newGamestate, scene_title)
      break
    case 'DISEASED':
      /* MUST */
      newGamestate = roles.diseased(newGamestate, scene_title)
      break
    case 'DOPPELGÄNGER':
      /* MUST */
      newGamestate = roles.doppelganger(newGamestate, scene_title)
      break
    case 'DOPPELGÄNGER_APPRENTICE_ASSASSIN':
      /* MUST & MAY*/
      newGamestate = roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'doppelganger_apprenticeassassin')
      break
    case 'DOPPELGÄNGER_ASSASSIN':
      /* MUST */
      newGamestate = roles.assassin(newGamestate, scene_title, 'doppelganger_assassin')
      break
    case 'DOPPELGÄNGER_BODY_SNATCHER':
      /* MUST */
      newGamestate = roles.bodysnatcher(newGamestate, scene_title, 'doppelganger_bodysnatcher')
      break
    case 'DOPPELGÄNGER_CURATOR':
      newGamestate = roles.curator(newGamestate, scene_title, 'doppelganger_curator')
      break
    case 'DOPPELGÄNGER_EMPATH':
      /* MUST */
      newGamestate = roles.empath(newGamestate, scene_title, 'doppelganger_empath')
      break
    case 'DOPPELGÄNGER_EXPOSER':
      /* MUST */
      newGamestate = roles.exposer(newGamestate, scene_title, 'doppelganger_exposer')
      break
    case 'DOPPELGÄNGER_FLIPPER':
      newGamestate = roles.flipper(newGamestate, scene_title, 'doppelganger_flipper')
      break
    case 'DOPPELGÄNGER_GREMLIN':
      newGamestate = roles.gremlin(newGamestate, scene_title, 'doppelganger_gremlin')
      break
    case 'DOPPELGÄNGER_INSTANT_ACTION':
      /* MUST */
      newGamestate = roles.doppelgangerinstantaction(newGamestate, scene_title)
      break
    case 'DOPPELGÄNGER_MORTICIAN':
      newGamestate = roles.mortician(newGamestate, scene_title, 'doppelganger_mortician')
      break
    case 'DOPPELGÄNGER_PICKPOCKET':
      newGamestate = roles.pickpocket(newGamestate, scene_title, 'doppelganger_pickpocket')
      break
    case 'DOPPELGÄNGER_PRIEST':
      /* MUST & MAY*/
      newGamestate = roles.priest(newGamestate, scene_title, 'doppelganger_priest')
      break
    case 'DOPPELGÄNGER_PSYCHIC':
      newGamestate = roles.psychic(newGamestate, scene_title, 'doppelganger_psychic')
      break
    case 'DOPPELGÄNGER_RASCAL':
      /* MUST / MAY*/
      newGamestate = roles.rascal(newGamestate, scene_title, 'doppelganger_rascal')
      break
    case 'DOPPELGÄNGER_REVEALER':
      newGamestate = roles.revealer(newGamestate, scene_title, 'doppelganger_revealer')
      break
    case 'DOPPELGÄNGER_THE_COUNT':
      /* MUST */
      newGamestate = roles.thecount(newGamestate, scene_title, 'doppelganger_thecount')
      break
    case 'DR_PEEKER':
      newGamestate = roles.drpeeker(newGamestate, scene_title)
      break
    case 'DRUNK':
      /* MUST */
      newGamestate = roles.drunk(newGamestate, scene_title)
      break
    case 'EMPATH':
      /* MUST */
      newGamestate = roles.empath(newGamestate, scene_title, 'empath')
      break
    case 'EPIC_BATTLE':
      newGamestate = roles.epicbattle(
        newGamestate,
        scene_title,
        conditions.hasEasterEgg(selected_cards, total_players),
        conditions.hasEpicBattle(selected_cards),
        total_players,
        !conditions.hasGoodGuys(selected_cards),
        !conditions.hasBadGuys(selected_cards)
      )
      break
    case 'EVERYONE_MARK':
      /* MUST */
      newGamestate = roles.everyonemark(newGamestate, scene_title)
      break
    case 'EVILOMETER':
      /* MUST */
      newGamestate = roles.evilometer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'EXPOSER':
      /* MUST */
      newGamestate = roles.exposer(newGamestate, scene_title, 'exposer')
      break
    case 'FAMILY_MAN':
      newGamestate = roles.familyman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'FLIPPER':
      newGamestate = roles.flipper(newGamestate, scene_title, 'flipper')
      break
    case 'GREMLIN':
      newGamestate = roles.gremlin(newGamestate, scene_title, 'gremlin')
      break
    case 'GROOB_ZERB':
      /* MUST */
      newGamestate = roles.groobzerb(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'INSOMNIAC':
      /* MUST */
      newGamestate = roles.insomniac(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'INSTIGATOR':
      newGamestate = roles.instigator(newGamestate, scene_title)
      break
    case 'INTERN':
      /* MUST */
      newGamestate = roles.intern(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards))
      break
    case 'JOKE':
      newGamestate = roles.joke(newGamestate, scene_title)
      break
    case 'LEADER':
      /* MUST */
      newGamestate = roles.leader(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'LEADER_ZERB_GROOB':
      /* MUST */
      newGamestate = roles.leaderzerbgroob(newGamestate, scene_title)
      break
    case 'LOVERS':
      /* MUST */
      newGamestate = roles.lovers(newGamestate, scene_title)
      break
    case 'MAD_SCIENTIST':
      newGamestate = roles.madscientist(newGamestate, scene_title)
      break
    case 'MARKSMAN':
      newGamestate = roles.marksman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'MASONS':
      /* MUST */
      newGamestate = roles.masons(newGamestate, scene_title)
      break
    case 'MINION':
      /* MUST */
      newGamestate = roles.minion(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'MIRROR_MAN':
      /* MUST */
      newGamestate = roles.mirrorman(newGamestate, scene_title)
      break
    case 'MORTICIAN':
      newGamestate = roles.mortician(newGamestate, scene_title, 'mortician')
      break
    case 'MYSTIC_WOLF':
      newGamestate = roles.mysticwolf(newGamestate, scene_title)
      break
    case 'NOSTRADAMUS':
      /* MUST */
      newGamestate = roles.nostradamus(newGamestate, scene_title)
      break
    case 'NOSTRADAMUS_REACTION':
      newGamestate = roles.nostradamusReaction(newGamestate, scene_title)
      break
    case 'ORACLE_ANSWER':
      /* MUST */
      newGamestate = roles.oracleAnswer(newGamestate, scene_title)
      break
    case 'ORACLE_QUESTION':
      /* MUST */
      newGamestate = roles.oracleQuestion(newGamestate, scene_title)
      break
    case 'PARANORMAL_INVESTIGATOR':
      newGamestate = roles.paranormalinvestigator(newGamestate, scene_title)
      break
    case 'PICKPOCKET':
      newGamestate = roles.pickpocket(newGamestate, scene_title, 'pickpocket')
      break
    case 'PRIEST':
      /* MUST & MAY*/
      newGamestate = roles.priest(newGamestate, scene_title, 'priest')
      break
    case 'PSYCHIC':
      newGamestate = roles.psychic(newGamestate, scene_title, 'psychic')
      break
    case 'RAPSCALLION':
      newGamestate = roles.rapscallion(newGamestate, scene_title)
      break
    case 'RASCAL':
      /* MUST / MAY*/
      newGamestate = roles.rascal(newGamestate, scene_title, 'rascal')
      break
    case 'RENFIELD':
      /* MUST */
      newGamestate = roles.renfield(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'REVEALER':
      newGamestate = roles.revealer(newGamestate, scene_title, 'revealer')
      break
    case 'RIPPLE':
      newGamestate = roles.ripple(newGamestate, scene_title)
      break
    case 'ROBBER':
      newGamestate = roles.robber(newGamestate, scene_title)
      break
    case 'ROLE_RETRIEVER':
      newGamestate = roles.roleretriever(newGamestate, scene_title)
      break
    case 'SEER':
      newGamestate = roles.seer(newGamestate, scene_title)
      break
    case 'SELF_AWARENESS_GIRL':
      /* MUST */
      newGamestate = roles.selfawarenessgirl(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'SENTINEL':
      newGamestate = roles.sentinel(newGamestate, scene_title)
      break
    case 'SQUIRE':
      /* MUST & MAY*/
      newGamestate = roles.squire(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
      break
    case 'SUPER_VILLAINS':
      /* MUST */
      newGamestate = roles.supervillains(newGamestate, scene_title)
      break
    case 'SWITCHEROO':
      newGamestate = roles.switcheroo(newGamestate, scene_title)
      break
    case 'TEMPTRESS':
      /* MUST */
      newGamestate = roles.temptress(newGamestate, scene_title)
      break
    case 'THE_COUNT':
      /* MUST */
      newGamestate = roles.thecount(newGamestate, scene_title, 'thecount')
      break
    case 'THING':
      /* MUST */
      newGamestate = roles.thing(newGamestate, scene_title)
      break
    case 'TROUBLEMAKER':
      newGamestate = roles.troublemaker(newGamestate, scene_title)
      break
    case 'VAMPIRES':
      /* MUST */
      newGamestate = roles.vampires(newGamestate, scene_title)
      break
    case 'VILLAGE_IDIOT':
      newGamestate = roles.villageidiot(newGamestate, scene_title)
      break
    case 'VOODOO_LOU':
      newGamestate = roles.voodoolou(newGamestate, scene_title)
      break
    case 'WEREWOLVES':
      /* MUST / MAY */
      newGamestate = roles.werewolves(newGamestate, scene_title, conditions.hasDreamWolf(selected_cards))
      break
    case 'WITCH':
      newGamestate = roles.witch(newGamestate, scene_title)
      break
    default:
      logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${scene_title}]`)
  }

  await upsertRoomState(newGamestate)

  return newGamestate
}
