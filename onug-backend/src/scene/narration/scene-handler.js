const { roles } = require("./roles");
const {
  getRolesNames,
  getTeamName,
  containsAnyIds,
  containsAllIds,
  hasRole,
} = require("./utils");
const {
  instantRoleIds,
  doppelgangerInstantActionsIds,
  vampireIds,
  alienIds,
  groobAndZerbIds,
  superVillainsIds,
  werewolvesIds,
  hasMarkIds,
  seerIds,
  masonIds,
} = require("./constants");
const { logError } = require("../../log");

const NARRATION = 'actual_scene.text'

//! todo save interaction identifiers for this: aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO action_history
exports.sceneHandler = gameState => {
  const sceneTitle = gameState.actual_scene.scene_title;
  const selectedCards = gameState.selected_cards;
  const totalPlayers = gameState.players.length;

  const conditions = {
    hasOracle:                 hasRole(selectedCards, 50),
    hasCopycat:                hasRole(selectedCards, 30),
    hasMirrorMan:              hasRole(selectedCards, 64),
    hasDoppelganger:           hasRole(selectedCards, 1),
    hasInstantAction:          containsAnyIds(selectedCards, doppelgangerInstantActionsIds),
    hasAnyVampire:             containsAnyIds(selectedCards, vampireIds),
    hasTheCount:               hasRole(selectedCards, 39),
    hasRenfield:               hasRole(selectedCards, 38),
    hasDiseased:               hasRole(selectedCards, 32),
    hasCupid:                  hasRole(selectedCards, 31),
    hasInstigator:             hasRole(selectedCards, 34),
    hasPriest:                 hasRole(selectedCards, 37),
    hasAssassin:               hasRole(selectedCards, 29),
    hasApprenticeAssassin:     hasRole(selectedCards, 28),
    hasSentinel:               hasRole(selectedCards, 25),
    hasAnyAlien:               containsAnyIds(selectedCards, alienIds),
    hasCow:                    hasRole(selectedCards, 45),
    hasGroobAndZerb:           containsAllIds(selectedCards, groobAndZerbIds),
    hasLeader:                 hasRole(selectedCards, 48),
    hasBodySnatcher:           hasRole(selectedCards, 74),
    hasAnySuperVillains:       containsAnyIds(selectedCards, superVillainsIds),
    hasTemptress:              hasRole(selectedCards, 69),
    hasDrPeeker:               hasRole(selectedCards, 57),
    hasRapscallion:            hasRole(selectedCards, 65),
    hasEvilometer:             hasRole(selectedCards, 58),
    hasAnyWerewolf:            containsAnyIds(selectedCards, werewolvesIds),
    hasDreamWolf:              hasRole(selectedCards, 21),
    hasAlphaWolf:              hasRole(selectedCards, 17),
    hasMysticWolf:             hasRole(selectedCards, 22),
    hasMinion:                 hasRole(selectedCards, 7),
    hasApprenticeTanner:       hasRole(selectedCards, 71),
    hasTanner:                 hasRole(selectedCards, 10),
    hasMadScientist:           hasRole(selectedCards, 63),
    hasIntern:                 hasRole(selectedCards, 62),
    hasBothMasons:             containsAllIds(selectedCards, masonIds),
    hasAnyMason:               containsAnyIds(selectedCards, masonIds),
    hasThing:                  hasRole(selectedCards, 85),
    hasAnnoyingLad:            hasRole(selectedCards, 55),
    hasSeer:                   hasRole(selectedCards, 9),
    hasApprenticeSeer:         hasRole(selectedCards, 18),
    hasParanormalInvestigator: hasRole(selectedCards, 23),
    hasMarksman:               hasRole(selectedCards, 35),
    hasNostradamus:            hasRole(selectedCards, 80),
    hasPsychic:                hasRole(selectedCards, 51),
    hasDetector:               hasRole(selectedCards, 56),
    hasRobber:                 hasRole(selectedCards, 8),
    hasWitch:                  hasRole(selectedCards, 27),
    hasPickpocket:             hasRole(selectedCards, 36),
    hasRoleRetriever:          hasRole(selectedCards, 66),
    hasVoodooLou:              hasRole(selectedCards, 70),
    hasTroublemaker:           hasRole(selectedCards, 11),
    hasVillageIdiot:           hasRole(selectedCards, 26),
    hasMarks:                  containsAnyIds(selectedCards, hasMarkIds),
    hasAuraSeer:               hasRole(selectedCards, 72),
    hasGremlin:                hasRole(selectedCards, 33),
    hasRascal:                 hasRole(selectedCards, 52),
    hasSwitcheroo:             hasRole(selectedCards, 68),
    hasDrunk:                  hasRole(selectedCards, 2),
    hasInsomniac:              hasRole(selectedCards, 4),
    hasSelfAwarenessGirl:      hasRole(selectedCards, 67),
    hasSquire:                 hasRole(selectedCards, 83),
    hasSeers:                  containsAnyIds(selectedCards, seerIds),
    hasRevealer:               hasRole(selectedCards, 24),
    hasExposer:                hasRole(selectedCards, 46),
    hasFlipper:                hasRole(selectedCards, 59),
    hasEmpath:                 hasRole(selectedCards, 77),
    hasCurator:                hasRole(selectedCards, 20),
    hasBlob:                   hasRole(selectedCards, 44),
    hasMortician:              hasRole(selectedCards, 49),
    hasFamilyMan:              hasRole(selectedCards, 78),
  };
  conditions.haOneMasonAndDoppelganger = conditions.hasDoppelganger && conditions.hasAnyMason;
  conditions.hasMasons = conditions.hasBothMasons || conditions.haOneMasonAndDoppelganger;
  conditions.hasBeholder = hasRole(selectedCards, 73) && conditions.hasSeers;

  switch (sceneTitle) {
    // case "JOKE":// (Scene Number 0)
    // case "EPIC_BATTLE":// (Scene Number: 1)

    /*  T W I L L I G H T  */

    case "ORACLE_QUESTION": // (Scene Number: 2)
      const oq = roles.oracle_question()

      if (conditions.hasOracle) return {
        [NARRATION]: oq, 'oracle_question': oq[1]
      }
      break

    case "ORACLE_REACTION": // (Scene Number: 3)
      const oracleQuestion = gameState.oracle_question
      const oracleAnswer = gameState.oracle_answer

      if (conditions.hasOracle) return {
          [NARRATION]: roles.oracle_reaction(oracleQuestion, oracleAnswer),
        }
      break

    case "COPYCAT": // (Scene Number: 4)
      if (conditions.hasCopycat) return {
        [NARRATION]: roles.copycat(),
      }
      break

    case "MIRROR_MAN": // (Scene Number: 5)
      if (conditions.hasMirrorMan) return {
        [NARRATION]: roles.mirrorman(),
      }
      break

    case "DOPPELGÄNGER": // (Scene Number: 6)
      if (conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger(),
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      const instantRoles = getRolesNames(selectedCards, doppelgangerInstantActionsIds, instantRoleIds)

      if (conditions.hasDoppelganger && conditions.hasInstantAction) return {
        [NARRATION]: roles.doppelganger_instant_action(instantRoles),
      }
      break

    /*  D U S K */

    case "VAMPIRES": // (Scene Number: 8)
      if (conditions.hasAnyVampire) return {
        [NARRATION]: roles.vampires(),
      }
      break

    case "THE_COUNT": // (Scene Number: 9)
      if (conditions.hasTheCount) return {
        [NARRATION]: roles.thecount(),
      }
      break
      
    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      if (conditions.hasDoppelganger && conditions.hasTheCount) return {
        [NARRATION]: roles.doppelganger_thecount(),
      }
      break

    case "RENFIELD": // (Scene Number: 11)
      if (conditions.hasRenfield) return {
        [NARRATION]: roles.renfield(conditions.hasDoppelganger),
      }
      break

    case "DISEASED": // (Scene Number: 12)
      if (conditions.hasDiseased) return {
        [NARRATION]: roles.diseased(),
      }
      break

    case "CUPID": // (Scene Number: 13)
      if (conditions.hasCupid) return {
        [NARRATION]: roles.cupid(),
      }
      break

    case "INSTIGATOR": // (Scene Number: 14)
      if (conditions.hasInstigator) return {
        [NARRATION]: roles.instigator(),
      }
      break

    case "PRIEST": // (Scene Number: 15)
      if (conditions.hasPriest) return {
        [NARRATION]: roles.priest(),
      }
      break

    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      if (conditions.hasDoppelganger && conditions.hasPriest) return {
        [NARRATION]: roles.doppelganger_priest(),
      }
      break

    case "ASSASSIN": // (Scene Number: 17)
      if (conditions.hasAssassin) return {
        [NARRATION]: roles.assassin(),
      }
      break

    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      if (conditions.hasDoppelganger && conditions.hasAssassin) return {
        [NARRATION]: roles.doppelganger_assassin(),
      }
      break

    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      if (conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.apprenticeassassin(conditions.hasAssassin),
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.doppelganger_apprenticeassassin(conditions.hasAssassin),
      }
      break

    case "EVERYONE_MARK": // (Scene Number: 21)
      if (conditions.hasMarks) return {
        [NARRATION]: roles.everyonemark(),
      }
      break

    /*  N I G H T */

    case "LOVERS": // (Scene Number: 22)
      if (conditions.hasCupid) return {
        [NARRATION]: roles.lovers(),
      }
      break

    case "SENTINEL": // (Scene Number: 23)
      if (conditions.hasSentinel) return {
        [NARRATION]: roles.sentinel(gameState),
      }
      break

    case "ALIENS": // (Scene Number: 24)
      if (conditions.hasAnyAlien) return {
        [NARRATION]: roles.aliens(totalPlayers),
      }
      break

    case "COW": // (Scene Number: 25)
      if (conditions.hasCow) return {
        [NARRATION]: roles.cow(conditions.hasDoppelganger),
      }
      break

    case "GROOB_ZERB": // (Scene Number: 26)
      if (conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.groobzerb(conditions.hasDoppelganger),
      }
      break

    case "LEADER": // (Scene Number: 27)
      if (conditions.hasLeader && conditions.hasAnyAlien) return {
        [NARRATION]: roles.leader(conditions.hasDoppelganger),
      }
      break

    case "LEADER_ZERB_GROOB": // (Scene Number: 28)
      if (conditions.hasLeader && conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.leader_zerbgroob(),
      }
      break

    case "BODY_SNATCHER": // (Scene Number: 29)
      if (conditions.hasBodySnatcher) return {
        [NARRATION]: roles.bodysnatcher(),
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 30)
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher) return {
        [NARRATION]: roles.doppelganger_bodysnatcher(),
      }
      break

    case "SUPER_VILLAINS": // (Scene Number: 31)
      if (conditions.hasAnySuperVillains) return {
        [NARRATION]: roles.supervillains(),
      }
      break

    case "TEMPTRESS": // (Scene Number: 32)
      if (conditions.hasTemptress) return {
        [NARRATION]: roles.temptress(),
      }
      break

    case "DR_PEEKER": // (Scene Number: 33)
      if (conditions.hasDrPeeker) return {
        [NARRATION]: roles.drpeeker(),
      }
      break

    case "RAPSCALLION": // (Scene Number: 34)
      if (conditions.hasRapscallion) return {
        [NARRATION]: roles.rapscallion(),
      }
      break

    case "EVILOMETER": // (Scene Number: 35)
      if (conditions.hasEvilometer) return {
        [NARRATION]: roles.evilometer(conditions.hasDoppelganger),
      }
      break

    case "WEREWOLVES": // (Scene Number: 36)
      if (conditions.hasAnyWerewolf) return {
        [NARRATION]: roles.werewolves(conditions.hasDreamWolf),
      }
      break

    case "ALPHA_WOLF": // (Scene Number: 37)
      if (conditions.hasAlphaWolf) return {
        [NARRATION]: roles.alphawolf(),
      }
      break

    case "MYSTIC_WOLF": // (Scene Number: 38)
      if (conditions.hasMysticWolf) return {
        [NARRATION]: roles.mysticwolf(),
      }
      break

    case "MINION": // (Scene Number: 39)
      if (conditions.hasMinion) return {
        [NARRATION]: roles.minion(conditions.hasDoppelganger),
      }
      break

    case "APPRENTICE_TANNER": // (Scene Number: 40)
      if (conditions.hasApprenticeTanner && conditions.hasTanner) return {
        [NARRATION]: roles.apprenticetanner(conditions.hasDoppelganger),
      }
      break

    case "MAD_SCIENTIST": // (Scene Number: 41)
      if (conditions.hasMadScientist) return {
        [NARRATION]: roles.madscientist(),
      }
      break

    case "INTERN": // (Scene Number: 42)
      if (conditions.hasIntern) return {
        [NARRATION]: roles.intern(conditions.hasDoppelganger, conditions.hasMadScientist),
      }
      break

    case "MASONS": // (Scene Number: 43)
      if (conditions.hasMasons) return {
        [NARRATION]: roles.masons(),
      }
      break

    case "THING": // (Scene Number: 44)
      if (conditions.hasThing) return {
        [NARRATION]: roles.thing(),
      }
      break

    case "ANNOYING_LAD": // (Scene Number: 45)
      if (conditions.hasAnnoyingLad) return {
        [NARRATION]: roles.annoyinglad(),
      }
      break

    case "SEER": // (Scene Number: 46)
      if (conditions.hasSeer) return {
        [NARRATION]: roles.seer(),
      }
      break

    case "APPRENTICE_SEER": // (Scene Number: 47)
      if (conditions.hasApprenticeSeer) return {
        [NARRATION]: roles.apprenticeseer(),
      }
      break

    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 48)
      if (conditions.hasParanormalInvestigator) return {
        [NARRATION]: roles.paranormalinvestigator(),
      }
      break

    case "MARKSMAN": // (Scene Number: 49)
      if (conditions.hasMarksman) return {
        [NARRATION]: roles.marksman(conditions.hasDoppelganger),
      }
      break

    case "NOSTRADAMUS": // (Scene Number: 50)
      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus(),
      }
      break

    case "NOSTRADAMUS_REACTION": // (Scene Number: 51)
      const lastViewedCardId = gameState.lastViewedCardId
      const nostradamusTeam = getTeamName(lastViewedCardId) // TODO it's undefined

      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus_reaction(nostradamusTeam),
      }
      break

    case "PSYCHIC": // (Scene Number: 52)
      if (conditions.hasPsychic) return {
        [NARRATION]: roles.psychic(),
      }
      break

    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 53)
      if (conditions.hasDoppelganger && conditions.hasPsychic) return {
        [NARRATION]: roles.doppelganger_psychic(),
      }
      break

    case "DETECTOR": // (Scene Number: 54)
      if (conditions.hasDetector) return {
        [NARRATION]: roles.detector(),
      }
      break

    case "ROBBER": // (Scene Number: 55)
      if (conditions.hasRobber) return {
        [NARRATION]: roles.robber(),
      }
      break

    case "WITCH": // (Scene Number: 56)
      if (conditions.hasWitch) return {
        [NARRATION]: roles.witch(),
      }
      break

    case "PICKPOCKET": // (Scene Number: 57)
      if (conditions.hasPickpocket) return {
        [NARRATION]: roles.pickpocket(),
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 58)
      if (conditions.hasDoppelganger && conditions.hasPickpocket) return {
        [NARRATION]: roles.doppelganger_pickpocket(),
      }
      break

    case "ROLE_RETRIEVER": // (Scene Number: 59)
      if (conditions.hasRoleRetriever) return {
        [NARRATION]: roles.roleretriever(),
      }
      break

    case "VOODOO_LOU": // (Scene Number: 60)
      if (conditions.hasVoodooLou) return {
        [NARRATION]: roles.voodoolou(),
      }
      break

    case "TROUBLEMAKER": // (Scene Number: 61)
      if (conditions.hasTroublemaker) return {
        [NARRATION]: roles.troublemaker(),
      }
      break

    case "VILLAGE_IDIOT": // (Scene Number: 62)
      if (conditions.hasVillageIdiot) return {
        [NARRATION]: roles.villageidiot(),
      }
      break

    case "AURA_SEER": // (Scene Number: 63)
      if (conditions.hasAuraSeer) return {
        [NARRATION]: roles.auraseer(conditions.hasDoppelganger, conditions.hasMarks),
      }
      break

    case "GREMLIN": // (Scene Number: 64)
      if (conditions.hasGremlin) return {
        [NARRATION]: roles.gremlin(),
      }
      break

    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 65)
      if (conditions.hasDoppelganger && conditions.hasGremlin) return {
        [NARRATION]: roles.doppelganger_gremlin(),
      }
      break

    case "RASCAL": // (Scene Number: 66)
      if (conditions.hasRascal) return {
        [NARRATION]: roles.rascal(),
      }
      break

    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 67)
      if (conditions.hasDoppelganger && conditions.hasRascal) return {
        [NARRATION]: roles.doppelganger_rascal(),
      }
      break

    case "SWITCHEROO": // (Scene Number: 68)
      if (conditions.hasSwitcheroo) return {
        [NARRATION]: roles.switcheroo(),
      }
      break

    case "DRUNK": // (Scene Number: 69)
      if (conditions.hasDrunk) return {
        [NARRATION]: roles.drunk(),
      }
      break

    case "INSOMNIAC": // (Scene Number: 70)
      if (conditions.hasInsomniac) return {
        [NARRATION]: roles.insomniac(conditions.hasDoppelganger),
      }
      break

    case "SELF_AWARENESS_GIRL": // (Scene Number: 71)
      if (conditions.hasSelfAwarenessGirl) return {
        [NARRATION]: roles.selfawarenessgirl(conditions.hasDoppelganger),
      }
      break

    case "SQUIRE": // (Scene Number: 72)
      if (conditions.hasSquire) return {
        [NARRATION]: roles.squire(conditions.hasDoppelganger),
      }
      break

    case "BEHOLDER": // (Scene Number: 73)
      if (conditions.hasBeholder) return {
        [NARRATION]: roles.beholder(conditions.hasSeer, conditions.hasApprenticeSeer, conditions.hasDoppelganger),
      }
      break

    case "REVEALER": // (Scene Number: 74)
      if (conditions.hasRevealer) return {
        [NARRATION]: roles.revealer(),
      }
      break

    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 75)
      if (conditions.hasDoppelganger && conditions.hasRevealer) return {
        [NARRATION]: roles.doppelganger_revealer(),
      }
      break

    case "EXPOSER": // (Scene Number: 76)
      if (conditions.hasExposer) return {
        [NARRATION]: roles.exposer(),
      }
      break

    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 77)
      if (conditions.hasDoppelganger && conditions.hasExposer) return {
        [NARRATION]: roles.doppelganger_exposer(),
      }
      break

    case "FLIPPER": // (Scene Number: 78)
      if (conditions.hasFlipper) return {
        [NARRATION]: roles.flipper(),
      }
      break

    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 79)
      if (conditions.hasDoppelganger && conditions.hasFlipper) return {
        [NARRATION]: roles.doppelganger_flipper(),
      }
      break

    case "EMPATH": // (Scene Number: 80)
      if (conditions.hasEmpath) return {
        [NARRATION]: roles.empath(totalPlayers),
      }
      break

    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 81)
      if (conditions.hasDoppelganger && conditions.hasEmpath) return {
        [NARRATION]: roles.doppelganger_empath(totalPlayers),
      }
      break

    case "CURATOR": // (Scene Number: 82)
      if (conditions.hasCurator) return {
        [NARRATION]: roles.curator(),
      }
      break

    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 83)
      if (conditions.hasDoppelganger && conditions.hasCurator) return {
        [NARRATION]: roles.doppelganger_curator(),
      }
      break

    case "BLOB": // (Scene Number: 84)
      if (conditions.hasBlob) return {
        [NARRATION]: roles.blob(),
      }
      break

    case "MORTICIAN": // (Scene Number: 85)
      if (conditions.hasMortician) return {
        [NARRATION]: roles.mortician(),
      }
      break

    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 86)
      if (conditions.hasMortician && conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger_mortician(),
      }
      break

    case "FAMILY_MAN": // (Scene Number: 87)
      if (conditions.hasFamilyMan) return {
        [NARRATION]: roles.familyman(conditions.hasDoppelganger),
      }
      break
    default:
      logError(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`)
    
      //Ripple Scene:
      /*  RIPPLE":// (Scene Number: 88) */
      //Day Scenes:
      /*  INVESTIGATION":// (Scene Number: 89)
    VOTE":// (Scene Number: 90)
    WINNERS":// (Scene Number: 91) */
    }
    return {}
  };