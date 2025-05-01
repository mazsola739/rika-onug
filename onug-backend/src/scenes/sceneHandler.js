import { logInfo, logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { aliens, alphawolf, annoyinglad, apprenticeassassin, apprenticeseer, apprenticetanner, assassin, auraseer, beholder, blob, bodysnatcher, copycat, cow, cupid, curator, detector, diseased, doppelganger, empath, exposer, flipper, gremlin, doppelgangerinstantaction, mortician, pickpocket, priest, psychic, rascal, revealer, thecount, drpeeker, drunk, epicbattle, everyonemark, evilometer, familyman, groobzerb, insomniac, instigator, intern, joke, leader, leaderzerbgroob, lovers, madscientist, marksman, masons, minion, mirrorman, mysticwolf, nostradamus, nostradamusReaction, oracleAnswer, oracleQuestion, paranormalinvestigator, rapscallion, renfield, ripple, robber, roleretriever, seer, selfawarenessgirl, sentinel, squire, supervillains, switcheroo, temptress, thing, troublemaker, vampires, villageidiot, voodoolou, werewolves, witch } from './roles'
import { hasAssassin, hasDoppelganger, hasApprenticeAssassin, hasMarks, hasSeer, hasApprenticeSeer, hasEasterEgg, hasEpicBattle, hasGoodGuys, hasBadGuys, hasMadScientist, hasDreamWolf } from './conditions'

export const sceneHandler = async (gamestate, scene_title, room_id) => {
  logTrace(`sceneHandler in room [${room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }
  const selected_cards = gamestate.selected_cards
  const total_players = gamestate.total_players

  const handleEpicBattle = (gamestate, title, selected_cards, total_players) => {
    const hasEasterEggFlag = hasEasterEgg(selected_cards, total_players)
    const hasEpicBattleFlag = hasEpicBattle(selected_cards)
    const hasGoodGuysFlag = hasGoodGuys(selected_cards)
    const hasBadGuysFlag = hasBadGuys(selected_cards)

    return epicbattle(gamestate, title, hasEasterEggFlag, hasEpicBattleFlag, total_players, hasGoodGuysFlag, hasBadGuysFlag)
  }

  const roleHandlers = {
    ALIENS: (gamestate, title) => aliens(gamestate, title, selected_cards),
    ALPHA_WOLF: (gamestate, title) => alphawolf(gamestate, title),
    ANNOYING_LAD: (gamestate, title) => annoyinglad(gamestate, title),
    APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => apprenticeassassin(gamestate, title, hasAssassin(selected_cards), 'apprenticeassassin'),
    APPRENTICE_SEER: (gamestate, title) => apprenticeseer(gamestate, title),
    APPRENTICE_TANNER: (gamestate, title, selected_cards) => apprenticetanner(gamestate, title, hasDoppelganger(selected_cards)),
    ASSASSIN: (gamestate, title, selected_cards) => assassin(gamestate, title, hasApprenticeAssassin(selected_cards), 'assassin'),
    AURA_SEER: (gamestate, title, selected_cards) => auraseer(gamestate, title, hasDoppelganger(selected_cards), hasMarks(selected_cards)),
    BEHOLDER: (gamestate, title, selected_cards) => beholder(gamestate, title, hasSeer(selected_cards), hasApprenticeSeer(selected_cards), hasDoppelganger(selected_cards)),
    BLOB: (gamestate, title) => blob(gamestate, title),
    BODY_SNATCHER: (gamestate, title) => bodysnatcher(gamestate, title, 'bodysnatcher'),
    COPYCAT: (gamestate, title) => copycat(gamestate, title),
    COW: (gamestate, title, selected_cards) => cow(gamestate, title, hasDoppelganger(selected_cards)),
    CUPID: (gamestate, title) => cupid(gamestate, title),
    CURATOR: (gamestate, title) => curator(gamestate, title, 'curator'),
    DETECTOR: (gamestate, title) => detector(gamestate, title),
    DISEASED: (gamestate, title) => diseased(gamestate, title),
    DOPPELGANGER: (gamestate, title) => doppelganger(gamestate, title),
    DOPPELGANGER_APPRENTICE_ASSASSIN: (gamestate, title, selected_cards) => apprenticeassassin(gamestate, title, hasAssassin(selected_cards), 'doppelganger_apprenticeassassin'),
    DOPPELGANGER_ASSASSIN: (gamestate, title) => assassin(gamestate, title, 'doppelganger_assassin'),
    DOPPELGANGER_BODY_SNATCHER: (gamestate, title) => bodysnatcher(gamestate, title, 'doppelganger_bodysnatcher'),
    DOPPELGANGER_CURATOR: (gamestate, title) => curator(gamestate, title, 'doppelganger_curator'),
    DOPPELGANGER_EMPATH: (gamestate, title) => empath(gamestate, title, 'doppelganger_empath'),
    DOPPELGANGER_EXPOSER: (gamestate, title) => exposer(gamestate, title, 'doppelganger_exposer'),
    DOPPELGANGER_FLIPPER: (gamestate, title) => flipper(gamestate, title, 'doppelganger_flipper'),
    DOPPELGANGER_GREMLIN: (gamestate, title) => gremlin(gamestate, title, 'doppelganger_gremlin'),
    DOPPELGANGER_INSTANT_ACTION: (gamestate, title) => doppelgangerinstantaction(gamestate, title, selected_cards),
    DOPPELGANGER_MORTICIAN: (gamestate, title) => mortician(gamestate, title, 'doppelganger_mortician'),
    DOPPELGANGER_PICKPOCKET: (gamestate, title) => pickpocket(gamestate, title, 'doppelganger_pickpocket'),
    DOPPELGANGER_PRIEST: (gamestate, title) => priest(gamestate, title, 'doppelganger_priest'),
    DOPPELGANGER_PSYCHIC: (gamestate, title) => psychic(gamestate, title, 'doppelganger_psychic'),
    DOPPELGANGER_RASCAL: (gamestate, title) => rascal(gamestate, title, 'doppelganger_rascal'),
    DOPPELGANGER_REVEALER: (gamestate, title) => revealer(gamestate, title, 'doppelganger_revealer'),
    DOPPELGANGER_THE_COUNT: (gamestate, title) => thecount(gamestate, title, 'doppelganger_thecount'),
    DR_PEEKER: (gamestate, title) => drpeeker(gamestate, title),
    DRUNK: (gamestate, title) => drunk(gamestate, title),
    EMPATH: (gamestate, title) => empath(gamestate, title, 'empath'),
    EPIC_BATTLE: (gamestate, title, selected_cards) => handleEpicBattle(gamestate, title, selected_cards, total_players),
    EVERYONE_MARK: (gamestate, title) => everyonemark(gamestate, title),
    EVILOMETER: (gamestate, title, selected_cards) => evilometer(gamestate, title, hasDoppelganger(selected_cards)),
    EXPOSER: (gamestate, title) => exposer(gamestate, title, 'exposer'),
    FAMILY_MAN: (gamestate, title, selected_cards) => familyman(gamestate, title, hasDoppelganger(selected_cards)),
    FLIPPER: (gamestate, title) => flipper(gamestate, title, 'flipper'),
    GREMLIN: (gamestate, title) => gremlin(gamestate, title, 'gremlin'),
    GROOB_ZERB: (gamestate, title, selected_cards) => groobzerb(gamestate, title, hasDoppelganger(selected_cards)),
    INSOMNIAC: (gamestate, title, selected_cards) => insomniac(gamestate, title, hasDoppelganger(selected_cards)),
    INSTIGATOR: (gamestate, title) => instigator(gamestate, title),
    INTERN: (gamestate, title, selected_cards) => intern(gamestate, title, hasDoppelganger(selected_cards), hasMadScientist(selected_cards)),
    JOKE: (gamestate, title) => joke(gamestate, title),
    LEADER: (gamestate, title, selected_cards) => leader(gamestate, title, hasDoppelganger(selected_cards)),
    LEADER_ZERB_GROOB: (gamestate, title) => leaderzerbgroob(gamestate, title),
    LOVERS: (gamestate, title) => lovers(gamestate, title),
    MAD_SCIENTIST: (gamestate, title) => madscientist(gamestate, title),
    MARKSMAN: (gamestate, title, selected_cards) => marksman(gamestate, title, hasDoppelganger(selected_cards)),
    MASONS: (gamestate, title) => masons(gamestate, title),
    MINION: (gamestate, title, selected_cards) => minion(gamestate, title, hasDoppelganger(selected_cards)),
    MIRROR_MAN: (gamestate, title) => mirrorman(gamestate, title),
    MORTICIAN: (gamestate, title) => mortician(gamestate, title, 'mortician'),
    MYSTIC_WOLF: (gamestate, title) => mysticwolf(gamestate, title),
    NOSTRADAMUS: (gamestate, title) => nostradamus(gamestate, title),
    NOSTRADAMUS_REACTION: (gamestate, title) => nostradamusReaction(gamestate, title),
    ORACLE_ANSWER: (gamestate, title) => oracleAnswer(gamestate, title),
    ORACLE_QUESTION: (gamestate, title) => oracleQuestion(gamestate, title, selected_cards),
    PARANORMAL_INVESTIGATOR: (gamestate, title) => paranormalinvestigator(gamestate, title),
    PICKPOCKET: (gamestate, title) => pickpocket(gamestate, title, 'pickpocket'),
    PRIEST: (gamestate, title) => priest(gamestate, title, 'priest'),
    PSYCHIC: (gamestate, title) => psychic(gamestate, title, 'psychic'),
    RAPSCALLION: (gamestate, title) => rapscallion(gamestate, title),
    RASCAL: (gamestate, title) => rascal(gamestate, title, 'rascal'),
    RENFIELD: (gamestate, title, selected_cards) => renfield(gamestate, title, hasDoppelganger(selected_cards)),
    REVEALER: (gamestate, title) => revealer(gamestate, title, 'revealer'),
    RIPPLE: (gamestate, title) => ripple(gamestate, title),
    ROBBER: (gamestate, title) => robber(gamestate, title),
    ROLE_RETRIEVER: (gamestate, title) => roleretriever(gamestate, title),
    SEER: (gamestate, title) => seer(gamestate, title),
    SELF_AWARENESS_GIRL: (gamestate, title, selected_cards) => selfawarenessgirl(gamestate, title, hasDoppelganger(selected_cards)),
    SENTINEL: (gamestate, title) => sentinel(gamestate, title),
    SQUIRE: (gamestate, title, selected_cards) => squire(gamestate, title, hasDoppelganger(selected_cards)),
    SUPER_VILLAINS: (gamestate, title) => supervillains(gamestate, title),
    SWITCHEROO: (gamestate, title) => switcheroo(gamestate, title),
    TEMPTRESS: (gamestate, title) => temptress(gamestate, title),
    THE_COUNT: (gamestate, title) => thecount(gamestate, title, 'thecount'),
    THING: (gamestate, title) => thing(gamestate, title),
    TROUBLEMAKER: (gamestate, title) => troublemaker(gamestate, title),
    VAMPIRES: (gamestate, title) => vampires(gamestate, title),
    VILLAGE_IDIOT: (gamestate, title) => villageidiot(gamestate, title),
    VOODOO_LOU: (gamestate, title) => voodoolou(gamestate, title),
    WEREWOLVES: (gamestate, title) => werewolves(gamestate, title, hasDreamWolf(selected_cards)),
    WITCH: (gamestate, title) => witch(gamestate, title)
  }

  const defaultHandler = (gamestate, title) => {
    logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${title}]`)
    return gamestate
  }

  newGamestate = (roleHandlers[scene_title] || defaultHandler)(newGamestate, scene_title, selected_cards)

  await repo[repositoryType].upsertRoomState(newGamestate)

  return newGamestate
}
