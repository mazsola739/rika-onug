const { logError } = require("../../log");
const {
  getRolesNames,
  getTeamName,
  containsAnyIds,
  containsAllIds,
  hasRole,
} = require("../narration/utils");
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
const { roles } = require("./roles");

const role_interactions = [
  {
    token: "TOKEN",
    mark_of_fear: false,
    message: "",
    selectable_cards: [],
    flipping_cards: [],
    flipped: [],
    artifact: [],
    shield: [],
  },
];

exports.interactionHandler = (gameState) => {
  const sceneTitle = gameState.actual_scene.scene_title;
  const selectedCards = gameState.selected_cards;

  //TODO player cards to get who has wich role

  const conditions = {
    hasOracle: hasRole(selectedCards, 50),
    hasCopycat: hasRole(selectedCards, 30),
    hasMirrorMan: hasRole(selectedCards, 64),
    hasDoppelganger: hasRole(selectedCards, 1),
    hasInstantAction: containsAnyIds(
      selectedCards,
      doppelgangerInstantActionsIds
    ),
    hasAnyVampire: containsAnyIds(selectedCards, vampireIds),
    hasTheCount: hasRole(selectedCards, 39),
    hasRenfield: hasRole(selectedCards, 38),
    hasDiseased: hasRole(selectedCards, 32),
    hasCupid: hasRole(selectedCards, 31),
    hasInstigator: hasRole(selectedCards, 34),
    hasPriest: hasRole(selectedCards, 37),
    hasAssassin: hasRole(selectedCards, 29),
    hasApprenticeAssassin: hasRole(selectedCards, 28),
    hasSentinel: hasRole(selectedCards, 25),
    hasAnyAlien: containsAnyIds(selectedCards, alienIds),
    hasCow: hasRole(selectedCards, 45),
    hasGroobAndZerb: containsAllIds(selectedCards, groobAndZerbIds),
    hasLeader: hasRole(selectedCards, 48),
    hasBodySnatcher: hasRole(selectedCards, 74),
    hasAnySuperVillains: containsAnyIds(selectedCards, superVillainsIds),
    hasTemptress: hasRole(selectedCards, 69),
    hasDrPeeker: hasRole(selectedCards, 57),
    hasRapscallion: hasRole(selectedCards, 65),
    hasEvilometer: hasRole(selectedCards, 58),
    hasAnyWerewolf: containsAnyIds(selectedCards, werewolvesIds),
    hasDreamWolf: hasRole(selectedCards, 21),
    hasAlphaWolf: hasRole(selectedCards, 17),
    hasMysticWolf: hasRole(selectedCards, 22),
    hasMinion: hasRole(selectedCards, 7),
    hasApprenticeTanner: hasRole(selectedCards, 71),
    hasTanner: hasRole(selectedCards, 10),
    hasMadScientist: hasRole(selectedCards, 63),
    hasIntern: hasRole(selectedCards, 62),
    hasBothMasons: containsAllIds(selectedCards, masonIds),
    hasAnyMason: containsAnyIds(selectedCards, masonIds),
    hasThing: hasRole(selectedCards, 85),
    hasAnnoyingLad: hasRole(selectedCards, 55),
    hasSeer: hasRole(selectedCards, 9),
    hasApprenticeSeer: hasRole(selectedCards, 18),
    hasParanormalInvestigator: hasRole(selectedCards, 23),
    hasMarksman: hasRole(selectedCards, 35),
    hasNostradamus: hasRole(selectedCards, 80),
    hasPsychic: hasRole(selectedCards, 51),
    hasDetector: hasRole(selectedCards, 56),
    hasRobber: hasRole(selectedCards, 8),
    hasWitch: hasRole(selectedCards, 27),
    hasPickpocket: hasRole(selectedCards, 36),
    hasRoleRetriever: hasRole(selectedCards, 66),
    hasVoodooLou: hasRole(selectedCards, 70),
    hasTroublemaker: hasRole(selectedCards, 11),
    hasVillageIdiot: hasRole(selectedCards, 26),
    hasMarks: containsAnyIds(selectedCards, hasMarkIds),
    hasAuraSeer: hasRole(selectedCards, 72),
    hasGremlin: hasRole(selectedCards, 33),
    hasRascal: hasRole(selectedCards, 52),
    hasSwitcheroo: hasRole(selectedCards, 68),
    hasDrunk: hasRole(selectedCards, 2),
    hasInsomniac: hasRole(selectedCards, 4),
    hasSelfAwarenessGirl: hasRole(selectedCards, 67),
    hasSquire: hasRole(selectedCards, 83),
    hasSeers: containsAnyIds(selectedCards, seerIds),
    hasRevealer: hasRole(selectedCards, 24),
    hasExposer: hasRole(selectedCards, 46),
    hasFlipper: hasRole(selectedCards, 59),
    hasEmpath: hasRole(selectedCards, 77),
    hasCurator: hasRole(selectedCards, 20),
    hasBlob: hasRole(selectedCards, 44),
    hasMortician: hasRole(selectedCards, 49),
    hasFamilyMan: hasRole(selectedCards, 78),
  };
  conditions.haOneMasonAndDoppelganger =
    conditions.hasDoppelganger && conditions.hasAnyMason;
  conditions.hasMasons =
    conditions.hasBothMasons || conditions.haOneMasonAndDoppelganger;
  conditions.hasBeholder = hasRole(selectedCards, 73) && conditions.hasSeers;

  switch (sceneTitle) {
    // case "CARD_SELECTION":// (Scene Number 0)
    // case "EVERYONE_CARD":// (Scene Number: 1)
    /*  T W I L L I G H T  */
    /*     case "ORACLE_QUESTION": // (Scene Number: 2)
      if (conditions.hasOracle) return roles.oracle_question(gameState)
      break;
    case "ORACLE_REACTION": // (Scene Number: 3)
      const oracleQuestion = gameState.oracle_question;
      const oracleAnswer = gameState.oracle_answer; //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswer)
        return roles.oracle_reaction(gameState)
      break;
    case "COPYCAT": // (Scene Number: 4)
      if (conditions.hasCopycat) return roles.copycat(gameState)
      break;
    case "MIRROR_MAN": // (Scene Number: 5)
      if (conditions.hasMirrorMan) return roles.mirrorman(gameState)
      break;
    case "DOPPELGÄNGER": // (Scene Number: 6)
      if (conditions.hasDoppelganger) return roles.doppelganger(gameState)
      break;
    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      const instantRoles = getRolesNames(
        selectedCards,
        doppelgangerInstantActionsIds,
        instantRoleIds
      );
      if (conditions.hasDoppelganger && conditions.hasInstantAction)
        return roles.doppelganger_instant_action(gameState)
      break;
 */ /*  D U S K */
    /*     case "VAMPIRES": // (Scene Number: 8)
      if (conditions.hasAnyVampire) return roles.vampires(gameState)
      break;
    case "THE_COUNT": // (Scene Number: 9)
      if (conditions.hasTheCount) return roles.thecount(gameState)
      break;
    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      if (conditions.hasDoppelganger && conditions.hasTheCount)
        return roles.doppelganger_thecount(gameState)
      break;
    case "RENFIELD": // (Scene Number: 11)
      if (conditions.hasRenfield)
        return roles.renfield(gameState)
      break;
    case "DISEASED": // (Scene Number: 12)
      if (conditions.hasDiseased) return roles.diseased(gameState)
      break;
    case "CUPID": // (Scene Number: 13)
      if (conditions.hasCupid) return roles.cupid(gameState)
      break;
    case "INSTIGATOR": // (Scene Number: 14)
      if (conditions.hasInstigator) return roles.instigator(gameState)
      break;
    case "PRIEST": // (Scene Number: 15)
      if (conditions.hasPriest) return roles.priest(gameState)
      break;
    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      if (conditions.hasDoppelganger && conditions.hasPriest)
        return roles.doppelganger_priest(gameState)
      break;
    case "ASSASSIN": // (Scene Number: 17)sent
      if (conditions.hasAssassin) return roles.assassin(gameState)
      break;
    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      if (conditions.hasDoppelganger && conditions.hasAssassin)
        return roles.doppelganger_assassin(gameState)
      break;
    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      if (conditions.hasApprenticeAssassin)
        return roles.apprenticeassassin(gameState)
      break;
    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin)
        return roles.doppelganger_apprenticeassassin(gameState)
      break;
    case "EVERYONE_MARK": // (Scene Number: 21)
      if (conditions.hasMarks) return roles.everyonemark(gameState)
      break;
 */ /*  N I G H T */
    /*     case "LOVERS": // (Scene Number: 22)
      if (conditions.hasCupid) return roles.lovers(gameState)
      break;
    case "SENTINEL": // (Scene Number: 24) //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinel) return roles.sentinel(gameState)
      break;
    case "ALIENS": // (Scene Number: 25) 
      if (conditions.hasAnyAlien) return roles.aliens(gameState)
      break;
    case "COW": // (Scene Number: 26)
      if (conditions.hasCow) return roles.cow(gameState)
      break;
    case "GROOB_ZERB": // (Scene Number: 27)
      if (conditions.hasGroobAndZerb)
        return roles.groobzerb(gameState)
      break;
    case "LEADER": // (Scene Number: 28)
      if (conditions.hasLeader && conditions.hasAnyAlien)
        return roles.leader(gameState)
      break;
    case "LEADER_ZERB_GROOB": // (Scene Number: 29)
      if (conditions.hasLeader && conditions.hasGroobAndZerb)
        return roles.leader_zerbgroob(gameState)
      break;
    case "BODY_SNATCHER": // (Scene Number: 30)
      if (conditions.hasBodySnatcher) return roles.bodysnatcher(gameState)
      break;
    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 31)
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher)
        return roles.doppelganger_bodysnatcher(gameState)
      break;
    case "SUPER_VILLAINS": // (Scene Number: 32)
      if (conditions.hasAnySuperVillains) return roles.supervillains(gameState)
      break;
    case "TEMPTRESS": // (Scene Number: 33)
      if (conditions.hasTemptress) return roles.temptress(gameState)
      break;
    case "DR_PEEKER": // (Scene Number: 34)
      if (conditions.hasDrPeeker) return roles.drpeeker(gameState)
      break;
    case "RAPSCALLION": // (Scene Number: 35)
      if (conditions.hasRapscallion) return roles.rapscallion(gameState)
      break;
    case "EVILOMETER": // (Scene Number: 36)
      if (conditions.hasEvilometer)
        return roles.evilometer(gameState)
      break;*/
    case "WEREWOLVES": // (Scene Number: 37)
      if (conditions.hasAnyWerewolf)
        return roles.werewolves(gameState)
      break;/*
    case "ALPHA_WOLF": // (Scene Number: 38)
      if (conditions.hasAlphaWolf) return roles.alphawolf(gameState)
      break;
     case "MYSTIC_WOLF": // (Scene Number: 39)
      if (conditions.hasMysticWolf) return roles.mysticwolf(gameState)
      break;*/
    case "MINION": // (Scene Number: 40)
      if (conditions.hasMinion)
        return roles.minion(gameState)
      break;/*
    case "APPRENTICE_TANNER": // (Scene Number: 41)
      if (conditions.hasApprenticeTanner && conditions.hasTanner)
        return roles.apprenticetanner(gameState)
      break;
    case "MAD_SCIENTIST": // (Scene Number: 42)
      if (conditions.hasMadScientist) return roles.madscientist(gameState)
      break;
    case "INTERN": // (Scene Number: 43)
      if (conditions.hasIntern)
        return roles.intern(gameState)
      break;*/
    case "MASONS": // (Scene Number: 44)
      if (conditions.hasMasons) return roles.masons(gameState)
      break;
    /*  case "THING": // (Scene Number: 45)
      if (conditions.hasThing) return roles.thing(gameState)
      break;
    case "ANNOYING_LAD": // (Scene Number: 46)
      if (conditions.hasAnnoyingLad) return roles.annoyinglad(gameState)
      break;
    case "SEER": // (Scene Number: 47)
      if (conditions.hasSeer) return roles.seer(gameState)
      break;
    case "APPRENTICE_SEER": // (Scene Number: 48)
      if (conditions.hasApprenticeSeer) return roles.apprenticeseer(gameState)
      break;
    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 49)
      if (conditions.hasParanormalInvestigator)
        return roles.paranormalinvestigator(gameState)
      break;
    case "MARKSMAN": // (Scene Number: 50)
      if (conditions.hasMarksman)
        return roles.marksman(gameState)
      break;
    case "NOSTRADAMUS": // (Scene Number: 51)
      if (conditions.hasNostradamus) return roles.nostradamus(gameState)
      break;
    case "NOSTRADAMUS_REACTION": // (Scene Number: 52)
      const nostradamusTeam = getTeamName(lastViewedCardId);
      if (conditions.hasNostradamus)
        return roles.nostradamus_reaction(gameState)
      break;
    case "PSYCHIC": // (Scene Number: 53)
      if (conditions.hasPsychic) return roles.psychic(gameState)
      break;
    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 54)
      if (conditions.hasDoppelganger && conditions.hasPsychic)
        return roles.doppelganger_psychic(gameState)
      break;
    case "DETECTOR": // (Scene Number: 55)
      if (conditions.hasDetector) return roles.detector(gameState)
      break;
    case "ROBBER": // (Scene Number: 56)
      if (conditions.hasRobber) return roles.robber(gameState)
      break;
    case "WITCH": // (Scene Number: 57)
      if (conditions.hasWitch) return roles.witch(gameState)
      break;
    case "PICKPOCKET": // (Scene Number: 58)
      if (conditions.hasPickpocket) return roles.pickpocket(gameState)
      break;
    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 59)
      if (conditions.hasDoppelganger && conditions.hasPickpocket)
        return roles.doppelganger_pickpocket(gameState)
      break;
    case "ROLE_RETRIEVER": // (Scene Number: 60)
      if (conditions.hasRoleRetriever) return roles.roleretriever(gameState)
      break;
    case "VOODOO_LOU": // (Scene Number: 61)
      if (conditions.hasVoodooLou) return roles.voodoolou(gameState)
      break;
    case "TROUBLEMAKER": // (Scene Number: 62)
      if (conditions.hasTroublemaker) return roles.troublemaker(gameState)
      break;
    case "VILLAGE_IDIOT": // (Scene Number: 63)
      if (conditions.hasVillageIdiot) return roles.villageidiot(gameState)
      break;
    case "AURA_SEER": // (Scene Number: 64)
      if (conditions.hasAuraSeer)
        return roles.auraseer(gameState)
      break;
    case "GREMLIN": // (Scene Number: 65)
      if (conditions.hasGremlin) return roles.gremlin(gameState)
      break;
    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 66)
      if (conditions.hasDoppelganger && conditions.hasGremlin)
        return roles.doppelganger_gremlin(gameState)
      break;
    case "RASCAL": // (Scene Number: 67)
      if (conditions.hasRascal) return roles.rascal(gameState)
      break;
    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 68)
      if (conditions.hasDoppelganger && conditions.hasRascal)
        return roles.doppelganger_rascal(gameState)
      break;
    case "SWITCHEROO": // (Scene Number: 69)
      if (conditions.hasSwitcheroo) return roles.switcheroo(gameState)
      break;
    case "DRUNK": // (Scene Number: 70)
      if (conditions.hasDrunk) return roles.drunk(gameState)
      break;*/
    case "INSOMNIAC": // (Scene Number: 71)
      if (conditions.hasInsomniac) return roles.insomniac(gameState);
      break;
    /*case "SELF_AWARENESS_GIRL": // (Scene Number: 72)
      if (conditions.hasSelfAwarenessGirl)
        return roles.selfawarenessgirl(gameState)
      break;
    case "SQUIRE": // (Scene Number: 73)
      if (conditions.hasSquire)
        return roles.squire(gameState)
      break;
    case "BEHOLDER": // (Scene Number: 74)
      if (conditions.hasBeholder)
        return roles.beholder(gameState)
      break;
    case "REVEALER": // (Scene Number: 75) //! FLIPPED
      if (conditions.hasRevealer) return roles.revealer(gameState)
      break;
    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 76) //! FLIPPED
      if (conditions.hasDoppelganger && conditions.hasRevealer)
        return roles.doppelganger_revealer(gameState)
      break;
    case "EXPOSER": // (Scene Number: 74) //! FLIPPED
      if (conditions.hasExposer) return roles.exposer(gameState)
      break;
    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 75) //! FLIPPED
      if (conditions.hasDoppelganger && conditions.hasExposer)
        return roles.doppelganger_exposer(gameState)
      break;
    case "FLIPPER": // (Scene Number: 76)
      if (conditions.hasFlipper) return roles.flipper(gameState)
      break;
    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 77)
      if (conditions.hasDoppelganger && conditions.hasFlipper)
        return roles.doppelganger_flipper(gameState)
      break;
    case "EMPATH": // (Scene Number: 78)
      if (conditions.hasEmpath) return roles.empath(gameState)
      break;
    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 79)
      if (conditions.hasDoppelganger && conditions.hasEmpath)
        return roles.doppelganger_empath(gameState)
      break;
    case "CURATOR": // (Scene Number: 80) //! ARTIFACT visibility
      if (conditions.hasCurator) return roles.curator(gameState)
      break;
    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 81) //! ARTIFACT visibility
      if (conditions.hasDoppelganger && conditions.hasCurator)
        return roles.doppelganger_curator(gameState)
      break;
    case "BLOB": // (Scene Number: 82)
      if (conditions.hasBlob) return roles.blob(gameState)
      break;
    case "MORTICIAN": // (Scene Number: 83)
      if (conditions.hasMortician) return roles.mortician(gameState)
      break;
    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 84)
      if (conditions.hasMortician && conditions.hasDoppelganger)
        return roles.doppelganger_mortician(gameState)
      break;
    case "FAMILY_MAN": // (Scene Number: 85)
      if (conditions.hasFamilyMan)
        return roles.familyman(gameState)
      break;
 */ default:
    //      logError(`INTERACTION_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`)

    //Ripple Scene:
    /*  RIPPLE":// (Scene Number: 69) */
    //Day Scenes:
    /*  INVESTIGATION":// (Scene Number: 70)
  VOTE":// (Scene Number: 71)
  WINNERS":// (Scene Number: 72) */
  }
  return [];
};
