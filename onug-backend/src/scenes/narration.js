/*  T W I L L I G H T  */
//const { everyonecard } = require("./everyonecard")
const { oracle_question, oracle_reaction } = require("./oracle")
const { copycat } = require("./copycat")
const { mirrorman } = require("./mirrorman")
const { doppelganger, doppelganger_instant_action } = require("./doppelganger")
/*  D U S K */
const { vampires } = require("./vampires")
const { thecount, doppelganger_thecount } = require("./thecount")
const { renfield } = require("./renfield")
const { diseased } = require("./diseased")
const { cupid } = require("./cupid")
const { instigator } = require("./instigator")
const { priest, doppelganger_priest } = require("./priest")
const { assassin, doppelganger_assassin } = require("./assassin")
const {
  apprenticeassassin,
  doppelganger_apprenticeassassin_kickoff_text,
} = require("./apprenticeassassin")
//const { everyonemark } = require("./everyonemark")
/*  N I G H T */
const { lovers } = require("./lovers")
const { sentinel } = require("./sentinel")
const { aliens } = require("./aliens")
const { cow } = require("./cow")
const { groobzerb } = require("./groobzerb")
const { leader } = require("./leader")
const { bodysnatcher, doppelganger_bodysnatcher } = require("./bodysnatcher")
const { supervillains } = require("./supervillains")
const { temptress } = require("./temptress")
const { drpeeker } = require("./drpeeker")
const { rapscallion } = require("./rapscallion")
const { evilometer } = require("./evilometer")
const { werewolves } = require("./werewolves")
const { alphawolf } = require("./alphawolf")
const { mysticwolf } = require("./mysticwolf")
const { minion } = require("./minion")
const { apprenticetanner } = require("./apprenticetanner")
const { madscientist } = require("./madscientist")
const { intern } = require("./intern")
const { masons } = require("./masons")
const { thing } = require("./thing")
const { annoyinglad } = require("./annoyinglad")
const { seer } = require("./seer")
const { apprenticeseer } = require("./apprenticeseer")
const { paranormalinvestigator } = require("./paranormalinvestigator")
const { marksman } = require("./marksman")
const { nostradamus, nostradamus_reaction } = require("./nostradamus")
const { psychic } = require("./psychic")
const { detector } = require("./detector")
const { robber } = require("./robber")
const { witch } = require("./witch")
const { pickpocket, doppelganger_pickpocket } = require("./pickpocket")
const { roleretriever } = require("./roleretriever")
const { voodoolou } = require("./voodoolou")
const { troublemaker } = require("./troublemaker")
const { villageidiot } = require("./villageidiot")
const { auraseer } = require("./auraseer")
const { gremlin, doppelganger_gremlin } = require("./gremlin")
const { rascal, doppelganger_rascal } = require("./rascal")
const { switcheroo } = require("./switcheroo")
const { drunk } = require("./drunk")
const { insomniac } = require("./insomniac")
const { selfawarenessgirl } = require("./selfawarenessgirl")
const { squire } = require("./squire")
const { beholder } = require("./beholder")
const { revealer, doppelganger_revealer } = require("./revealer")
const { exposer, doppelganger_exposer } = require("./exposer")
const { flipper, doppelganger_flipper } = require("./flipper")
const { empath } = require("./empath")
const { curator } = require("./curator")
const { blob } = require("./blob")
const { mortician } = require("./mortician")
const { familyman } = require("./familyman")
/*  R I P P L E */
//const { ripple } = require("./ripple")
/*  D A Y */
//TODO vote

const { validateRoom } = require("../validator")
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
  if (hasOracle && oracle_answer) return oracle_reaction() //todo get oracle_answer
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
  if (hasApprenticeAssassin && hasDoppelganger) return doppelganger_apprenticeassassin_kickoff_text(hasAssassin)
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
