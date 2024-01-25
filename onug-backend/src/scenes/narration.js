const {
  aliens,
  alphawolf,
  annoyinglad,
  apprenticeassassin,
  apprenticeseer,
  apprenticetanner,
  assassin,
  auraseer,
  beholder,
  bodysnatcher,
  blob,
  copycat,
  cow,
  cupid,
  curator,
  diseased,
  doppelganger,
  drpeeker,
  drunk,
  detector,
  empath,
  evilometer,
  exposer,
  familyman,
  flipper,
  gremlin,
  groobzerb,
  insomniac,
  instigator,
  intern,
  leader,
  lovers,
  madscientist,
  marksman,
  masons,
  minion,
  mirrorman,
  mortician,
  mysticwolf,
  nostradamus,
  oracle,
  paranormalinvestigator,
  pickpocket,
  priest,
  psychic,
  rapscallion,
  rascal,
  renfield,
  revealer,
  robber,
  roleretriever,
  seer,
  selfawarenessgirl,
  sentinel,
  squire,
  supervillains,
  switcheroo,
  temptress,
  thecount,
  thing,
  troublemaker,
  vampires,
  villageidiot,
  voodoolou,
  werewolves,
  witch,
} = require(".")

const { validateRoom } = require("../validator")

const containsAllIds = (selectedCardIds, roleIds) => {
  return roleIds.every((cardId) => selectedCardIds.includes(cardId))
}
const containsAnyIds = (selectedCardIds, roleIds) => {
  return roleIds.some((cardId) => selectedCardIds.includes(cardId))
}

exports.narration = async (ws, message) => {
  const { room_id } = message
  logTrace(`Narration playing for players in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  const selectedCards = gameState.selected_cards
  //twilight
  if (containsAllIds(selectedCards, [50])) return oracle()
  if (containsAllIds(selectedCards, [30])) return copycat()
  if (containsAllIds(selectedCards, [64])) return mirrorman()
  if (containsAllIds(selectedCards, [1])) return doppelganger()
  //dusk
  if (containsAllIds(selectedCards, [39, 40, 41])) return vampires()
  if (containsAllIds(selectedCards, [39])) return thecount()
  if (containsAllIds(selectedCards, [38])) return renfield()
  if (containsAllIds(selectedCards, [32])) return diseased()
  if (containsAllIds(selectedCards, [31])) return cupid()
  if (containsAllIds(selectedCards, [34])) return instigator()
  if (containsAllIds(selectedCards, [37])) return priest()
  if (containsAllIds(selectedCards, [29])) return assassin()
  if (containsAllIds(selectedCards, [28])) return apprenticeassassin()
  //everyonemark()
  //night()
  if (containsAllIds(selectedCards, ["mark of love"])) return lovers()
  if (containsAllIds(selectedCards, [25])) return sentinel()
  if (containsAllIds(selectedCards, [42, 43, 47, 53, 54, 74])) return aliens()
  if (containsAllIds(selectedCards, [45])) return cow()
  if (containsAllIds(selectedCards, [[47, 54]])) return groobzerb()
  if (containsAllIds(selectedCards, [48])) return leader()
  if (containsAllIds(selectedCards, [74])) return bodysnatcher()
  if (containsAllIds(selectedCards, [57, 60, 65, 69])) return supervillains()
  if (containsAllIds(selectedCards, [69])) return temptress()
  if (containsAllIds(selectedCards, [57])) return drpeeker()
  if (containsAllIds(selectedCards, [65])) return rapscallion()
  if (containsAllIds(selectedCards, [58])) return evilometer()
  if (containsAllIds(selectedCards, [15, 16, 17, 22])) return werewolves()
  if (containsAllIds(selectedCards, [17])) return alphawolf()
  if (containsAllIds(selectedCards, [22])) return mysticwolf()
  if (containsAllIds(selectedCards, [7])) return minion()
  if (containsAllIds(selectedCards, [71])) return apprenticetanner()
  if (containsAllIds(selectedCards, [63])) return madscientist()
  if (containsAllIds(selectedCards, [62])) return intern()
  if (containsAllIds(selectedCards, [5, 6])) return masons()
  if (containsAllIds(selectedCards, [85])) return thing()
  if (containsAllIds(selectedCards, [55])) return annoyinglad()
  if (containsAllIds(selectedCards, [9])) return seer()
  if (containsAllIds(selectedCards, [18])) return apprenticeseer()
  if (containsAllIds(selectedCards, [23])) return paranormalinvestigator()
  if (containsAllIds(selectedCards, [35])) return marksman()
  if (containsAllIds(selectedCards, [80])) return nostradamus()
  if (containsAllIds(selectedCards, [51])) return psychic()
  if (containsAllIds(selectedCards, [56])) return detector()
  if (containsAllIds(selectedCards, [8])) return robber()
  if (containsAllIds(selectedCards, [27])) return witch()
  if (containsAllIds(selectedCards, [36])) return pickpocket()
  if (containsAllIds(selectedCards, [66])) return roleretriever()
  if (containsAllIds(selectedCards, [70])) return voodoolou()
  if (containsAllIds(selectedCards, [11])) return troublemaker()
  if (containsAllIds(selectedCards, [26])) return villageidiot()
  if (containsAllIds(selectedCards, [72])) return auraseer()
  if (containsAllIds(selectedCards, [33])) return gremlin()
  if (containsAllIds(selectedCards, [52])) return rascal()
  if (containsAllIds(selectedCards, [68])) return switcheroo()
  if (containsAllIds(selectedCards, [2])) return drunk()
  if (containsAllIds(selectedCards, [4])) return insomniac()
  if (containsAllIds(selectedCards, [67])) return selfawarenessgirl()
  if (containsAllIds(selectedCards, [83])) return squire()
  if (containsAllIds(selectedCards, [73])) return beholder()
  if (containsAllIds(selectedCards, [24])) return revealer()
  if (containsAllIds(selectedCards, [46])) return exposer()
  if (containsAllIds(selectedCards, [59])) return flipper()
  if (containsAllIds(selectedCards, [77])) return empath()
  if (containsAllIds(selectedCards, [20])) return curator()
  if (containsAllIds(selectedCards, [44])) return blob()
  if (containsAllIds(selectedCards, [49])) return mortician()
  if (containsAllIds(selectedCards, [78])) return familyman()

  return "blabla"
}
