const { oracle, oracle_response }                                 = require("./oracle")
const { copycat, copycat_response}                                = require("./copycat")
const { doppelganger, doppelganger_response }                     = require("./doppelganger")
const { vampires, vampires_response }                             = require("./vampires")
const { thecount, doppelganger_thecount, thecount_response }      = require("./thecount")
const { renfield }                                                = require("./renfield")
const { diseased, diseased_response }                             = require("./diseased")
const { cupid, cupid_response }                                   = require("./cupid")
const { instigator, instigator_response }                         = require("./instigator")
const { priest, doppelganger_priest }                             = require("./priest")
const { assassin, doppelganger_assassin }                         = require("./assassin")
const { apprenticeassassin, doppelganger_apprenticeassassin }     = require("./apprenticeassassin")
const { everyonemark }                                            = require("./everyonemark")
const { lovers }                                                  = require("./lovers")
const { sentinel, sentinel_response }                             = require("./sentinel")
const { aliens }                                                  = require("./aliens") //random
const { cow }                                                     = require("./cow")
const { groobzerb }                                               = require("./groobzerb")
const { leader, leader_zerbgroob }                                = require("./leader")
const { bodysnatcher, doppelganger_bodysnatcher }                 = require("./bodysnatcher")
const { supervillains }                                           = require("./supervillains")
const { temptress, temptress_response }                           = require("./temptress")
const { drpeeker, drpeeker_response }                             = require("./drpeeker")
const { rapscallion, rapscallion_response }                       = require("./rapscallion")
const { evilometer }                                              = require("./evilometer")
const { werewolves, werewolves_response }                         = require("./werewolves")
const { alphawolf, alphawolf_response }                           = require("./alphawolf")
const { mysticwolf, mysticwolf_response }                         = require("./mysticwolf")
const { minion }                                                  = require("./minion")
const { apprenticetanner }                                        = require("./apprenticetanner")
const { intern }                                                  = require("./intern")
const { masons }                                                  = require("./masons")
const { thing, thing_response }                                   = require("./thing")
const { seer, seer_response }                                     = require("./seer")
const { apprenticeseer, apprenticeseer_response }                 = require("./apprenticeseer")
const { paranormalinvestigator, paranormalinvestigator_response } = require("./paranormalinvestigator")
const { marksman }                                                = require("./marksman")
const { nostradamus, nostradamus_response }                       = require("./nostradamus")
const { psychic }                                                 = require("./psychic")
const { robber, robber_response }                                 = require("./robber")
const { witch, witch_response }                                   = require("./witch")
const { pickpocket, doppelganger_pickpocket }                     = require("./pickpocket")
const { troublemaker, troublemaker_response }                     = require("./troublemaker")
const { villageidiot }                                            = require("./villageidiot")
const { auraseer }                                                = require("./auraseer")
const { gremlin, doppelganger_gremlin }                           = require("./gremlin")
const { rascal, doppelganger_rascal }                             = require("./rascal")
const { drunk, drunk_response }                                   = require("./drunk")
const { insomniac }                                               = require("./insomniac")
const { squire }                                                  = require("./squire")
const { beholder }                                                = require("./beholder")
const { revealer, revealer_response }                             = require("./revealer")
const { exposer, doppelganger_exposer }                           = require("./exposer")
const { empath, doppelganger_empath }                             = require("./empath")
const { curator, curator_response }                               = require("./curator")
const { blob }                                                    = require("./blob")
const { mortician, doppelganger_mortician }                       = require("./mortician")
const { familyman }                                               = require("./familyman")

exports.roles = {
  oracle, oracle_response,
  copycat, copycat_response,
  doppelganger, doppelganger_response,
  vampires, vampires_response,
  thecount, doppelganger_thecount, thecount_response,
  renfield,
  diseased, diseased_response,
  cupid, cupid_response,
  instigator, instigator_response,
  priest,
  doppelganger_priest,
  assassin,
  doppelganger_assassin,
  apprenticeassassin,
  doppelganger_apprenticeassassin,
  everyonemark,
  lovers,
  sentinel, sentinel_response,
  aliens,
  cow,
  groobzerb,
  leader, leader_zerbgroob,
  bodysnatcher,
  doppelganger_bodysnatcher,
  supervillains,
  temptress, temptress_response,
  drpeeker, drpeeker_response,
  rapscallion, rapscallion_response,
  evilometer,
  werewolves, werewolves_response,
  alphawolf, alphawolf_response,
  mysticwolf, mysticwolf_response,
  minion,
  apprenticetanner,
  intern,
  masons,
  thing, thing_response,
  seer, seer_response,
  apprenticeseer, apprenticeseer_response,
  paranormalinvestigator, paranormalinvestigator_response,
  marksman,
  nostradamus, nostradamus_response,
  psychic,
  robber, robber_response,
  witch, witch_response,
  pickpocket, doppelganger_pickpocket,
  troublemaker, troublemaker_response,
  villageidiot,
  auraseer,
  gremlin, doppelganger_gremlin,
  rascal, doppelganger_rascal,
  drunk, drunk_response,
  insomniac,
  squire,
  beholder,
  revealer, revealer_response,
  exposer, doppelganger_exposer,
  empath, doppelganger_empath,
  curator, curator_response,
  blob,
  mortician, doppelganger_mortician,
  familyman,
  //const { ripple: require("./ripple")
  //TODO vote
}
