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
    /* MUST */ case 'ALIENS': {
      return roles.aliens(newGamestate, scene_title)
    }
    /* MUST & MAY*/ case 'ALIENS_VOTE': {
      return roles.aliensVote(newGamestate, scene_title)
    }
    /* MUST */ case 'ALPHA_WOLF': {
      return roles.alphawolf(newGamestate, scene_title)
    }
    /* MUST */ case 'ANNOYING_LAD': {
      return roles.annoyinglad(newGamestate, scene_title)
    }
    /* MUST & MAY*/ case 'APPRENTICE_ASSASSIN': {
      return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'apprenticeassassin')
    }
    case 'APPRENTICE_SEER': {
      return roles.apprenticeseer(newGamestate, scene_title)
    }
    /* MUST */ case 'APPRENTICE_TANNER': {
      return roles.apprenticetanner(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'ASSASSIN': {
      return roles.assassin(newGamestate, scene_title, 'assassin')
    }
    /* MUST */ case 'AURA_SEER': {
      return roles.auraseer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards))
    }
    /* MUST & MAY*/ case 'BEHOLDER': {
      return roles.beholder(newGamestate, scene_title, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards))
    }
    case 'BLOB': {
      return roles.blob(newGamestate, scene_title)
    }
    /* MUST */ case 'BODY_SNATCHER': {
      return roles.bodysnatcher(newGamestate, scene_title, 'bodysnatcher')
    }
    /* MUST */ case 'COPYCAT': {
      return roles.copycat(newGamestate, scene_title)
    }
    /* MUST */ case 'COW': {
      return roles.cow(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'CUPID': {
      return roles.cupid(newGamestate, scene_title)
    }
    case 'CURATOR': {
      return roles.curator(newGamestate, scene_title, 'curator')
    }
    case 'DETECTOR': {
      return roles.detector(newGamestate, scene_title)
    }
    /* MUST */ case 'DISEASED': {
      return roles.diseased(newGamestate, scene_title)
    }
    /* MUST */ case 'DOPPELGÄNGER': {
      return roles.doppelganger(newGamestate, scene_title)
    }
    /* MUST & MAY*/ case 'DOPPELGÄNGER_APPRENTICE_ASSASSIN': {
      return roles.apprenticeassassin(newGamestate, scene_title, conditions.hasAssassin(selected_cards), 'doppelganger_apprenticeassassin')
    }
    /* MUST */ case 'DOPPELGÄNGER_ASSASSIN': {
      return roles.assassin(newGamestate, scene_title, 'doppelganger_assassin')
    }
    /* MUST */ case 'DOPPELGÄNGER_BODY_SNATCHER': {
      return roles.bodysnatcher(newGamestate, scene_title, 'doppelganger_bodysnatcher')
    }
    case 'DOPPELGÄNGER_CURATOR': {
      return roles.curator(newGamestate, scene_title, 'doppelganger_curator')
    }
    /* MUST */ case 'DOPPELGÄNGER_EMPATH': {
      return roles.empath(newGamestate, scene_title, 'doppelganger_empath')
    }
    /* MUST */ case 'DOPPELGÄNGER_EMPATH_VOTE': {
      return roles.empathVote(newGamestate, scene_title, 'doppelganger_empath')
    }
    /* MUST */ case 'DOPPELGÄNGER_EXPOSER': {
      return roles.exposer(newGamestate, scene_title, 'doppelganger_exposer')
    }
    case 'DOPPELGÄNGER_FLIPPER': {
      return roles.flipper(newGamestate, scene_title, 'doppelganger_flipper')
    }
    case 'DOPPELGÄNGER_GREMLIN': {
      return roles.gremlin(newGamestate, scene_title, 'doppelganger_gremlin')
    }
    /* MUST */ case 'DOPPELGÄNGER_INSTANT_ACTION': {
      return roles.doppelgangerinstantaction(newGamestate, scene_title)
    }
    case 'DOPPELGÄNGER_MORTICIAN': {
      return roles.mortician(newGamestate, scene_title, 'doppelganger_mortician')
    }
    case 'DOPPELGÄNGER_PICKPOCKET': {
      return roles.pickpocket(newGamestate, scene_title, 'doppelganger_pickpocket')
    }
    /* MUST & MAY*/ case 'DOPPELGÄNGER_PRIEST': {
      return roles.priest(newGamestate, scene_title, 'doppelganger_priest')
    }
    case 'DOPPELGÄNGER_PSYCHIC': {
      return roles.psychic(newGamestate, scene_title, 'doppelganger_psychic')
    }
    /* MUST / MAY*/ case 'DOPPELGÄNGER_RASCAL': {
      return roles.rascal(newGamestate, scene_title, 'doppelganger_rascal')
    }
    case 'DOPPELGÄNGER_REVEALER': {
      return roles.revealer(newGamestate, scene_title, 'doppelganger_revealer')
    }
    /* MUST */ case 'DOPPELGÄNGER_THE_COUNT': {
      return roles.thecount(newGamestate, scene_title, 'doppelganger_thecount')
    }
    case 'DR_PEEKER': {
      return roles.drpeeker(newGamestate, scene_title)
    }
    /* MUST */ case 'DRUNK': {
      return roles.drunk(newGamestate, scene_title)
    }
    /* MUST */ case 'EMPATH': {
      return roles.empath(newGamestate, scene_title, 'empath')
    }
    /* MUST */ case 'EMPATH_VOTE': {
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
    /* MUST */ case 'EVERYONE_MARK': {
      return roles.everyonemark(newGamestate, scene_title)
    }
    /* MUST */ case 'EVILOMETER': {
      return roles.evilometer(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'EXPOSER': {
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
    /* MUST */ case 'GROOB_ZERB': {
      return roles.groobzerb(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'INSOMNIAC': {
      return roles.insomniac(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'INSTIGATOR': {
      return roles.instigator(newGamestate, scene_title)
    }
    /* MUST */ case 'INTERN': {
      return roles.intern(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards))
    }
    case 'JOKE': {
      return roles.joke(newGamestate, scene_title)
    }
    /* MUST */ case 'LEADER': {
      return roles.leader(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'LEADER_ZERB_GROOB': {
      return roles.leaderzerbgroob(newGamestate, scene_title)
    }
    /* MUST */ case 'LOVERS': {
      return roles.lovers(newGamestate, scene_title)
    }
    case 'MAD_SCIENTIST': {
      return roles.madscientist(newGamestate, scene_title)
    }
    case 'MARKSMAN': {
      return roles.marksman(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'MASONS': {
      return roles.masons(newGamestate, scene_title)
    }
    /* MUST */ case 'MINION': {
      return roles.minion(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'MIRROR_MAN': {
      return roles.mirrorman(newGamestate, scene_title)
    }
    case 'MORTICIAN': {
      return roles.mortician(newGamestate, scene_title, 'mortician')
    }
    case 'MYSTIC_WOLF': {
      return roles.mysticwolf(newGamestate, scene_title)
    }
    /* MUST */ case 'NOSTRADAMUS': {
      return roles.nostradamus(newGamestate, scene_title)
    }
    case 'NOSTRADAMUS_REACTION': {
      return roles.nostradamusReaction(newGamestate, scene_title)
    }
    /* MUST */ case 'ORACLE_ANSWER': {
      return roles.oracleAnswer(newGamestate, scene_title)
    }
    /* MUST */ case 'ORACLE_QUESTION': {
      return roles.oracleQuestion(newGamestate, scene_title)
    }
    case 'PARANORMAL_INVESTIGATOR': {
      return roles.paranormalinvestigator(newGamestate, scene_title)
    }
    case 'PICKPOCKET': {
      return roles.pickpocket(newGamestate, scene_title, 'pickpocket')
    }
    /* MUST & MAY*/ case 'PRIEST': {
      return roles.priest(newGamestate, scene_title, 'priest')
    }
    case 'PSYCHIC': {
      return roles.psychic(newGamestate, scene_title, 'psychic')
    }
    case 'RAPSCALLION': {
      return roles.rapscallion(newGamestate, scene_title)
    }
    /* MUST / MAY*/ case 'RASCAL': {
      return roles.rascal(newGamestate, scene_title, 'rascal')
    }
    /* MUST */ case 'RENFIELD': {
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
    /* MUST */ case 'SELF_AWARENESS_GIRL': {
      return roles.selfawarenessgirl(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    case 'SENTINEL': {
      return roles.sentinel(newGamestate, scene_title)
    }
    /* MUST & MAY*/ case 'SQUIRE': {
      return roles.squire(newGamestate, scene_title, conditions.hasDoppelganger(selected_cards))
    }
    /* MUST */ case 'SUPER_VILLAINS': {
      return roles.supervillains(newGamestate, scene_title)
    }
    case 'SWITCHEROO': {
      return roles.switcheroo(newGamestate, scene_title)
    }
    /* MUST */ case 'TEMPTRESS': {
      return roles.temptress(newGamestate, scene_title)
    }
    /* MUST */ case 'THE_COUNT': {
      return roles.thecount(newGamestate, scene_title, 'thecount')
    }
    /* MUST */ case 'THING': {
      return roles.thing(newGamestate, scene_title)
    }
    case 'TROUBLEMAKER': {
      return roles.troublemaker(newGamestate, scene_title)
    }
    /* MUST */ case 'VAMPIRES': {
      return roles.vampires(newGamestate, scene_title)
    }
    /* MUST */ case 'VAMPIRES_VOTE': {
      return roles.vampiresVote(newGamestate, scene_title)
    }
    case 'VILLAGE_IDIOT': {
      return roles.villageidiot(newGamestate, scene_title)
    }
    case 'VOODOO_LOU': {
      return roles.voodoolou(newGamestate, scene_title)
    }
    /* MUST / MAY */ case 'WEREWOLVES': {
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
