import { logInfo, logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { aliens, alphawolf, annoyinglad, apprenticeassassin, apprenticeseer, apprenticetanner, assassin, auraseer, beholder, blob, bodysnatcher, copycat, cow, cupid, curator, detector, diseased, doppelganger, empath, exposer, flipper, gremlin, doppelgangerinstantaction, mortician, pickpocket, priest, psychic, rascal, revealer, thecount, drpeeker, drunk, epicbattle, everyonemark, evilometer, familyman, groobzerb, insomniac, instigator, intern, joke, leader, leaderzerbgroob, lovers, madscientist, marksman, masons, minion, mirrorman, mysticwolf, nostradamus, nostradamusreaction, oracleAnswer, oracleQuestion, paranormalinvestigator, rapscallion, renfield, ripple, robber, roleretriever, seer, selfawarenessgirl, sentinel, squire, supervillains, switcheroo, temptress, thing, troublemaker, vampires, villageidiot, voodoolou, werewolves, witch } from './roles'
import { hasAssassin, hasDoppelganger, hasApprenticeAssassin, hasMarks, hasSeer, hasApprenticeSeer, hasEasterEgg, hasEpicBattle, hasGoodGuys, hasBadGuys, hasMadScientist, hasDreamWolf } from './conditions'

export const sceneHandler = async (gamestate, scene_title, room_id) => {
  logTrace(`sceneHandler in room [${room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }
  const selected_cards = newGamestate.selected_cards
  const total_players = newGamestate.total_players

  const handleEpicBattle = (newGamestate, title, selected_cards, total_players) => {
    const hasEasterEggFlag = hasEasterEgg(selected_cards, total_players)
    const hasEpicBattleFlag = hasEpicBattle(selected_cards)
    const hasGoodGuysFlag = hasGoodGuys(selected_cards)
    const hasBadGuysFlag = hasBadGuys(selected_cards)

    return epicbattle(newGamestate, title, hasEasterEggFlag, hasEpicBattleFlag, total_players, hasGoodGuysFlag, hasBadGuysFlag)
  }

  const roleHandlers = {
    ALIENS: () => aliens(newGamestate, scene_title, selected_cards),
    ALPHA_WOLF: () => alphawolf(newGamestate, scene_title),
    ANNOYING_LAD: () => annoyinglad(newGamestate, scene_title),
    APPRENTICE_ASSASSIN: () => apprenticeassassin(newGamestate, scene_title, hasAssassin(selected_cards), 'apprenticeassassin'),
    APPRENTICE_SEER: () => apprenticeseer(newGamestate, scene_title),
    APPRENTICE_TANNER: () => apprenticetanner(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    ASSASSIN: () => assassin(newGamestate, scene_title, hasApprenticeAssassin(selected_cards), 'assassin'),
    AURA_SEER: () => auraseer(newGamestate, scene_title, hasDoppelganger(selected_cards), hasMarks(selected_cards)),
    BEHOLDER: () => beholder(newGamestate, scene_title, hasSeer(selected_cards), hasApprenticeSeer(selected_cards), hasDoppelganger(selected_cards)),
    BLOB: () => blob(newGamestate, scene_title),
    BODY_SNATCHER: () => bodysnatcher(newGamestate, scene_title, 'bodysnatcher'),
    COPYCAT: () => copycat(newGamestate, scene_title),
    COW: () => cow(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    CUPID: () => cupid(newGamestate, scene_title),
    CURATOR: () => curator(newGamestate, scene_title, 'curator'),
    DETECTOR: () => detector(newGamestate, scene_title),
    DISEASED: () => diseased(newGamestate, scene_title),
    DOPPELGANGER: () => doppelganger(newGamestate, scene_title),
    DOPPELGANGER_APPRENTICE_ASSASSIN: () => apprenticeassassin(newGamestate, scene_title, hasAssassin(selected_cards), 'doppelganger_apprenticeassassin'),
    DOPPELGANGER_ASSASSIN: () => assassin(newGamestate, scene_title, 'doppelganger_assassin'),
    DOPPELGANGER_BODY_SNATCHER: () => bodysnatcher(newGamestate, scene_title, 'doppelganger_bodysnatcher'),
    DOPPELGANGER_CURATOR: () => curator(newGamestate, scene_title, 'doppelganger_curator'),
    DOPPELGANGER_EMPATH: () => empath(newGamestate, scene_title, 'doppelganger_empath'),
    DOPPELGANGER_EXPOSER: () => exposer(newGamestate, scene_title, 'doppelganger_exposer'),
    DOPPELGANGER_FLIPPER: () => flipper(newGamestate, scene_title, 'doppelganger_flipper'),
    DOPPELGANGER_GREMLIN: () => gremlin(newGamestate, scene_title, 'doppelganger_gremlin'),
    DOPPELGANGER_INSTANT_ACTION: () => doppelgangerinstantaction(newGamestate, scene_title, selected_cards),
    DOPPELGANGER_MORTICIAN: () => mortician(newGamestate, scene_title, 'doppelganger_mortician'),
    DOPPELGANGER_PICKPOCKET: () => pickpocket(newGamestate, scene_title, 'doppelganger_pickpocket'),
    DOPPELGANGER_PRIEST: () => priest(newGamestate, scene_title, 'doppelganger_priest'),
    DOPPELGANGER_PSYCHIC: () => psychic(newGamestate, scene_title, 'doppelganger_psychic'),
    DOPPELGANGER_RASCAL: () => rascal(newGamestate, scene_title, 'doppelganger_rascal'),
    DOPPELGANGER_REVEALER: () => revealer(newGamestate, scene_title, 'doppelganger_revealer'),
    DOPPELGANGER_THE_COUNT: () => thecount(newGamestate, scene_title, 'doppelganger_thecount'),
    DR_PEEKER: () => drpeeker(newGamestate, scene_title),
    DRUNK: () => drunk(newGamestate, scene_title),
    EMPATH: () => empath(newGamestate, scene_title, 'empath'),
    EPIC_BATTLE: () => handleEpicBattle(newGamestate, scene_title, selected_cards, total_players),
    EVERYONE_MARK: () => everyonemark(newGamestate, scene_title),
    EVILOMETER: () => evilometer(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    EXPOSER: () => exposer(newGamestate, scene_title, 'exposer'),
    FAMILY_MAN: () => familyman(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    FLIPPER: () => flipper(newGamestate, scene_title, 'flipper'),
    GREMLIN: () => gremlin(newGamestate, scene_title, 'gremlin'),
    GROOB_ZERB: () => groobzerb(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    INSOMNIAC: () => insomniac(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    INSTIGATOR: () => instigator(newGamestate, scene_title),
    INTERN: () => intern(newGamestate, scene_title, hasDoppelganger(selected_cards), hasMadScientist(selected_cards)),
    JOKE: () => joke(newGamestate, scene_title),
    LEADER: () => leader(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    LEADER_ZERB_GROOB: () => leaderzerbgroob(newGamestate, scene_title),
    LOVERS: () => lovers(newGamestate, scene_title),
    MAD_SCIENTIST: () => madscientist(newGamestate, scene_title),
    MARKSMAN: () => marksman(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    MASONS: () => masons(newGamestate, scene_title),
    MINION: () => minion(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    MIRROR_MAN: () => mirrorman(newGamestate, scene_title),
    MORTICIAN: () => mortician(newGamestate, scene_title, 'mortician'),
    MYSTIC_WOLF: () => mysticwolf(newGamestate, scene_title),
    NOSTRADAMUS: () => nostradamus(newGamestate, scene_title),
    NOSTRADAMUS_REACTION: () => nostradamusreaction(newGamestate, scene_title),
    ORACLE_ANSWER: () => oracleAnswer(newGamestate, scene_title),
    ORACLE_QUESTION: () => oracleQuestion(newGamestate, scene_title, selected_cards),
    PARANORMAL_INVESTIGATOR: () => paranormalinvestigator(newGamestate, scene_title),
    PICKPOCKET: () => pickpocket(newGamestate, scene_title, 'pickpocket'),
    PRIEST: () => priest(newGamestate, scene_title, 'priest'),
    PSYCHIC: () => psychic(newGamestate, scene_title, 'psychic'),
    RAPSCALLION: () => rapscallion(newGamestate, scene_title),
    RASCAL: () => rascal(newGamestate, scene_title, 'rascal'),
    RENFIELD: () => renfield(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    REVEALER: () => revealer(newGamestate, scene_title, 'revealer'),
    RIPPLE: () => ripple(newGamestate, scene_title),
    ROBBER: () => robber(newGamestate, scene_title),
    ROLE_RETRIEVER: () => roleretriever(newGamestate, scene_title),
    SEER: () => seer(newGamestate, scene_title),
    SELF_AWARENESS_GIRL: () => selfawarenessgirl(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    SENTINEL: () => sentinel(newGamestate, scene_title),
    SQUIRE: () => squire(newGamestate, scene_title, hasDoppelganger(selected_cards)),
    SUPER_VILLAINS: () => supervillains(newGamestate, scene_title),
    SWITCHEROO: () => switcheroo(newGamestate, scene_title),
    TEMPTRESS: () => temptress(newGamestate, scene_title),
    THE_COUNT: () => thecount(newGamestate, scene_title, 'thecount'),
    THING: () => thing(newGamestate, scene_title),
    TROUBLEMAKER: () => troublemaker(newGamestate, scene_title),
    VAMPIRES: () => vampires(newGamestate, scene_title),
    VILLAGE_IDIOT: () => villageidiot(newGamestate, scene_title),
    VOODOO_LOU: () => voodoolou(newGamestate, scene_title),
    WEREWOLVES: () => werewolves(newGamestate, scene_title, hasDreamWolf(selected_cards)),
    WITCH: () => witch(newGamestate, scene_title)
  }

  const defaultHandler = () => {
    logInfo(`ACTION_HANDLER_DEFAULT case: no role found for: [action scene title ${scene_title}]`)
    return newGamestate
  }

  newGamestate = (roleHandlers[scene_title] || defaultHandler)()

  await repo[repositoryType].upsertRoomState(newGamestate)

  return newGamestate
}
