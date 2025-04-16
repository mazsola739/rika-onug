import scripts from '../data/script.json'
import { logTrace } from '../log'
import { hasTemptress, hasAlphaWolf } from '../utils'
import { hasEpicBattle, hasEasterEgg, hasOracle, hasCopycat, hasMirrorMan, hasDoppelganger, hasInstantAction, hasAnyVampire, hasTheCount, hasRenfield, hasDiseased, hasCupid, hasInstigator, hasPriest, hasAssassin, hasApprenticeAssassin, hasMarks, hasSentinel, hasAnyAlien, hasCow, hasGroobAndZerb, hasBodySnatcher, hasAnySuperVillains, hasDrPeeker, hasRapscallion, hasEvilometer, hasAnyWerewolf, hasMysticWolf, hasMinion, hasApprenticeTanner, hasTanner, hasLeader, hasMadScientist, hasIntern, hasMasons, hasThing, hasAnnoyingLad, hasSeer, hasApprenticeSeer, hasParanormalInvestigator, hasMarksman, hasNostradamus, hasPsychic, hasDetector, hasRobber, hasWitch, hasPickpocket, hasRoleRetriever, hasVoodooLou, hasTroublemaker, hasVillageIdiot, hasAuraSeer, hasGremlin, hasRascal, hasSwitcheroo, hasDrunk, hasInsomniac, hasSelfAwarenessGirl, hasSquire, hasBeholder, hasRevealer, hasExposer, hasFlipper, hasEmpath, hasCurator, hasBlob, hasMortician, hasFamilyMan, hasRipple } from './conditions'

