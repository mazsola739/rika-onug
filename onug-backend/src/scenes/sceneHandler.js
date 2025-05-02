import { logInfo, logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { aliens, alphawolf, annoyinglad, apprenticeassassin, apprenticeseer, apprenticetanner, assassin, auraseer, beholder, blob, bodysnatcher, copycat, cow, cupid, curator, detector, diseased, doppelganger, empath, exposer, flipper, gremlin, doppelgangerinstantaction, mortician, pickpocket, priest, psychic, rascal, revealer, thecount, drpeeker, drunk, epicbattle, everyonemark, evilometer, familyman, groobzerb, insomniac, instigator, intern, joke, leader, leaderzerbgroob, lovers, madscientist, marksman, masons, minion, mirrorman, mysticwolf, nostradamus, nostradamusReaction, oracleAnswer, oracleQuestion, paranormalinvestigator, rapscallion, renfield, ripple, robber, roleretriever, seer, selfawarenessgirl, sentinel, squire, supervillains, switcheroo, temptress, thing, troublemaker, vampires, villageidiot, voodoolou, werewolves, witch } from './roles'
import { hasAssassin, hasDoppelganger, hasApprenticeAssassin, hasMarks, hasSeer, hasApprenticeSeer, hasEasterEgg, hasEpicBattle, hasGoodGuys, hasBadGuys, hasMadScientist, hasDreamWolf } from './conditions'

export const sceneHandler = async (ws, gamestate, scene_title, room_id) => {
  logTrace(`sceneHandler in room [${room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }
  const selected_cards = gamestate.selected_cards
  const total_players = gamestate.total_players

  const handleEpicBattle = (ws, gamestate, title, selected_cards, total_players) => {
    const hasEasterEggFlag = hasEasterEgg(selected_cards, total_players)
    const hasEpicBattleFlag = hasEpicBattle(selected_cards)
    const hasGoodGuysFlag = hasGoodGuys(selected_cards)
    const hasBadGuysFlag = hasBadGuys(selected_cards)

    return epicbattle(ws, gamestate, title, hasEasterEggFlag, hasEpicBattleFlag, total_players, hasGoodGuysFlag, hasBadGuysFlag)
  }

  const roleHandlers = {
    ALIENS: (gamestate, title) => aliens(ws, gamestate, title, selected_cards),
    ALPHA_WOLF: (gamestate, title) => alphawolf(ws, gamestate, title),
    ANNOYING_LAD: (gamestate, title) => annoyinglad(ws, gamestate, title),
    APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => apprenticeassassin(ws, gamestate, title, hasAssassin(selected_cards), 'apprenticeassassin'),
    APPRENTICE_SEER: (gamestate, title) => apprenticeseer(ws, gamestate, title),
    APPRENTICE_TANNER: (gamestate, title, selected_cards) => apprenticetanner(ws, gamestate, title, hasDoppelganger(selected_cards)),
    ASSASSIN: (gamestate, title, selected_cards) => assassin(ws, gamestate, title, hasApprenticeAssassin(selected_cards), 'assassin'),
    AURA_SEER: (gamestate, title, selected_cards) => auraseer(ws, gamestate, title, hasDoppelganger(selected_cards), hasMarks(selected_cards)),
    BEHOLDER: (gamestate, title, selected_cards) => beholder(ws, gamestate, title, hasSeer(selected_cards), hasApprenticeSeer(selected_cards), hasDoppelganger(selected_cards)),
    BLOB: (gamestate, title) => blob(ws, gamestate, title),
    BODY_SNATCHER: (gamestate, title) => bodysnatcher(ws, gamestate, title, 'bodysnatcher'),
    COPYCAT: (gamestate, title) => copycat(ws, gamestate, title),
    COW: (gamestate, title, selected_cards) => cow(ws, gamestate, title, hasDoppelganger(selected_cards)),
    CUPID: (gamestate, title) => cupid(ws, gamestate, title),
    CURATOR: (gamestate, title) => curator(ws, gamestate, title, 'curator'),
    DETECTOR: (gamestate, title) => detector(ws, gamestate, title),
    DISEASED: (gamestate, title) => diseased(ws, gamestate, title),
    DOPPELGANGER: (gamestate, title) => doppelganger(ws, gamestate, title),
    DOPPELGANGER_APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => apprenticeassassin(ws, gamestate, title, hasAssassin(selected_cards), 'doppelganger_apprenticeassassin'),
    DOPPELGANGER_ASSASSIN: (gamestate, title) => assassin(ws, gamestate, title, 'doppelganger_assassin'),
    DOPPELGANGER_BODY_SNATCHER: (gamestate, title) => bodysnatcher(ws, gamestate, title, 'doppelganger_bodysnatcher'),
    DOPPELGANGER_CURATOR: (gamestate, title) => curator(ws, gamestate, title, 'doppelganger_curator'),
    DOPPELGANGER_EMPATH: (gamestate, title) => empath(ws, gamestate, title, 'doppelganger_empath'),
    DOPPELGANGER_EXPOSER: (gamestate, title) => exposer(ws, gamestate, title, 'doppelganger_exposer'),
    DOPPELGANGER_FLIPPER: (gamestate, title) => flipper(ws, gamestate, title, 'doppelganger_flipper'),
    DOPPELGANGER_GREMLIN: (gamestate, title) => gremlin(ws, gamestate, title, 'doppelganger_gremlin'),
    DOPPELGANGER_INSTANT_ACTION: (gamestate, title) => doppelgangerinstantaction(ws, gamestate, title, selected_cards),
    DOPPELGANGER_MORTICIAN: (gamestate, title) => mortician(ws, gamestate, title, 'doppelganger_mortician'),
    DOPPELGANGER_PICKPOCKET: (gamestate, title) => pickpocket(ws, gamestate, title, 'doppelganger_pickpocket'),
    DOPPELGANGER_PRIEST: (gamestate, title) => priest(ws, gamestate, title, 'doppelganger_priest'),
    DOPPELGANGER_PSYCHIC: (gamestate, title) => psychic(ws, gamestate, title, 'doppelganger_psychic'),
    DOPPELGANGER_RASCAL: (gamestate, title) => rascal(ws, gamestate, title, 'doppelganger_rascal'),
    DOPPELGANGER_REVEALER: (gamestate, title) => revealer(ws, gamestate, title, 'doppelganger_revealer'),
    DOPPELGANGER_THE_COUNT: (gamestate, title) => thecount(ws, gamestate, title, 'doppelganger_thecount'),
    DR_PEEKER: (gamestate, title) => drpeeker(ws, gamestate, title),
    DRUNK: (gamestate, title) => drunk(ws, gamestate, title),
    EMPATH: (gamestate, title) => empath(ws, gamestate, title, 'empath'),
    EPIC_BATTLE: (gamestate, title, selected_cards) => handleEpicBattle(ws, gamestate, title, selected_cards, total_players),
    EVERYONE_MARK: (gamestate, title) => everyonemark(ws, gamestate, title),
    EVILOMETER: (gamestate, title, selected_cards) => evilometer(ws, gamestate, title, hasDoppelganger(selected_cards)),
    EXPOSER: (gamestate, title) => exposer(ws, gamestate, title, 'exposer'),
    FAMILY_MAN: (gamestate, title, selected_cards) => familyman(ws, gamestate, title, hasDoppelganger(selected_cards)),
    FLIPPER: (gamestate, title) => flipper(ws, gamestate, title, 'flipper'),
    GREMLIN: (gamestate, title) => gremlin(ws, gamestate, title, 'gremlin'),
    GROOB_ZERB: (gamestate, title, selected_cards) => groobzerb(ws, gamestate, title, hasDoppelganger(selected_cards)),
    INSOMNIAC: (gamestate, title, selected_cards) => insomniac(ws, gamestate, title, hasDoppelganger(selected_cards)),
    INSTIGATOR: (gamestate, title) => instigator(ws, gamestate, title),
    INTERN: (gamestate, title, selected_cards) => intern(ws, gamestate, title, hasDoppelganger(selected_cards), hasMadScientist(selected_cards)),
    JOKE: (gamestate, title) => joke(ws, gamestate, title),
    LEADER: (gamestate, title, selected_cards) => leader(ws, gamestate, title, hasDoppelganger(selected_cards)),
    LEADER_ZERB_GROOB: (gamestate, title) => leaderzerbgroob(ws, gamestate, title),
    LOVERS: (gamestate, title) => lovers(ws, gamestate, title),
    MAD_SCIENTIST: (gamestate, title) => madscientist(ws, gamestate, title),
    MARKSMAN: (gamestate, title, selected_cards) => marksman(ws, gamestate, title, hasDoppelganger(selected_cards)),
    MASONS: (gamestate, title) => masons(ws, gamestate, title),
    MINION: (gamestate, title, selected_cards) => minion(ws, gamestate, title, hasDoppelganger(selected_cards)),
    MIRROR_MAN: (gamestate, title) => mirrorman(ws, gamestate, title),
    MORTICIAN: (gamestate, title) => mortician(ws, gamestate, title, 'mortician'),
    MYSTIC_WOLF: (gamestate, title) => mysticwolf(ws, gamestate, title),
    NOSTRADAMUS: (gamestate, title) => nostradamus(ws, gamestate, title),
    NOSTRADAMUS_REACTION: (gamestate, title) => nostradamusReaction(ws, gamestate, title),
    ORACLE_ANSWER: (gamestate, title) => oracleAnswer(ws, gamestate, title),
    ORACLE_QUESTION: (gamestate, title) => oracleQuestion(ws, gamestate, title, selected_cards),
    PARANORMAL_INVESTIGATOR: (gamestate, title) => paranormalinvestigator(ws, gamestate, title),
    PICKPOCKET: (gamestate, title) => pickpocket(ws, gamestate, title, 'pickpocket'),
    PRIEST: (gamestate, title) => priest(ws, gamestate, title, 'priest'),
    PSYCHIC: (gamestate, title) => psychic(ws, gamestate, title, 'psychic'),
    RAPSCALLION: (gamestate, title) => rapscallion(ws, gamestate, title),
    RASCAL: (gamestate, title) => rascal(ws, gamestate, title, 'rascal'),
    RENFIELD: (gamestate, title, selected_cards) => renfield(ws, gamestate, title, hasDoppelganger(selected_cards)),
    REVEALER: (gamestate, title) => revealer(ws, gamestate, title, 'revealer'),
    RIPPLE: (gamestate, title) => ripple(ws, gamestate, title),
    ROBBER: (gamestate, title) => robber(ws, gamestate, title),
    ROLE_RETRIEVER: (gamestate, title) => roleretriever(ws, gamestate, title),
    SEER: (gamestate, title) => seer(ws, gamestate, title),
    SELF_AWARENESS_GIRL: (gamestate, title, selected_cards) => selfawarenessgirl(ws, gamestate, title, hasDoppelganger(selected_cards)),
    SENTINEL: (gamestate, title) => sentinel(ws, gamestate, title),
    SQUIRE: (gamestate, title, selected_cards) => squire(ws, gamestate, title, hasDoppelganger(selected_cards)),
    SUPER_VILLAINS: (gamestate, title) => supervillains(ws, gamestate, title),
    SWITCHEROO: (gamestate, title) => switcheroo(ws, gamestate, title),
    TEMPTRESS: (gamestate, title) => temptress(ws, gamestate, title),
    THE_COUNT: (gamestate, title) => thecount(ws, gamestate, title, 'thecount'),
    THING: (gamestate, title) => thing(ws, gamestate, title),
    TROUBLEMAKER: (gamestate, title) => troublemaker(ws, gamestate, title),
    VAMPIRES: (gamestate, title) => vampires(ws, gamestate, title),
    VILLAGE_IDIOT: (gamestate, title) => villageidiot(ws, gamestate, title),
    VOODOO_LOU: (gamestate, title) => voodoolou(ws, gamestate, title),
    WEREWOLVES: (gamestate, title) => werewolves(ws, gamestate, title, hasDreamWolf(selected_cards)),
    WITCH: (gamestate, title) => witch(ws, gamestate, title)
  }

  const defaultHandler = (ws, gamestate, title) => {
    logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${title}]`)
    return gamestate
  }

  newGamestate = (roleHandlers[scene_title] || defaultHandler)(newGamestate, scene_title, selected_cards)

  await repo[repositoryType].upsertRoomState(newGamestate)

  return newGamestate
}
