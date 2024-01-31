const { oracle, oracle_reaction } = require("./oracle")
const { copycat, copycat_reaction} = require("./copycat")
const { mirrorman, mirrorman_reaction } = require("./mirrorman")
const { doppelganger, doppelganger_reaction, doppelganger_instant_action } = require("./doppelganger")
const { vampires, vampires_reaction } = require("./vampires")
const { thecount, thecount_reaction } = require("./thecount")
const { renfield } = require("./renfield")
const { diseased, diseased_reaction } = require("./diseased")
const { cupid, cupid_reaction } = require("./cupid")
const { instigator, instigator_reaction } = require("./instigator")
const { priest, doppelganger_priest } = require("./priest")
const { assassin, doppelganger_assassin } = require("./assassin")
const { apprenticeassassin, doppelganger_apprenticeassassin } = require("./apprenticeassassin")
const { everyonemark } = require("./everyonemark")
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
const { werewolves, werewolves_response }  = require("./werewolves")
const { alphawolf, alphawolf_response } = require("./alphawolf")
const { mysticwolf, mysticwolf_response } = require("./mysticwolf")
const { minion } = require("./minion")
const { apprenticetanner } = require("./apprenticetanner")
const { madscientist } = require("./madscientist")
const { intern } = require("./intern")
const { masons } = require("./masons")
const { thing } = require("./thing")
const { annoyinglad } = require("./annoyinglad")
const { seer, seer_response } = require("./seer")
const { apprenticeseer, apprenticeseer_response } = require("./apprenticeseer")
const { paranormalinvestigator } = require("./paranormalinvestigator")
const { marksman } = require("./marksman")
const { nostradamus, nostradamus_reaction } = require("./nostradamus")
const { psychic } = require("./psychic")
const { detector } = require("./detector")
const { robber, robber_response } = require("./robber")
const { witch } = require("./witch")
const { pickpocket, doppelganger_pickpocket } = require("./pickpocket")
const { roleretriever } = require("./roleretriever")
const { voodoolou } = require("./voodoolou")
const { troublemaker, troublemaker_response } = require("./troublemaker")
const { villageidiot } = require("./villageidiot")
const { auraseer } = require("./auraseer")
const { gremlin, doppelganger_gremlin } = require("./gremlin")
const { rascal, doppelganger_rascal } = require("./rascal")
const { switcheroo } = require("./switcheroo")
const { drunk, drunk_response } = require("./drunk")
const { insomniac } = require("./insomniac")
const { selfawarenessgirl } = require("./selfawarenessgirl")
const { squire } = require("./squire")
const { beholder } = require("./beholder")
const { revealer, doppelganger_revealer } = require("./revealer")
const { exposer, doppelganger_exposer } = require("./exposer")
const { flipper, doppelganger_flipper } = require("./flipper")
const { empath, doppelganger_empath } = require("./empath")
const { curator, doppelganger_curator } = require("./curator")
const { blob } = require("./blob")
const { mortician, doppelganger_mortician } = require("./mortician")
const { familyman } = require("./familyman")

exports.roles = {
  /* T W I L L I G H T  */
  oracle, oracle_reaction,
  copycat, copycat_reaction,
  mirrorman, mirrorman_reaction,
  doppelganger, doppelganger_reaction, doppelganger_instant_action,
  /*  D U S K */
  vampires, vampires_reaction,
  thecount, thecount_reaction,
  renfield,
  diseased, diseased_reaction,
  cupid, cupid_reaction,
  instigator, instigator_reaction,
  priest,
  doppelganger_priest,
  assassin,
  doppelganger_assassin,
  apprenticeassassin,
  doppelganger_apprenticeassassin,
  everyonemark,
  /*  N I G H T */
  lovers,
  sentinel,
  aliens,
  cow,
  groobzerb,
  leader,
  bodysnatcher,
  doppelganger_bodysnatcher,
  supervillains,
  temptress,
  drpeeker,
  rapscallion,
  evilometer,
  werewolves,
  werewolves_response,
  alphawolf,
  alphawolf_response,
  mysticwolf,
  mysticwolf_response,
  minion,
  apprenticetanner,
  madscientist,
  intern,
  masons,
  thing,
  annoyinglad,
  seer,
  seer_response,
  apprenticeseer,
  apprenticeseer_response,
  paranormalinvestigator,
  marksman,
  nostradamus,
  nostradamus_reaction,
  psychic,
  detector,
  robber,
  robber_response,
  witch,
  pickpocket,
  doppelganger_pickpocket,
  roleretriever,
  voodoolou,
  troublemaker,
  troublemaker_response,
  villageidiot,
  auraseer,
  gremlin,
  doppelganger_gremlin,
  rascal,
  doppelganger_rascal,
  switcheroo,
  drunk,
  drunk_response,
  insomniac,
  selfawarenessgirl,
  squire,
  beholder,
  revealer,
  doppelganger_revealer,
  exposer,
  doppelganger_exposer,
  flipper,
  doppelganger_flipper,
  empath,
  doppelganger_empath,
  curator,
  doppelganger_curator,
  blob,
  mortician,
  doppelganger_mortician,
  familyman,
  /*  R I P P L E */
  //const { ripple: require("./ripple")
  /*  D A Y */
  //TODO vote
}