export const scriptHandler = gamestate => {
  logTrace(`scriptHandler in room [${gamestate.room_id}]`)

  const selected_cards = gamestate.selected_cards
  const total_players = gamestate.total_players
  const role_scenes = []

  const addScript = scene_title => {
    const scene = scripts.find(scene => scene.scene_title === scene_title)
    if (scene) {
      role_scenes.push({ ...scene })
    } else {
      console.warn(`No script found for scene: ${scene_title}`)
    }
  }

  const roleOrder = [
    {
      condition: () => hasEpicBattle(selected_cards) || hasEasterEgg(selected_cards, total_players),
      scripts: ['EPIC_BATTLE']
    },
    {
      condition: () => hasOracle(selected_cards),
      scripts: ['ORACLE_QUESTION']
    },
    {
      condition: () => hasOracle(selected_cards),
      scripts: ['ORACLE_ANSWER']
    },
    {
      condition: () => hasCopycat(selected_cards),
      scripts: ['COPYCAT']
    },
    {
      condition: () => hasMirrorMan(selected_cards),
      scripts: ['MIRROR_MAN']
    },
    {
      condition: () => hasDoppelganger(selected_cards),
      scripts: ['DOPPELGANGER']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasInstantAction(selected_cards),
      scripts: ['DOPPELGANGER_INSTANT_ACTION']
    },
    {
      condition: () => hasAnyVampire(selected_cards),
      scripts: ['VAMPIRES']
    },
    {
      condition: () => hasTheCount(selected_cards),
      scripts: ['THE_COUNT']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasTheCount(selected_cards),
      scripts: ['DOPPELGANGER_THE_COUNT']
    },
    {
      condition: () => hasRenfield(selected_cards),
      scripts: ['RENFIELD']
    },
    {
      condition: () => hasDiseased(selected_cards),
      scripts: ['DISEASED']
    },
    {
      condition: () => hasCupid(selected_cards),
      scripts: ['CUPID']
    },
    {
      condition: () => hasInstigator(selected_cards),
      scripts: ['INSTIGATOR']
    },
    {
      condition: () => hasPriest(selected_cards),
      scripts: ['PRIEST']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasPriest(selected_cards),
      scripts: ['DOPPELGANGER_PRIEST']
    },
    {
      condition: () => hasAssassin(selected_cards),
      scripts: ['ASSASSIN']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasAssassin(selected_cards),
      scripts: ['DOPPELGANGER_ASSASSIN']
    },
    {
      condition: () => hasApprenticeAssassin(selected_cards),
      scripts: ['APPRENTICE_ASSASSIN']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasApprenticeAssassin(selected_cards),
      scripts: ['DOPPELGANGER_APPRENTICE_ASSASSIN']
    },
    {
      condition: () => hasMarks(selected_cards),
      scripts: ['EVERYONE_MARK']
    },
    {
      condition: () => hasCupid(selected_cards),
      scripts: ['LOVERS']
    },
    {
      condition: () => hasSentinel(selected_cards),
      scripts: ['SENTINEL']
    },
    {
      condition: () => hasAnyAlien(selected_cards),
      scripts: ['ALIENS']
    },
    {
      condition: () => hasCow(selected_cards),
      scripts: ['COW']
    },
    {
      condition: () => hasGroobAndZerb(selected_cards),
      scripts: ['GROOB_ZERB']
    },
    {
      condition: () => hasBodySnatcher(selected_cards),
      scripts: ['BODY_SNATCHER']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasBodySnatcher(selected_cards),
      scripts: ['DOPPELGANGER_BODY_SNATCHER']
    },
    {
      condition: () => hasAnySuperVillains(selected_cards),
      scripts: ['SUPER_VILLAINS']
    },
    {
      condition: () => hasTemptress(selected_cards),
      scripts: ['TEMPTRESS']
    },
    {
      condition: () => hasDrPeeker(selected_cards),
      scripts: ['DR_PEEKER']
    },
    {
      condition: () => hasRapscallion(selected_cards),
      scripts: ['RAPSCALLION']
    },
    {
      condition: () => hasEvilometer(selected_cards),
      scripts: ['EVILOMETER']
    },
    {
      condition: () => hasAnyWerewolf(selected_cards),
      scripts: ['WEREWOLVES']
    },
    {
      condition: () => hasAlphaWolf(selected_cards),
      scripts: ['ALPHA_WOLF']
    },
    {
      condition: () => hasMysticWolf(selected_cards),
      scripts: ['MYSTIC_WOLF']
    },
    {
      condition: () => hasMinion(selected_cards),
      scripts: ['MINION']
    },
    {
      condition: () => hasApprenticeTanner(selected_cards) && hasTanner(selected_cards),
      scripts: ['APPRENTICE_TANNER']
    },
    {
      condition: () => hasLeader(selected_cards) && hasAnyAlien(selected_cards),
      scripts: ['LEADER']
    },
    {
      condition: () => hasLeader(selected_cards) && hasGroobAndZerb(selected_cards),
      scripts: ['LEADER_ZERB_GROOB']
    },
    {
      condition: () => hasMadScientist(selected_cards),
      scripts: ['MAD_SCIENTIST']
    },
    {
      condition: () => hasIntern(selected_cards),
      scripts: ['INTERN']
    },
    {
      condition: () => hasMasons(selected_cards),
      scripts: ['MASONS']
    },
    {
      condition: () => hasThing(selected_cards),
      scripts: ['THING']
    },
    {
      condition: () => hasAnnoyingLad(selected_cards),
      scripts: ['ANNOYING_LAD']
    },
    {
      condition: () => hasSeer(selected_cards),
      scripts: ['SEER']
    },
    {
      condition: () => hasApprenticeSeer(selected_cards),
      scripts: ['APPRENTICE_SEER']
    },
    {
      condition: () => hasParanormalInvestigator(selected_cards),
      scripts: ['PARANORMAL_INVESTIGATOR']
    },
    {
      condition: () => hasMarksman(selected_cards),
      scripts: ['MARKSMAN']
    },
    {
      condition: () => hasNostradamus(selected_cards),
      scripts: ['NOSTRADAMUS']
    },
    {
      condition: () => hasNostradamus(selected_cards),
      scripts: ['NOSTRADAMUS_REACTION']
    },
    {
      condition: () => hasPsychic(selected_cards),
      scripts: ['PSYCHIC']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasPsychic(selected_cards),
      scripts: ['DOPPELGANGER_PSYCHIC']
    },
    {
      condition: () => hasDetector(selected_cards),
      scripts: ['DETECTOR']
    },
    {
      condition: () => hasRobber(selected_cards),
      scripts: ['ROBBER']
    },
    {
      condition: () => hasWitch(selected_cards),
      scripts: ['WITCH']
    },
    {
      condition: () => hasPickpocket(selected_cards),
      scripts: ['PICKPOCKET']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasPickpocket(selected_cards),
      scripts: ['DOPPELGANGER_PICKPOCKET']
    },
    {
      condition: () => hasRoleRetriever(selected_cards),
      scripts: ['ROLE_RETRIEVER']
    },
    {
      condition: () => hasVoodooLou(selected_cards),
      scripts: ['VOODOO_LOU']
    },
    {
      condition: () => hasTroublemaker(selected_cards),
      scripts: ['TROUBLEMAKER']
    },
    {
      condition: () => hasVillageIdiot(selected_cards),
      scripts: ['VILLAGE_IDIOT']
    },
    {
      condition: () => hasAuraSeer(selected_cards),
      scripts: ['AURA_SEER']
    },
    {
      condition: () => hasGremlin(selected_cards),
      scripts: ['GREMLIN']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasGremlin(selected_cards),
      scripts: ['DOPPELGANGER_GREMLIN']
    },
    {
      condition: () => hasRascal(selected_cards),
      scripts: ['RASCAL']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasRascal(selected_cards),
      scripts: ['DOPPELGANGER_RASCAL']
    },
    {
      condition: () => hasSwitcheroo(selected_cards),
      scripts: ['SWITCHEROO']
    },
    {
      condition: () => hasDrunk(selected_cards),
      scripts: ['DRUNK']
    },
    {
      condition: () => hasInsomniac(selected_cards),
      scripts: ['INSOMNIAC']
    },
    {
      condition: () => hasSelfAwarenessGirl(selected_cards),
      scripts: ['SELF_AWARENESS_GIRL']
    },
    {
      condition: () => hasSquire(selected_cards),
      scripts: ['SQUIRE']
    },
    {
      condition: () => hasBeholder(selected_cards),
      scripts: ['BEHOLDER']
    },
    {
      condition: () => hasRevealer(selected_cards),
      scripts: ['REVEALER']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasRevealer(selected_cards),
      scripts: ['DOPPELGANGER_REVEALER']
    },
    {
      condition: () => hasExposer(selected_cards),
      scripts: ['EXPOSER']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasExposer(selected_cards),
      scripts: ['DOPPELGANGER_EXPOSER']
    },
    {
      condition: () => hasFlipper(selected_cards),
      scripts: ['FLIPPER']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasFlipper(selected_cards),
      scripts: ['DOPPELGANGER_FLIPPER']
    },
    {
      condition: () => hasEmpath(selected_cards),
      scripts: ['EMPATH']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasEmpath(selected_cards),
      scripts: ['DOPPELGANGER_EMPATH']
    },
    {
      condition: () => hasCurator(selected_cards),
      scripts: ['CURATOR']
    },
    {
      condition: () => hasDoppelganger(selected_cards) && hasCurator(selected_cards),
      scripts: ['DOPPELGANGER_CURATOR']
    },
    {
      condition: () => hasBlob(selected_cards),
      scripts: ['BLOB']
    },
    {
      condition: () => hasMortician(selected_cards),
      scripts: ['MORTICIAN']
    },
    {
      condition: () => hasMortician(selected_cards) && hasDoppelganger(selected_cards),
      scripts: ['DOPPELGANGER_MORTICIAN']
    },
    {
      condition: () => hasFamilyMan(selected_cards),
      scripts: ['FAMILY_MAN']
    },
    {
      condition: () => hasRipple(selected_cards),
      scripts: ['RIPPLE']
    }
  ]

  roleOrder.forEach(({ condition, scripts }) => {
    if (condition()) {
      scripts.forEach(addScript)
    }
  })

  gamestate.scripts = role_scenes.sort((a, b) => a.scene_number - b.scene_number)

  if (gamestate.scripts.length === 0 || gamestate.scripts[gamestate.scripts.length - 1].scene_title !== 'RIPPLE') {
    if (Math.random() < 0.5) { // 50% chance to add the "JOKE" script
      addScript('JOKE')
    }
  }

  return gamestate
}
