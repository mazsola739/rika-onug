/*  T W I L L I G H T  */
//const { everyonecard } = require("./everyonecard")
const { oracle_question, oracle_reaction } = require("./roles/oracle")
const { copycat } = require("./roles/copycat")
const { mirrorman } = require("./roles/mirrorman")
const { doppelganger, doppelganger_instant_action } = require("./roles/doppelganger")
/*  D U S K */
const { vampires } = require("./roles/vampires")
const { thecount, doppelganger_thecount } = require("./roles/thecount")
const { renfield } = require("./roles/renfield")
const { diseased } = require("./roles/diseased")
const { cupid } = require("./roles/cupid")
const { instigator } = require("./roles/instigator")
const { priest, doppelganger_priest } = require("./roles/priest")
const { assassin, doppelganger_assassin } = require("./roles/assassin")
const { apprenticeassassin, doppelganger_apprenticeassassin } = require("./roles/apprenticeassassin")
//const { everyonemark } = require("./everyonemark")
/*  N I G H T */
const { lovers } = require("./roles/lovers")
const { sentinel } = require("./roles/sentinel")
const { aliens } = require("./roles/aliens")
const { cow } = require("./roles/cow")
const { groobzerb } = require("./roles/groobzerb")
const { leader } = require("./roles/leader")
const { bodysnatcher, doppelganger_bodysnatcher } = require("./roles/bodysnatcher")
const { supervillains } = require("./roles/supervillains")
const { temptress } = require("./roles/temptress")
const { drpeeker } = require("./roles/drpeeker")
const { rapscallion } = require("./roles/rapscallion")
const { evilometer } = require("./roles/evilometer")
const { werewolves } = require("./roles/werewolves")
const { alphawolf } = require("./roles/alphawolf")
const { mysticwolf } = require("./roles/mysticwolf")
const { minion } = require("./roles/minion")
const { apprenticetanner } = require("./roles/apprenticetanner")
const { madscientist } = require("./roles/madscientist")
const { intern } = require("./roles/intern")
const { masons } = require("./roles/masons")
const { thing } = require("./roles/thing")
const { annoyinglad } = require("./roles/annoyinglad")
const { seer } = require("./roles/seer")
const { apprenticeseer } = require("./roles/apprenticeseer")
const { paranormalinvestigator } = require("./roles/paranormalinvestigator")
const { marksman } = require("./roles/marksman")
const { nostradamus, nostradamus_reaction } = require("./roles/nostradamus")
const { psychic } = require("./roles/psychic")
const { detector } = require("./roles/detector")
const { robber } = require("./roles/robber")
const { witch } = require("./roles/witch")
const { pickpocket, doppelganger_pickpocket } = require("./roles/pickpocket")
const { roleretriever } = require("./roles/roleretriever")
const { voodoolou } = require("./roles/voodoolou")
const { troublemaker } = require("./roles/troublemaker")
const { villageidiot } = require("./roles/villageidiot")
const { auraseer } = require("./roles/auraseer")
const { gremlin, doppelganger_gremlin } = require("./roles/gremlin")
const { rascal, doppelganger_rascal } = require("./roles/rascal")
const { switcheroo } = require("./roles/switcheroo")
const { drunk } = require("./roles/drunk")
const { insomniac } = require("./roles/insomniac")
const { selfawarenessgirl } = require("./roles/selfawarenessgirl")
const { squire } = require("./roles/squire")
const { beholder } = require("./roles/beholder")
const { revealer, doppelganger_revealer } = require("./roles/revealer")
const { exposer, doppelganger_exposer } = require("./roles/exposer")
const { flipper, doppelganger_flipper } = require("./roles/flipper")
const { empath } = require("./roles/empath")
const { curator } = require("./roles/curator")
const { blob } = require("./roles/blob")
const { mortician } = require("./roles/mortician")
const { familyman } = require("./roles/familyman")
/*  R I P P L E */
//const { ripple } = require("./ripple")
/*  D A Y */
//TODO vote

const { validateRoom } = require("./validator")
const {
  getRolesNames,
  getTeamName,
  containsAnyIds,
  containsAllIds,
} = require("./utils")
const {
  roles,
  doppelgangerInstantActionsIds,
  vampireIds,
  alienIds,
  groobAndZerbIds,
  superVillainsIds,
  werewolvesIds,
  hasMarkIds,
  seerIds,
} = require("./constants")

