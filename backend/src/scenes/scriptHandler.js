import { scriptJson } from '../data'
import { logTrace } from '../log'
import { hasTemptress, hasAlphaWolf } from '../utils'
import { hasEpicBattle, hasEasterEgg, hasOracle, hasCopycat, hasMirrorMan, hasDoppelganger, hasInstantAction, hasAnyVampire, hasTheCount, hasRenfield, hasDiseased, hasCupid, hasInstigator, hasPriest, hasAssassin, hasApprenticeAssassin, hasMarks, hasSentinel, hasAnyAlien, hasCow, hasGroobAndZerb, hasBodySnatcher, hasAnySuperVillains, hasDrPeeker, hasRapscallion, hasEvilometer, hasAnyWerewolf, hasMysticWolf, hasMinion, hasApprenticeTanner, hasTanner, hasLeader, hasMadScientist, hasIntern, hasMasons, hasThing, hasAnnoyingLad, hasSeer, hasApprenticeSeer, hasParanormalInvestigator, hasMarksman, hasNostradamus, hasPsychic, hasDetector, hasRobber, hasWitch, hasPickpocket, hasRoleRetriever, hasVoodooLou, hasTroublemaker, hasVillageIdiot, hasAuraSeer, hasGremlin, hasRascal, hasSwitcheroo, hasDrunk, hasInsomniac, hasSelfAwarenessGirl, hasSquire, hasBeholder, hasRevealer, hasExposer, hasFlipper, hasEmpath, hasCurator, hasBlob, hasMortician, hasFamilyMan, hasRipple } from './conditions'

