import { logInfo, logTrace } from '../log'
import * as conditions from './conditions'
import * as roles from './roles'

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
export const actionHandler = (gamestate, scene_title) => {
  logTrace(`actionHandler in room [${gamestate.room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }
  const selected_cards = newGamestate.selected_cards
  const total_players = newGamestate.total_players

  switch (scene_title) {
    case 'ALIENS': {
      /* MUST */
      return roles.aliens(newGamestate, scene_title)
    }
    case 'ALIENS_VOTE': {
      /* MUST & MAY*/
      return roles.aliensVote(newGamestate, scene_title)
    }
    case 'ALPHA_WOLF': {
      /* MUST */
      return roles.alphawolf(newGamestate, scene_title)
    }
    case 'ANNOYING_LAD': {
      /* MUST */
      return roles.annoyinglad(newGamestate, scene_title)
    }
    case 'APPRENTICE_ASSASSIN': {
      /* MUST & MAY*/
      return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'apprenticeassassin')
    }
    case 'APPRENTICE_SEER': {
      return roles.apprenticeseer(newGamestate, scene_title)
    }
    case 'APPRENTICE_TANNER': {
      /* MUST */
      return roles.apprenticetanner(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'ASSASSIN': {
      /* MUST */
      return roles.assassin(newGamestate, scene_title, conditions.hasApprenticeAssassin(selected_cards), 'assassin')
    }
    case 'AURA_SEER': {
      /* MUST */
      return roles.auraseer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards))
    }
    case 'BEHOLDER': {
      /* MUST & MAY*/
      return roles.beholder(newGamestate, scene_title, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards))
    }
    case 'BLOB': {
      return roles.blob(newGamestate, scene_title)
    }
    case 'BODY_SNATCHER': {
      /* MUST */
      return roles.bodysnatcher(newGamestate, scene_title, 'bodysnatcher')
    }
    case 'COPYCAT': {
      /* MUST */
      return roles.copycat(newGamestate, scene_title)
    }
    case 'COW': {
      /* MUST */
      return roles.cow(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'CUPID': {
      /* MUST */
      return roles.cupid(newGamestate, scene_title)
    }
    case 'CURATOR': {
      return roles.curator(newGamestate, scene_title, 'curator')
    }
    case 'DETECTOR': {
      return roles.detector(newGamestate, scene_title)
    }
    case 'DISEASED': {
      /* MUST */
      return roles.diseased(newGamestate, scene_title)
    }
    case 'DOPPELGÄNGER': {
      /* MUST */
      return roles.doppelganger(newGamestate, scene_title)
    }
    case 'DOPPELGÄNGER_APPRENTICE_ASSASSIN': {
      /* MUST & MAY*/
      return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'doppelganger_apprenticeassassin')
    }
    case 'DOPPELGÄNGER_ASSASSIN': {
      /* MUST */
      return roles.assassin(newGamestate, scene_title, 'doppelganger_assassin')
    }
    case 'DOPPELGÄNGER_BODY_SNATCHER': {
      /* MUST */
      return roles.bodysnatcher(newGamestate, scene_title, 'doppelganger_bodysnatcher')
    }
    case 'DOPPELGÄNGER_CURATOR': {
      return roles.curator(newGamestate, scene_title, 'doppelganger_curator')
    }
    case 'DOPPELGÄNGER_EMPATH': {
      /* MUST */
      return roles.empath(newGamestate, scene_title, 'doppelganger_empath')
    }
    case 'DOPPELGÄNGER_EMPATH_VOTE': {
      /* MUST */
      return roles.empathVote(newGamestate, scene_title, 'doppelganger_empath')
    }
    case 'DOPPELGÄNGER_EXPOSER': {
      /* MUST */
      return roles.exposer(newGamestate, scene_title, 'doppelganger_exposer')
    }
    case 'DOPPELGÄNGER_FLIPPER': {
      return roles.flipper(newGamestate, scene_title, 'doppelganger_flipper')
    }
    case 'DOPPELGÄNGER_GREMLIN': {
      return roles.gremlin(newGamestate, scene_title, 'doppelganger_gremlin')
    }
    case 'DOPPELGÄNGER_INSTANT_ACTION': {
      /* MUST */
      return roles.doppelgangerinstantaction(newGamestate, scene_title)
    }
    case 'DOPPELGÄNGER_MORTICIAN': {
      return roles.mortician(newGamestate, scene_title, 'doppelganger_mortician')
    }
    case 'DOPPELGÄNGER_PICKPOCKET': {
      return roles.pickpocket(newGamestate, scene_title, 'doppelganger_pickpocket')
    }
    case 'DOPPELGÄNGER_PRIEST': {
      /* MUST & MAY*/
      return roles.priest(newGamestate, scene_title, 'doppelganger_priest')
    }
    case 'DOPPELGÄNGER_PSYCHIC': {
      return roles.psychic(newGamestate, scene_title, 'doppelganger_psychic')
    }
    case 'DOPPELGÄNGER_RASCAL': {
      /* MUST / MAY*/
      return roles.rascal(newGamestate, scene_title, 'doppelganger_rascal')
    }
    case 'DOPPELGÄNGER_REVEALER': {
      return roles.revealer(newGamestate, scene_title, 'doppelganger_revealer')
    }
    case 'DOPPELGÄNGER_THE_COUNT': {
      /* MUST */
      return roles.thecount(newGamestate, scene_title, 'doppelganger_thecount')
    }
    case 'DR_PEEKER': {
      return roles.drpeeker(newGamestate, scene_title)
    }
    case 'DRUNK': {
      /* MUST */
      return roles.drunk(newGamestate, scene_title)
    }
    case 'EMPATH': {
      /* MUST */
      return roles.empath(newGamestate, scene_title, 'empath')
    }
    case 'EMPATH_VOTE': {
      /* MUST */
      return roles.empathVote(newGamestate, scene_title, 'empath')
    }
    case 'EPIC_BATTLE': {
      return roles.epicbattle(
        newGamestate,
        scene_title,
        conditions.hasEasterEgg(selected_cards, total_players),
        conditions.hasEpicBattle(selected_cards),
        total_players,
        !conditions.hasGoodGuys(selected_cards),
        !conditions.hasBadGuys(selected_cards)
      )
    }
    case 'EVERYONE_MARK': {
      /* MUST */
      return roles.everyonemark(newGamestate, scene_title)
    }
    case 'EVILOMETER': {
      /* MUST */
      return roles.evilometer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'EXPOSER': {
      /* MUST */
      return roles.exposer(newGamestate, scene_title, 'exposer')
    }
    case 'FAMILY_MAN': {
      return roles.familyman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'FLIPPER': {
      return roles.flipper(newGamestate, scene_title, 'flipper')
    }
    case 'GREMLIN': {
      return roles.gremlin(newGamestate, scene_title, 'gremlin')
    }
    case 'GROOB_ZERB': {
      /* MUST */
      return roles.groobzerb(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'INSOMNIAC': {
      /* MUST */
      return roles.insomniac(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'INSTIGATOR': {
      return roles.instigator(newGamestate, scene_title)
    }
    case 'INTERN': {
      /* MUST */
      return roles.intern(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards))
    }
    case 'JOKE': {
      return roles.joke(newGamestate, scene_title)
    }
    case 'LEADER': {
      /* MUST */
      return roles.leader(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'LEADER_ZERB_GROOB': {
      /* MUST */
      return roles.leaderzerbgroob(newGamestate, scene_title)
    }
    case 'LOVERS': {
      /* MUST */
      return roles.lovers(newGamestate, scene_title)
    }
    case 'MAD_SCIENTIST': {
      return roles.madscientist(newGamestate, scene_title)
    }
    case 'MARKSMAN': {
      return roles.marksman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'MASONS': {
      /* MUST */
      return roles.masons(newGamestate, scene_title)
    }
    case 'MINION': {
      /* MUST */
      return roles.minion(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'MIRROR_MAN': {
      /* MUST */
      return roles.mirrorman(newGamestate, scene_title)
    }
    case 'MORTICIAN': {
      return roles.mortician(newGamestate, scene_title, 'mortician')
    }
    case 'MYSTIC_WOLF': {
      return roles.mysticwolf(newGamestate, scene_title)
    }
    case 'NOSTRADAMUS': {
      /* MUST */
      return roles.nostradamus(newGamestate, scene_title)
    }
    case 'NOSTRADAMUS_REACTION': {
      return roles.nostradamusReaction(newGamestate, scene_title)
    }
    case 'ORACLE_ANSWER': {
      /* MUST */
      return roles.oracleAnswer(newGamestate, scene_title)
    }
    case 'ORACLE_QUESTION': {
      /* MUST */
      return roles.oracleQuestion(newGamestate, scene_title)
    }
    case 'PARANORMAL_INVESTIGATOR': {
      return roles.paranormalinvestigator(newGamestate, scene_title)
    }
    case 'PICKPOCKET': {
      return roles.pickpocket(newGamestate, scene_title, 'pickpocket')
    }
    case 'PRIEST': {
      /* MUST & MAY*/
      return roles.priest(newGamestate, scene_title, 'priest')
    }
    case 'PSYCHIC': {
      return roles.psychic(newGamestate, scene_title, 'psychic')
    }
    case 'RAPSCALLION': {
      return roles.rapscallion(newGamestate, scene_title)
    }
    case 'RASCAL': {
      /* MUST / MAY*/
      return roles.rascal(newGamestate, scene_title, 'rascal')
    }
    case 'RENFIELD': {
      /* MUST */
      return roles.renfield(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'REVEALER': {
      return roles.revealer(newGamestate, scene_title, 'revealer')
    }
    case 'RIPPLE': {
      return roles.ripple(newGamestate, scene_title)
    }
    case 'ROBBER': {
      return roles.robber(newGamestate, scene_title)
    }
    case 'ROLE_RETRIEVER': {
      return roles.roleretriever(newGamestate, scene_title)
    }
    case 'SEER': {
      return roles.seer(newGamestate, scene_title)
    }
    case 'SELF_AWARENESS_GIRL': {
      /* MUST */
      return roles.selfawarenessgirl(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'SENTINEL': {
      return roles.sentinel(newGamestate, scene_title)
    }
    case 'SQUIRE': {
      /* MUST & MAY*/
      return roles.squire(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'SUPER_VILLAINS': {
      /* MUST */
      return roles.supervillains(newGamestate, scene_title)
    }
    case 'SWITCHEROO': {
      return roles.switcheroo(newGamestate, scene_title)
    }
    case 'TEMPTRESS': {
      /* MUST */
      return roles.temptress(newGamestate, scene_title)
    }
    case 'THE_COUNT': {
      /* MUST */
      return roles.thecount(newGamestate, scene_title, 'thecount')
    }
    case 'THING': {
      /* MUST */
      return roles.thing(newGamestate, scene_title)
    }
    case 'TROUBLEMAKER': {
      return roles.troublemaker(newGamestate, scene_title)
    }
    case 'VAMPIRES': {
      /* MUST */
      return roles.vampires(newGamestate, scene_title)
    }
    case 'VAMPIRES_VOTE': {
      /* MUST */
      return roles.vampiresvote(newGamestate, scene_title)
    }
    case 'VILLAGE_IDIOT': {
      return roles.villageidiot(newGamestate, scene_title)
    }
    case 'VOODOO_LOU': {
      return roles.voodoolou(newGamestate, scene_title)
    }
    case 'WEREWOLVES': {
      /* MUST / MAY */
      return roles.werewolves(newGamestate, scene_title, conditions.hasDreamWolf(selected_cards))
    }
    case 'WITCH': {
      return roles.witch(newGamestate, scene_title)
    }
    default:
      logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${scene_title}]`)
  }

  return newGamestate
}
