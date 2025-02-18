import scripts from '../data/script.json'
import { logTrace } from '../log'
import * as conditions from './conditions'

export const rippleScriptHandler = gamestate => {
  logTrace(`rippleScriptHandler in room [${gamestate.room_id}]`)

  const selected_cards = gamestate.ripple.roles
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
      condition: () => conditions.hasCopycat(selected_cards),
      scripts: ['COPYCAT']
    },
    {
      condition: () => conditions.hasMirrorMan(selected_cards),
      scripts: ['MIRROR_MAN']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards),
      scripts: ['DOPPELGÄNGER']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasInstantAction(selected_cards),
      scripts: ['DOPPELGÄNGER_INSTANT_ACTION']
    },
    {
      condition: () => conditions.hasAnyVampire(selected_cards),
      scripts: ['VAMPIRES']
    },
    {
      condition: () => conditions.hasTheCount(selected_cards),
      scripts: ['THE_COUNT']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasTheCount(selected_cards),
      scripts: ['DOPPELGÄNGER_THE_COUNT']
    },
    {
      condition: () => conditions.hasRenfield(selected_cards),
      scripts: ['RENFIELD']
    },
    {
      condition: () => conditions.hasDiseased(selected_cards),
      scripts: ['DISEASED']
    },
    {
      condition: () => conditions.hasCupid(selected_cards),
      scripts: ['CUPID']
    },
    {
      condition: () => conditions.hasInstigator(selected_cards),
      scripts: ['INSTIGATOR']
    },
    {
      condition: () => conditions.hasPriest(selected_cards),
      scripts: ['PRIEST']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasPriest(selected_cards),
      scripts: ['DOPPELGÄNGER_PRIEST']
    },
    {
      condition: () => conditions.hasAssassin(selected_cards),
      scripts: ['ASSASSIN']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasAssassin(selected_cards),
      scripts: ['DOPPELGÄNGER_ASSASSIN']
    },
    {
      condition: () => conditions.hasApprenticeAssassin(selected_cards),
      scripts: ['APPRENTICE_ASSASSIN']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasApprenticeAssassin(selected_cards),
      scripts: ['DOPPELGÄNGER_APPRENTICE_ASSASSIN']
    },
    {
      condition: () => conditions.hasMarks(selected_cards),
      scripts: ['EVERYONE_MARK']
    },
    {
      condition: () => conditions.hasCupid(selected_cards),
      scripts: ['LOVERS']
    },
    {
      condition: () => conditions.hasSentinel(selected_cards),
      scripts: ['SENTINEL']
    },
    {
      condition: () => conditions.hasAnyAlien(selected_cards),
      scripts: ['ALIENS']
    },
    {
      condition: () => conditions.hasCow(selected_cards),
      scripts: ['COW']
    },
    {
      condition: () => conditions.hasGroobAndZerb(selected_cards),
      scripts: ['GROOB_ZERB']
    },
    {
      condition: () => conditions.hasBodySnatcher(selected_cards),
      scripts: ['BODY_SNATCHER']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasBodySnatcher(selected_cards),
      scripts: ['DOPPELGÄNGER_BODY_SNATCHER']
    },
    {
      condition: () => conditions.hasAnySuperVillains(selected_cards),
      scripts: ['SUPER_VILLAINS']
    },
    {
      condition: () => conditions.hasTemptress(selected_cards),
      scripts: ['TEMPTRESS']
    },
    {
      condition: () => conditions.hasDrPeeker(selected_cards),
      scripts: ['DR_PEEKER']
    },
    {
      condition: () => conditions.hasRapscallion(selected_cards),
      scripts: ['RAPSCALLION']
    },
    {
      condition: () => conditions.hasEvilometer(selected_cards),
      scripts: ['EVILOMETER']
    },
    {
      condition: () => conditions.hasAnyWerewolf(selected_cards),
      scripts: ['WEREWOLVES']
    },
    {
      condition: () => conditions.hasAlphaWolf(selected_cards),
      scripts: ['ALPHA_WOLF']
    },
    {
      condition: () => conditions.hasMysticWolf(selected_cards),
      scripts: ['MYSTIC_WOLF']
    },
    {
      condition: () => conditions.hasMinion(selected_cards),
      scripts: ['MINION']
    },
    {
      condition: () => conditions.hasApprenticeTanner(selected_cards) && conditions.hasTanner(selected_cards),
      scripts: ['APPRENTICE_TANNER']
    },
    {
      condition: () => conditions.hasLeader(selected_cards) && conditions.hasAnyAlien(selected_cards),
      scripts: ['LEADER']
    },
    {
      condition: () => conditions.hasLeader(selected_cards) && conditions.hasGroobAndZerb(selected_cards),
      scripts: ['LEADER_ZERB_GROOB']
    },
    {
      condition: () => conditions.hasMadScientist(selected_cards),
      scripts: ['MAD_SCIENTIST']
    },
    {
      condition: () => conditions.hasIntern(selected_cards),
      scripts: ['INTERN']
    },
    {
      condition: () => conditions.hasMasons(selected_cards),
      scripts: ['MASONS']
    },
    {
      condition: () => conditions.hasThing(selected_cards),
      scripts: ['THING']
    },
    {
      condition: () => conditions.hasAnnoyingLad(selected_cards),
      scripts: ['ANNOYING_LAD']
    },
    {
      condition: () => conditions.hasSeer(selected_cards),
      scripts: ['SEER']
    },
    {
      condition: () => conditions.hasApprenticeSeer(selected_cards),
      scripts: ['APPRENTICE_SEER']
    },
    {
      condition: () => conditions.hasParanormalInvestigator(selected_cards),
      scripts: ['PARANORMAL_INVESTIGATOR']
    },
    {
      condition: () => conditions.hasMarksman(selected_cards),
      scripts: ['MARKSMAN']
    },
    {
      condition: () => conditions.hasNostradamus(selected_cards),
      scripts: ['NOSTRADAMUS']
    },
    {
      condition: () => conditions.hasNostradamus(selected_cards),
      scripts: ['NOSTRADAMUS_REACTION']
    },
    {
      condition: () => conditions.hasPsychic(selected_cards),
      scripts: ['PSYCHIC']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasPsychic(selected_cards),
      scripts: ['DOPPELGÄNGER_PSYCHIC']
    },
    {
      condition: () => conditions.hasDetector(selected_cards),
      scripts: ['DETECTOR']
    },
    {
      condition: () => conditions.hasRobber(selected_cards),
      scripts: ['ROBBER']
    },
    {
      condition: () => conditions.hasWitch(selected_cards),
      scripts: ['WITCH']
    },
    {
      condition: () => conditions.hasPickpocket(selected_cards),
      scripts: ['PICKPOCKET']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasPickpocket(selected_cards),
      scripts: ['DOPPELGÄNGER_PICKPOCKET']
    },
    {
      condition: () => conditions.hasRoleRetriever(selected_cards),
      scripts: ['ROLE_RETRIEVER']
    },
    {
      condition: () => conditions.hasVoodooLou(selected_cards),
      scripts: ['VOODOO_LOU']
    },
    {
      condition: () => conditions.hasTroublemaker(selected_cards),
      scripts: ['TROUBLEMAKER']
    },
    {
      condition: () => conditions.hasVillageIdiot(selected_cards),
      scripts: ['VILLAGE_IDIOT']
    },
    {
      condition: () => conditions.hasAuraSeer(selected_cards),
      scripts: ['AURA_SEER']
    },
    {
      condition: () => conditions.hasGremlin(selected_cards),
      scripts: ['GREMLIN']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasGremlin(selected_cards),
      scripts: ['DOPPELGÄNGER_GREMLIN']
    },
    {
      condition: () => conditions.hasRascal(selected_cards),
      scripts: ['RASCAL']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasRascal(selected_cards),
      scripts: ['DOPPELGÄNGER_RASCAL']
    },
    {
      condition: () => conditions.hasSwitcheroo(selected_cards),
      scripts: ['SWITCHEROO']
    },
    {
      condition: () => conditions.hasDrunk(selected_cards),
      scripts: ['DRUNK']
    },
    {
      condition: () => conditions.hasInsomniac(selected_cards),
      scripts: ['INSOMNIAC']
    },
    {
      condition: () => conditions.hasSelfAwarenessGirl(selected_cards),
      scripts: ['SELF_AWARENESS_GIRL']
    },
    {
      condition: () => conditions.hasSquire(selected_cards),
      scripts: ['SQUIRE']
    },
    {
      condition: () => conditions.hasBeholder(selected_cards),
      scripts: ['BEHOLDER']
    },
    {
      condition: () => conditions.hasRevealer(selected_cards),
      scripts: ['REVEALER']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasRevealer(selected_cards),
      scripts: ['DOPPELGÄNGER_REVEALER']
    },
    {
      condition: () => conditions.hasExposer(selected_cards),
      scripts: ['EXPOSER']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasExposer(selected_cards),
      scripts: ['DOPPELGÄNGER_EXPOSER']
    },
    {
      condition: () => conditions.hasFlipper(selected_cards),
      scripts: ['FLIPPER']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasFlipper(selected_cards),
      scripts: ['DOPPELGÄNGER_FLIPPER']
    },
    {
      condition: () => conditions.hasEmpath(selected_cards),
      scripts: ['EMPATH']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasEmpath(selected_cards),
      scripts: ['DOPPELGÄNGER_EMPATH']
    },
    {
      condition: () => conditions.hasCurator(selected_cards),
      scripts: ['CURATOR']
    },
    {
      condition: () => conditions.hasDoppelganger(selected_cards) && conditions.hasCurator(selected_cards),
      scripts: ['DOPPELGÄNGER_CURATOR']
    },
    {
      condition: () => conditions.hasBlob(selected_cards),
      scripts: ['BLOB']
    },
    {
      condition: () => conditions.hasMortician(selected_cards),
      scripts: ['MORTICIAN']
    },
    {
      condition: () => conditions.hasMortician(selected_cards) && conditions.hasDoppelganger(selected_cards),
      scripts: ['DOPPELGÄNGER_MORTICIAN']
    },
    {
      condition: () => conditions.hasFamilyMan(selected_cards),
      scripts: ['FAMILY_MAN']
    },
  ]

  roleOrder.forEach(({ condition, scripts }) => {
    if (condition()) {
      scripts.forEach(addScript)
    }
  })

  gamestate.scripts = role_scenes.sort((a, b) => a.scene_number - b.scene_number)

  addScript('JOKE')

  return gamestate
}