export const scriptHandler = async (gamestate, room_id) => {
  logTrace(`scriptHandler in room [${room_id}]`)

  const selected_cards = gamestate.selected_cards
  const total_players = gamestate.total_players
  const role_scenes = []

  const addScript = scene_title => {
    const scene = scriptJson.find(scene => scene.scene_title === scene_title)
    if (scene) {
      role_scenes.push({ ...scene })
    } else {
      console.warn(`No script found for scene: ${scene_title}`)
    }
  }

  const roleMapping = {
    EPIC_BATTLE: () => hasEpicBattle(selected_cards) || hasEasterEgg(selected_cards, total_players),
    ORACLE_QUESTION: () => hasOracle(selected_cards),
    ORACLE_ANSWER: () => hasOracle(selected_cards),
    COPYCAT: () => hasCopycat(selected_cards),
    MIRROR_MAN: () => hasMirrorMan(selected_cards),
    DOPPELGANGER: () => hasDoppelganger(selected_cards),
    DOPPELGANGER_INSTANT_ACTION: () => hasDoppelganger(selected_cards) && hasInstantAction(selected_cards),
    VAMPIRES: () => hasAnyVampire(selected_cards),
    THE_COUNT: () => hasTheCount(selected_cards),
    DOPPELGANGER_THE_COUNT: () => hasDoppelganger(selected_cards) && hasTheCount(selected_cards),
    RENFIELD: () => hasRenfield(selected_cards),
    DISEASED: () => hasDiseased(selected_cards),
    CUPID: () => hasCupid(selected_cards),
    LOVERS: () => hasCupid(selected_cards),
    INSTIGATOR: () => hasInstigator(selected_cards),
    PRIEST: () => hasPriest(selected_cards),
    DOPPELGANGER_PRIEST: () => hasDoppelganger(selected_cards) && hasPriest(selected_cards),
    ASSASSIN: () => hasAssassin(selected_cards),
    DOPPELGANGER_ASSASSIN: () => hasDoppelganger(selected_cards) && hasAssassin(selected_cards),
    APPRENTICE_ASSASSIN: () => hasApprenticeAssassin(selected_cards),
    DOPPELGANGER_APPRENTICE_ASSASSIN: () => hasDoppelganger(selected_cards) && hasApprenticeAssassin(selected_cards),
    EVERYONE_MARK: () => hasMarks(selected_cards),
    SENTINEL: () => hasSentinel(selected_cards),
    ALIENS: () => hasAnyAlien(selected_cards),
    COW: () => hasCow(selected_cards),
    GROOB_ZERB: () => hasGroobAndZerb(selected_cards),
    BODY_SNATCHER: () => hasBodySnatcher(selected_cards),
    DOPPELGANGER_BODY_SNATCHER: () => hasDoppelganger(selected_cards) && hasBodySnatcher(selected_cards),
    TEMPTRESS: () => hasTemptress(selected_cards),
    DR_PEEKER: () => hasDrPeeker(selected_cards),
    RAPSCALLION: () => hasRapscallion(selected_cards),
    EVILOMETER: () => hasEvilometer(selected_cards),
    WEREWOLVES: () => hasAnyWerewolf(selected_cards),
    ALPHA_WOLF: () => hasAlphaWolf(selected_cards),
    MYSTIC_WOLF: () => hasMysticWolf(selected_cards),
    MINION: () => hasMinion(selected_cards),
    APPRENTICE_TANNER: () => hasApprenticeTanner(selected_cards) && hasTanner(selected_cards),
    LEADER: () => hasLeader(selected_cards) && hasAnyAlien(selected_cards),
    LEADER_ZERB_GROOB: () => hasLeader(selected_cards) && hasGroobAndZerb(selected_cards),
    MAD_SCIENTIST: () => hasMadScientist(selected_cards),
    INTERN: () => hasIntern(selected_cards),
    MASONS: () => hasMasons(selected_cards),
    THING: () => hasThing(selected_cards),
    ANNOYING_LAD: () => hasAnnoyingLad(selected_cards),
    SEER: () => hasSeer(selected_cards),
    APPRENTICE_SEER: () => hasApprenticeSeer(selected_cards),
    PARANORMAL_INVESTIGATOR: () => hasParanormalInvestigator(selected_cards),
    MARKSMAN: () => hasMarksman(selected_cards),
    NOSTRADAMUS: () => hasNostradamus(selected_cards),
    NOSTRADAMUS_REACTION: () => hasNostradamus(selected_cards),
    PSYCHIC: () => hasPsychic(selected_cards),
    DOPPELGANGER_PSYCHIC: () => hasDoppelganger(selected_cards) && hasPsychic(selected_cards),
    DETECTOR: () => hasDetector(selected_cards),
    ROBBER: () => hasRobber(selected_cards),
    WITCH: () => hasWitch(selected_cards),
    PICKPOCKET: () => hasPickpocket(selected_cards),
    DOPPELGANGER_PICKPOCKET: () => hasDoppelganger(selected_cards) && hasPickpocket(selected_cards),
    ROLE_RETRIEVER: () => hasRoleRetriever(selected_cards),
    VOODOO_LOU: () => hasVoodooLou(selected_cards),
    TROUBLEMAKER: () => hasTroublemaker(selected_cards),
    VILLAGE_IDIOT: () => hasVillageIdiot(selected_cards),
    AURA_SEER: () => hasAuraSeer(selected_cards),
    GREMLIN: () => hasGremlin(selected_cards),
    DOPPELGANGER_GREMLIN: () => hasDoppelganger(selected_cards) && hasGremlin(selected_cards),
    RASCAL: () => hasRascal(selected_cards),
    DOPPELGANGER_RASCAL: () => hasDoppelganger(selected_cards) && hasRascal(selected_cards),
    SWITCHEROO: () => hasSwitcheroo(selected_cards),
    DRUNK: () => hasDrunk(selected_cards),
    INSOMNIAC: () => hasInsomniac(selected_cards),
    SELF_AWARENESS_GIRL: () => hasSelfAwarenessGirl(selected_cards),
    SQUIRE: () => hasSquire(selected_cards),
    BEHOLDER: () => hasBeholder(selected_cards),
    REVEALER: () => hasRevealer(selected_cards),
    DOPPELGANGER_REVEALER: () => hasDoppelganger(selected_cards) && hasRevealer(selected_cards),
    EXPOSER: () => hasExposer(selected_cards),
    DOPPELGANGER_EXPOSER: () => hasDoppelganger(selected_cards) && hasExposer(selected_cards),
    FLIPPER: () => hasFlipper(selected_cards),
    DOPPELGANGER_FLIPPER: () => hasDoppelganger(selected_cards) && hasFlipper(selected_cards),
    EMPATH: () => hasEmpath(selected_cards),
    DOPPELGANGER_EMPATH: () => hasDoppelganger(selected_cards) && hasEmpath(selected_cards),
    CURATOR: () => hasCurator(selected_cards),
    DOPPELGANGER_CURATOR: () => hasDoppelganger(selected_cards) && hasCurator(selected_cards),
    BLOB: () => hasBlob(selected_cards),
    MORTICIAN: () => hasMortician(selected_cards),
    DOPPELGANGER_MORTICIAN: () => hasMortician(selected_cards) && hasDoppelganger(selected_cards),
    FAMILY_MAN: () => hasFamilyMan(selected_cards),
    RIPPLE: () => hasRipple(selected_cards),
    SUPER_VILLAINS: () => hasAnySuperVillains(selected_cards)
  }

  Object.entries(roleMapping).forEach(([script, condition]) => {
    if (condition()) {
      addScript(script)
    }
  })

  gamestate.scenes.scripts = role_scenes.sort((a, b) => a.scene_number - b.scene_number)

  if (gamestate.scenes.scripts.length === 0 || gamestate.scenes.scripts[gamestate.scenes.scripts.length - 1].scene_title !== 'RIPPLE') {
    if (Math.random() < 0.5) {
      // 50% chance to add the 'JOKE' script
      addScript('JOKE')
    }
  }

  return gamestate
}