exports.narration = async (ws, message) => {
  const { room_id } = message
  logTrace(`Narration playing for players in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  const selectedCards = gameState.selected_cards
  const totalPlayers = gameState.players.length
  const rolesFromIds = getRolesNames(
    selectedCards,
    doppelgangerInstantActionsIds,
    roles
  )
  const nostradamusTeam = getTeamName(lastViewedCardId) //TODO
  const oracleQuestion = gameState.oracle_question //todo get oracle_question
  const oracleAnswer = gameState.oracle_answer //todo get oracle_answer also make sure always answer!

  //CARD_SELECTION
  //EVERYONE_CARD
  const hasOracle = selectedCards.includes(50) /* ORACLE_QUESTION &&  */
  /* ORACLE_REACTION && oracle_answer */
  const hasCopycat = selectedCards.includes(30) /* COPYCAT &&  */
  const hasMirrorMan = selectedCards.includes(64) /* MIRROR_MAN &&  */
  const hasDoppelganger = selectedCards.includes(1) /* DOPPELGÄNGER &&  */
  const hasInstantAction = containsAnyIds(selectedCards, doppelgangerInstantActionsIds) /* DOPPELGÄNGER_INSTANT_ACTION &&  */
  //everyonemark() EVERYONE_MARK
  const hasAnyVampire = containsAnyIds(selectedCards, vampireIds) /* VAMPIRES &&  */
  const hasTheCount = selectedCards.includes(39) /* THE_COUNT &&  */
  /* DOPPELGÄNGER_THE_COUNT &&  */
  const hasRenfield = selectedCards.includes(38) /* RENFIELD &&  */
  const hasDiseased = selectedCards.includes(32) /* DISEASED &&  */
  const hasCupid = selectedCards.includes(31) /* CUPID &&  */
  const hasInstigator = selectedCards.includes(34) /* INSTIGATOR &&  */
  const hasPriest = selectedCards.includes(37) /* PRIEST &&  */
  /* DOPPELGÄNGER_PRIEST &&  */
  const hasAssassin = selectedCards.includes(29) /* ASSASSIN &&  */
  /* DOPPELGÄNGER_ASSASSIN &&  */
  const hasApprenticeAssassin = selectedCards.includes(28) /* APPRENTICE_ASSASSIN &&  */
  /* DOPPELGÄNGER_APPRENTICE_ASSASSIN &&  */
  /* LOVERS &&  */
  const hasSentinel = selectedCards.includes(25) /* SENTINEL &&  */
  const hasAnyAlien = containsAnyIds(selectedCards, alienIds) /* ALIENS &&  */
  const hasCow = selectedCards.includes(45) /* COW &&  */
  const hasGroobAndZerb = containsAllIds(selectedCards, groobAndZerbIds) /* GROOB_ZERB &&  */
  const hasLeader = selectedCards.includes(48) /* LEADER &&  */
  /* LEADER_ZERB_GROOB &&  */
  const hasBodySnatcher = selectedCards.includes(74) /* BODY_SNATCHER &&  */
  /* DOPPELGÄNGER_BODY_SNATCHER &&  */
  const hasAnySuperVillains = containsAnyIds(selectedCards, superVillainsIds) /* SUPER_VILLAINS &&  */
  const hasTemptress = selectedCards.includes(69) /* TEMPTRESS &&  */
  const hasDrPeeker = selectedCards.includes(57) /* DR_PEEKER &&  */
  const hasRapscallion = selectedCards.includes(65) /* RAPSCALLION &&  */
  const hasEvilometer = selectedCards.includes(58) /* EVILOMETER &&  */
  const hasAnyWerewolf = containsAnyIds(selectedCards, werewolvesIds) /* WEREWOLVES &&  */
  const hasDreamWolf = selectedCards.includes(21)
  const hasAlphaWolf = selectedCards.includes(17) /* ALPHA_WOLF &&  */
  const hasMysticWolf = selectedCards.includes(22) /* MYSTIC_WOLF &&  */
  const hasMinion = selectedCards.includes(7) /* MINION &&  */
  const hasApprenticeTanner =selectedCards.includes(71) /* APPRENTICE_TANNER &&  */
  const hasTanner = selectedCards.includes(10)
  const hasMadScientist = selectedCards.includes(63) /* MAD_SCIENTIST &&  */
  const hasIntern = selectedCards.includes(62) /* INTERN &&  */
  const hasMasons = containsAllIds(selectedCards, masonIds) || (hasDoppelganger && containsAnyIds(selectedCards, masonIds)) /* MASONS &&  */
  const hasThing = selectedCards.includes(85) /* THING &&  */
  const hasAnnoyingLad = selectedCards.includes(55) /* ANNOYING_LAD */
  const hasSeer = selectedCards.includes(9) /* SEER */
  const hasApprenticeSeer = selectedCards.includes(18) /* APPRENTICE_SEER */
  const hasParanormalInvestigator = selectedCards.includes(23) /* PARANORMAL_INVESTIGATOR */
  const hasMarksman = selectedCards.includes(35) /* MARKSMAN */
  const hasNostradamus = selectedCards.includes(80) /* NOSTRADAMUS */
  /* NOSTRADAMUS_REACTION */
  const hasPsychic = selectedCards.includes(51) /* PSYCHIC */
  /* DOPPELGÄNGER_PSYCHIC */
  const hasDetector = selectedCards.includes(56) /* DETECTOR */
  const hasRobber = selectedCards.includes(8) /* ROBBER */
  const hasWitch = selectedCards.includes(27) /* WITCH */
  const hasPickpocket = selectedCards.includes(36) /* PICKPOCKET */
  const hasRoleRetriever = selectedCards.includes(66) /* ROLE_RETRIEVER */
  const hasVoodooLou = selectedCards.includes(70) /* VOODOO_LOU */
  const hasTroublemaker = selectedCards.includes(11) /* TROUBLEMAKER */
  const hasVillageIdiot = selectedCards.includes(26) /* VILLAGE_IDIOT */
  const hasMarks = containsAnyIds(selectedCards, hasMarkIds)
  const hasAuraSeer = selectedCards.includes(72) /* AURA_SEER */
  const hasGremlin = selectedCards.includes(33) /* GREMLIN */
  const hasRascal = selectedCards.includes(52) /* RASCAL */
  /* DOPPELGÄNGER_RASCAL */
  const hasSwitcheroo = selectedCards.includes(68) /* SWITCHEROO */
  const hasDrunk = selectedCards.includes(2) /* DRUNK */
  const hasInsomniac = selectedCards.includes(4) /* INSOMNIAC */
  const hasSelfAwarenessGirl = selectedCards.includes(67) /* SELF_AWARENESS_GIRL */
  const hasSquire = selectedCards.includes(83) /* SQUIRE */
  const hasBeholder = selectedCards.includes(73) && containsAnyIds(selectedCards, seerIds) /* BEHOLDER */
  const hasRevealer = selectedCards.includes(24) /* REVEALER */
  /* DOPPELGÄNGER_REVEALER */
  const hasExposer = selectedCards.includes(46) /* EXPOSER */
  /* DOPPELGÄNGER_EXPOSER */
  const hasFlipper = selectedCards.includes(59) /* FLIPPER */
  /* DOPPELGÄNGER_FLIPPER */
  const hasEmpath = selectedCards.includes(77) /* EMPATH */
  /* DOPPELGÄNGER_EMPATH */
  const hasCurator = selectedCards.includes(20) /* CURATOR */
  /* DOPPELGÄNGER_CURATOR */
  const hasBlob = selectedCards.includes(44) /* BLOB */
  const hasMortician = selectedCards.includes(49) /* MORTICIAN */
  /* DOPPELGÄNGER_MORTICIAN */
  const hasFamilyMan = selectedCards.includes(78)

  //twilight
  if (hasOracle) return oracle_question()
  if (hasOracle && oracleAnswer) return oracle_reaction(oracleQuestion, oracleAnswer) 
  if (hasCopycat) return copycat()
  if (hasMirrorMan) return mirrorman()
  if (hasDoppelganger) return doppelganger()
  if (hasDoppelganger && hasInstantAction) return doppelganger_instant_action(rolesFromIds)
  //dusk
  if (hasAnyVampire) return vampires()
  if (hasTheCount) return thecount()
  if (hasTheCount && hasDoppelganger) return doppelganger_thecount()
  if (hasRenfield) return renfield(hasDoppelganger)
  if (hasDiseased) return diseased()
  if (hasCupid) return cupid()
  if (hasInstigator) return instigator()
  if (hasPriest) return priest()
  if (hasPriest && hasDoppelganger) return doppelganger_priest()
  if (hasAssassin) return assassin()
  if (hasAssassin && hasDoppelganger) return doppelganger_assassin()
  if (hasApprenticeAssassin) return apprenticeassassin(hasAssassin)
  if (hasApprenticeAssassin && hasDoppelganger) return doppelganger_apprenticeassassin(hasAssassin)
  //night()
  if (hasCupid) return lovers()
  if (hasSentinel) return sentinel()
  if (hasAnyAlien) return aliens(totalPlayers)
  if (hasCow) return cow(hasDoppelganger)
  if (hasGroobAndZerb) return groobzerb(hasDoppelganger)
  if (hasLeader && hasAnyAlien) return leader(hasDoppelganger)
  if (hasLeader && hasGroobAndZerb) return leader_zerbgroob()
  if (hasBodySnatcher) return bodysnatcher()
  if (hasBodySnatcher && hasDoppelganger) return doppelganger_bodysnatcher()
  if (hasAnySuperVillains) return supervillains()
  if (hasTemptress) return temptress()
  if (hasDrPeeker) return drpeeker()
  if (hasRapscallion) return rapscallion()
  if (hasEvilometer) return evilometer(hasDoppelganger)
  if (hasAnyWerewolf) return werewolves(hasDreamWolf)
  if (hasAlphaWolf) return alphawolf()
  if (hasMysticWolf) return mysticwolf()
  if (hasMinion) return minion(hasDoppelganger)
  if (hasApprenticeTanner && hasTanner) return apprenticetanner(hasDoppelganger)
  if (hasMadScientist) return madscientist()
  if (hasIntern) return intern(hasDoppelganger, hasMadScientist)
  if (hasMasons) return masons()
  if (hasThing) return thing()
  if (hasAnnoyingLad) return annoyinglad()
  if (hasSeer) return seer()
  if (hasApprenticeSeer) return apprenticeseer()
  if (hasParanormalInvestigator) return paranormalinvestigator()
  if (hasMarksman) return marksman(hasDoppelganger)
  if (hasNostradamus) return nostradamus()
  if (hasNostradamus) return nostradamus_reaction(nostradamusTeam)
  if (hasPsychic) return psychic()
  if (hasPsychic && hasDoppelganger) return doppelganger_psychic()
  if (hasDetector) return detector()
  if (hasRobber) return robber()
  if (hasWitch) return witch()
  if (hasPickpocket) return pickpocket()
  if (hasPickpocket && hasDoppelganger) return doppelganger_pickpocket()
  if (hasRoleRetriever) return roleretriever()
  if (hasVoodooLou) return voodoolou()
  if (hasTroublemaker) return troublemaker()
  if (hasVillageIdiot) return villageidiot()
  if (hasAuraSeer) return auraseer(hasDoppelganger, hasMarks)
  if (hasGremlin) return gremlin()
  if (hasGremlin && hasDoppelganger) return doppelganger_gremlin()
  if (hasRascal) return rascal()
  if (hasRascal && hasDoppelganger) return doppelganger_rascal()
  if (hasSwitcheroo) return switcheroo()
  if (hasDrunk) return drunk()
  if (hasInsomniac) return insomniac(hasDoppelganger)
  if (hasSelfAwarenessGirl) return selfawarenessgirl(hasDoppelganger)
  if (hasSquire) return squire(hasDoppelganger)
  if (hasBeholder) return beholder(hasSeer, hasApprenticeSeer, hasDoppelganger)
  if (hasRevealer) return revealer()
  if (hasRevealer && hasDoppelganger) return doppelganger_revealer()
  if (hasExposer) return exposer()
  if (hasExposer && hasDoppelganger) return doppelganger_exposer()
  if (hasFlipper) return flipper()
  if (hasFlipper && hasDoppelganger) return doppelganger_flipper()
  if (hasEmpath) return empath(totalPlayers)
  if (hasEmpath && hasDoppelganger) return doppelganger_empath(totalPlayers)
  if (hasCurator) return curator()
  if (hasCurator && hasDoppelganger) return doppelganger_curator()
  if (hasBlob) return blob()
  if (hasMortician) return mortician()
  if (hasMortician && hasDoppelganger) return doppelganger_mortician()
  if (hasFamilyMan) return familyman(hasDoppelganger)
}
