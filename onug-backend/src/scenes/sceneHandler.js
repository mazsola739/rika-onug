import { logInfo, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import * as conditions from './conditions'
import * as roles from './roles'

export const sceneHandler = async (gamestate, scene_title) => {
  logTrace(`sceneHandler in room [${gamestate.room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }

  const selected_cards = newGamestate.selected_cards
  const total_players = newGamestate.total_players

  const roleHandlers = {
    ALIENS: (gamestate, title) => roles.aliens(gamestate, title),
    ALPHA_WOLF: (gamestate, title) => roles.alphawolf(gamestate, title),
    ANNOYING_LAD: (gamestate, title) => roles.annoyinglad(gamestate, title),
    APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => roles.apprenticeassassin(gamestate, title, conditions.hasAssassin(selected_cards), 'apprenticeassassin'),
    APPRENTICE_SEER: (gamestate, title) => roles.apprenticeseer(gamestate, title),
    APPRENTICE_TANNER: (gamestate, title, selected_cards) => roles.apprenticetanner(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    ASSASSIN: (gamestate, title, selected_cards) => roles.assassin(gamestate, title, conditions.hasApprenticeAssassin(selected_cards), 'assassin'),
    AURA_SEER: (gamestate, title, selected_cards) => roles.auraseer(gamestate, title, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards)),
    BEHOLDER: (gamestate, title, selected_cards) =>
      roles.beholder(gamestate, title, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards)),
    BLOB: (gamestate, title) => roles.blob(gamestate, title),
    BODY_SNATCHER: (gamestate, title) => roles.bodysnatcher(gamestate, title, 'bodysnatcher'),
    COPYCAT: (gamestate, title) => roles.copycat(gamestate, title),
    COW: (gamestate, title, selected_cards) => roles.cow(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    CUPID: (gamestate, title) => roles.cupid(gamestate, title),
    CURATOR: (gamestate, title) => roles.curator(gamestate, title, 'curator'),
    DETECTOR: (gamestate, title) => roles.detector(gamestate, title),
    DISEASED: (gamestate, title) => roles.diseased(gamestate, title),
    DOPPELGÄNGER: (gamestate, title) => roles.doppelganger(gamestate, title),
    DOPPELGÄNGER_APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => roles.apprenticeassassin(gamestate, title, conditions.hasAssassin(selected_cards), 'doppelganger_apprenticeassassin'),
    DOPPELGÄNGER_ASSASSIN: (gamestate, title) => roles.assassin(gamestate, title, 'doppelganger_assassin'),
    DOPPELGÄNGER_BODY_SNATCHER: (gamestate, title) => roles.bodysnatcher(gamestate, title, 'doppelganger_bodysnatcher'),
    DOPPELGÄNGER_CURATOR: (gamestate, title) => roles.curator(gamestate, title, 'doppelganger_curator'),
    DOPPELGÄNGER_EMPATH: (gamestate, title) => roles.empath(gamestate, title, 'doppelganger_empath'),
    DOPPELGÄNGER_EXPOSER: (gamestate, title) => roles.exposer(gamestate, title, 'doppelganger_exposer'),
    DOPPELGÄNGER_FLIPPER: (gamestate, title) => roles.flipper(gamestate, title, 'doppelganger_flipper'),
    DOPPELGÄNGER_GREMLIN: (gamestate, title) => roles.gremlin(gamestate, title, 'doppelganger_gremlin'),
    DOPPELGÄNGER_INSTANT_ACTION: (gamestate, title) => roles.doppelgangerinstantaction(gamestate, title),
    DOPPELGÄNGER_MORTICIAN: (gamestate, title) => roles.mortician(gamestate, title, 'doppelganger_mortician'),
    DOPPELGÄNGER_PICKPOCKET: (gamestate, title) => roles.pickpocket(gamestate, title, 'doppelganger_pickpocket'),
    DOPPELGÄNGER_PRIEST: (gamestate, title) => roles.priest(gamestate, title, 'doppelganger_priest'),
    DOPPELGÄNGER_PSYCHIC: (gamestate, title) => roles.psychic(gamestate, title, 'doppelganger_psychic'),
    DOPPELGÄNGER_RASCAL: (gamestate, title) => roles.rascal(gamestate, title, 'doppelganger_rascal'),
    DOPPELGÄNGER_REVEALER: (gamestate, title) => roles.revealer(gamestate, title, 'doppelganger_revealer'),
    DOPPELGÄNGER_THE_COUNT: (gamestate, title) => roles.thecount(gamestate, title, 'doppelganger_thecount'),
    DR_PEEKER: (gamestate, title) => roles.drpeeker(gamestate, title),
    DRUNK: (gamestate, title) => roles.drunk(gamestate, title),
    EMPATH: (gamestate, title) => roles.empath(gamestate, title, 'empath'),
    EPIC_BATTLE: (gamestate, title, selected_cards) =>
      roles.epicbattle(
        gamestate,
        title,
        conditions.hasEasterEgg(selected_cards, total_players),
        conditions.hasEpicBattle(selected_cards),
        total_players,
        conditions.hasGoodGuys(selected_cards),
        conditions.hasBadGuys(selected_cards)
      ),
    EVERYONE_MARK: (gamestate, title) => roles.everyonemark(gamestate, title),
    EVILOMETER: (gamestate, title, selected_cards) => roles.evilometer(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    EXPOSER: (gamestate, title) => roles.exposer(gamestate, title, 'exposer'),
    FAMILY_MAN: (gamestate, title, selected_cards) => roles.familyman(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    FLIPPER: (gamestate, title) => roles.flipper(gamestate, title, 'flipper'),
    GREMLIN: (gamestate, title) => roles.gremlin(gamestate, title, 'gremlin'),
    GROOB_ZERB: (gamestate, title, selected_cards) => roles.groobzerb(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    INSOMNIAC: (gamestate, title, selected_cards) => roles.insomniac(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    INSTIGATOR: (gamestate, title) => roles.instigator(gamestate, title),
    INTERN: (gamestate, title, selected_cards) => roles.intern(gamestate, title, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards)),
    JOKE: (gamestate, title) => roles.joke(gamestate, title),
    LEADER: (gamestate, title, selected_cards) => roles.leader(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    LEADER_ZERB_GROOB: (gamestate, title) => roles.leaderzerbgroob(gamestate, title),
    LOVERS: (gamestate, title) => roles.lovers(gamestate, title),
    MAD_SCIENTIST: (gamestate, title) => roles.madscientist(gamestate, title),
    MARKSMAN: (gamestate, title, selected_cards) => roles.marksman(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    MASONS: (gamestate, title) => roles.masons(gamestate, title),
    MINION: (gamestate, title, selected_cards) => roles.minion(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    MIRROR_MAN: (gamestate, title) => roles.mirrorman(gamestate, title),
    MORTICIAN: (gamestate, title) => roles.mortician(gamestate, title, 'mortician'),
    MYSTIC_WOLF: (gamestate, title) => roles.mysticwolf(gamestate, title),
    NOSTRADAMUS: (gamestate, title) => roles.nostradamus(gamestate, title),
    NOSTRADAMUS_REACTION: (gamestate, title) => roles.nostradamusReaction(gamestate, title),
    ORACLE_ANSWER: (gamestate, title) => roles.oracleAnswer(gamestate, title),
    ORACLE_QUESTION: (gamestate, title) => roles.oracleQuestion(gamestate, title),
    PARANORMAL_INVESTIGATOR: (gamestate, title) => roles.paranormalinvestigator(gamestate, title),
    PICKPOCKET: (gamestate, title) => roles.pickpocket(gamestate, title, 'pickpocket'),
    PRIEST: (gamestate, title) => roles.priest(gamestate, title, 'priest'),
    PSYCHIC: (gamestate, title) => roles.psychic(gamestate, title, 'psychic'),
    RAPSCALLION: (gamestate, title) => roles.rapscallion(gamestate, title),
    RASCAL: (gamestate, title) => roles.rascal(gamestate, title, 'rascal'),
    RENFIELD: (gamestate, title, selected_cards) => roles.renfield(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    REVEALER: (gamestate, title) => roles.revealer(gamestate, title, 'revealer'),
    RIPPLE: (gamestate, title) => roles.ripple(gamestate, title),
    ROBBER: (gamestate, title) => roles.robber(gamestate, title),
    ROLE_RETRIEVER: (gamestate, title) => roles.roleretriever(gamestate, title),
    SEER: (gamestate, title) => roles.seer(gamestate, title),
    SELF_AWARENESS_GIRL: (gamestate, title, selected_cards) => roles.selfawarenessgirl(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    SENTINEL: (gamestate, title) => roles.sentinel(gamestate, title),
    SQUIRE: (gamestate, title, selected_cards) => roles.squire(gamestate, title, conditions.hasDoppelganger(selected_cards)),
    SUPER_VILLAINS: (gamestate, title) => roles.supervillains(gamestate, title),
    SWITCHEROO: (gamestate, title) => roles.switcheroo(gamestate, title),
    TEMPTRESS: (gamestate, title) => roles.temptress(gamestate, title),
    THE_COUNT: (gamestate, title) => roles.thecount(gamestate, title, 'thecount'),
    THING: (gamestate, title) => roles.thing(gamestate, title),
    TROUBLEMAKER: (gamestate, title) => roles.troublemaker(gamestate, title),
    VAMPIRES: (gamestate, title) => roles.vampires(gamestate, title),
    VILLAGE_IDIOT: (gamestate, title) => roles.villageidiot(gamestate, title),
    VOODOO_LOU: (gamestate, title) => roles.voodoolou(gamestate, title),
    WEREWOLVES: (gamestate, title) => roles.werewolves(gamestate, title, conditions.hasDreamWolf(selected_cards)),
    WITCH: (gamestate, title) => roles.witch(gamestate, title)
  }

  const defaultHandler = (gamestate, title) => {
    logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${title}]`)
    return gamestate
  }

  newGamestate = (roleHandlers[scene_title] || defaultHandler)(newGamestate, scene_title, selected_cards)

  await upsertRoomState(newGamestate)

  return newGamestate
}
