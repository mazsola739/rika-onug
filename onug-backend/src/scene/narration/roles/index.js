const { joke }                                                = require("./joke") //random
const { epicbattle }                                          = require("./epicbattle") //random

const { oracle_question, oracle_reaction }                    = require("./oracle") //random
const { copycat }                                             = require("./copycat")
const { mirrorman }                                           = require("./mirrorman")
const { doppelganger, doppelganger_instant_action }           = require("./doppelganger")
const { vampires }                                            = require("./vampires")
const { thecount, doppelganger_thecount }                     = require("./thecount")
const { renfield }                                            = require("./renfield")
const { diseased }                                            = require("./diseased")
const { cupid }                                               = require("./cupid")
const { instigator }                                          = require("./instigator")
const { priest, doppelganger_priest }                         = require("./priest")
const { assassin, doppelganger_assassin }                     = require("./assassin")
const { apprenticeassassin, doppelganger_apprenticeassassin } = require("./apprenticeassassin")
const { everyonemark }                                        = require("./everyonemark")
const { lovers }                                              = require("./lovers")
const { sentinel }                                            = require("./sentinel")
const { aliens }                                              = require("./aliens")
const { cow }                                                 = require("./cow")
const { groobzerb }                                           = require("./groobzerb")
const { leader }                                              = require("./leader")
const { bodysnatcher, doppelganger_bodysnatcher }             = require("./bodysnatcher")
const { supervillains }                                       = require("./supervillains")
const { temptress }                                           = require("./temptress")
const { drpeeker }                                            = require("./drpeeker")
const { rapscallion }                                         = require("./rapscallion")
const { evilometer }                                          = require("./evilometer")
const { werewolves }                                          = require("./werewolves")
const { alphawolf }                                           = require("./alphawolf")
const { mysticwolf }                                          = require("./mysticwolf")
const { minion }                                              = require("./minion")
const { apprenticetanner }                                    = require("./apprenticetanner")
const { madscientist }                                        = require("./madscientist")
const { intern }                                              = require("./intern")
const { masons }                                              = require("./masons")
const { thing }                                               = require("./thing")
const { annoyinglad }                                         = require("./annoyinglad")
const { seer }                                                = require("./seer")
const { apprenticeseer }                                      = require("./apprenticeseer")
const { paranormalinvestigator }                              = require("./paranormalinvestigator")
const { marksman }                                            = require("./marksman")
const { nostradamus, nostradamus_reaction }                   = require("./nostradamus")
const { psychic }                                             = require("./psychic")
const { detector }                                            = require("./detector")
const { robber }                                              = require("./robber")
const { witch }                                               = require("./witch")
const { pickpocket, doppelganger_pickpocket }                 = require("./pickpocket")
const { roleretriever }                                       = require("./roleretriever")
const { voodoolou }                                           = require("./voodoolou")
const { troublemaker }                                        = require("./troublemaker")
const { villageidiot }                                        = require("./villageidiot")
const { auraseer }                                            = require("./auraseer")
const { gremlin, doppelganger_gremlin }                       = require("./gremlin")
const { rascal, doppelganger_rascal }                         = require("./rascal")
const { switcheroo }                                          = require("./switcheroo")
const { drunk }                                               = require("./drunk")
const { insomniac }                                           = require("./insomniac")
const { selfawarenessgirl }                                   = require("./selfawarenessgirl")
const { squire }                                              = require("./squire")
const { beholder }                                            = require("./beholder")
const { revealer, doppelganger_revealer }                     = require("./revealer")
const { exposer, doppelganger_exposer }                       = require("./exposer")
const { flipper, doppelganger_flipper }                       = require("./flipper")
const { empath, doppelganger_empath }                         = require("./empath")
const { curator, doppelganger_curator }                       = require("./curator")
const { blob }                                                = require("./blob")
const { mortician, doppelganger_mortician }                   = require("./mortician")
const { familyman }                                           = require("./familyman")

const { ripple }                                              = require("./ripple") //TODO do we have ripple?

exports.roles = {
  joke,
  epicbattle,
  oracle_question, oracle_reaction,
  copycat,
  mirrorman,
  doppelganger, doppelganger_instant_action,
  vampires,
  thecount, doppelganger_thecount,
  renfield,
  diseased,
  cupid,
  instigator,
  priest, doppelganger_priest,
  assassin, doppelganger_assassin,
  apprenticeassassin, doppelganger_apprenticeassassin,
  everyonemark,
  lovers,
  sentinel,
  aliens,
  cow,
  groobzerb,
  leader,
  bodysnatcher, doppelganger_bodysnatcher,
  supervillains,
  temptress,
  drpeeker,
  rapscallion,
  evilometer,
  werewolves,
  alphawolf,
  mysticwolf,
  minion,
  apprenticetanner,
  madscientist,
  intern,
  masons,
  thing,
  annoyinglad,
  seer,
  apprenticeseer,
  paranormalinvestigator,
  marksman,
  nostradamus, nostradamus_reaction,
  psychic,
  detector,
  robber,
  witch,
  pickpocket, doppelganger_pickpocket,
  roleretriever,
  voodoolou,
  troublemaker,
  villageidiot,
  auraseer,
  gremlin, doppelganger_gremlin,
  rascal, doppelganger_rascal,
  switcheroo,
  drunk,
  insomniac,
  selfawarenessgirl,
  squire,
  beholder,
  revealer, doppelganger_revealer,
  exposer, doppelganger_exposer,
  flipper, doppelganger_flipper,
  empath, doppelganger_empath,
  curator, doppelganger_curator,
  blob,
  mortician, doppelganger_mortician,
  familyman,
  ripple,
  //TODO vote
}
