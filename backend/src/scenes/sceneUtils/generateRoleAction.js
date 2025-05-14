import { getPlayerNumbersByGivenConditions } from '.'
import { getKeys, isActivePlayersCardsFlipped, isPlayersCardsFlipped } from '../../utils/council.util'

const combineUniqueObjects = (array1, array2) => {
  const uniqueSet = new Set()

  const combinedArray = [...array1, ...array2]
  return combinedArray.filter(obj => {
    const keyValuePair = JSON.stringify(obj)
    if (!uniqueSet.has(keyValuePair)) {
      uniqueSet.add(keyValuePair)
      return true
    }
    return false
  })
}

const updatePlayerHistory = (gamestate, token, title, updates) => {
  const newGamestate = { ...gamestate }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...updates
  }

  return newGamestate
}

const updatePlayerCard = (gamestate, token) => {
  const newGamestate = { ...gamestate }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(newGamestate, 'currentPlayer', token)[0]
  const currentPlayerKnownCard = newGamestate.players[token].card
  const currentPlayerCard = newGamestate.positions.card_positions[currentPlayerNumber].card

  if (!currentPlayerKnownCard || !currentPlayerCard) return

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGamestate.positions.flipped_cards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGamestate.positions.flipped_cards, currentPlayerKnownCard.player_card_id)

  if (iSeeMyCardIsFlipped) {
    newGamestate.players[token].card.player_card_id = currentPlayerCard.id
    newGamestate.players[token].card.player_role = currentPlayerCard.role
    newGamestate.players[token].card.player_team = currentPlayerCard.team
  }

  if (iSeeMyCardElsewhere) {
    newGamestate.players[token].card.player_card_id = 87
  }

  return newGamestate
}

export const generateRoleAction = (gamestate, token, title, {  private_message, selectableCards = {}, selectableMarks = {}, showCards = [], showMarks = [], obligatory = false, scene_end = false, uniqueInformation = {} }
) => {
  let newGamestate = updatePlayerCard(gamestate, token)
  const flippedCards = newGamestate.positions.flipped_cards
  const show_cards = showCards !== null ? combineUniqueObjects(showCards, flippedCards) : flippedCards
  const show_marks = showMarks

  const historyParts = {
    show_cards,
    show_marks,
    obligatory,
    scene_end,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformation
  }
  newGamestate = updatePlayerHistory(newGamestate, token, title, historyParts)

  const information = {
    shielded_cards: newGamestate.positions.shielded_cards,
    artifacted_cards: getKeys(newGamestate.positions.artifacted_cards),
    ...historyParts
  }

  return {
    private_message,
    ...information
  }
}

/* 
const updatePlayerHistory_ = (gamestate, token, title, updates) => {
  const playerHistory = gamestate.players[token].player_history
  gamestate.players[token].player_history[title] = {
    ...playerHistory[title],
    ...updates
  }
}

const updatePlayerCard_ = (gamestate, token) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  const currentPlayerKnownCard = gamestate.players[token].card
  const currentPlayerCard = gamestate.positions.card_positions[currentPlayerNumber].card

  if (!currentPlayerKnownCard || !currentPlayerCard) return

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(gamestate.positions.flipped_cards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(gamestate.positions.flipped_cards, currentPlayerKnownCard.player_card_id)

  if (iSeeMyCardIsFlipped) {
    gamestate.players[token].card.player_card_id = currentPlayerCard.id
    gamestate.players[token].card.player_role = currentPlayerCard.role
    gamestate.players[token].card.player_team = currentPlayerCard.team
  }

  if (iSeeMyCardElsewhere) {
    gamestate.players[token].card.player_card_id = 87
  }
}

export const generateRoleAction_ = (gamestate, token, title, privateMessage, actionDetails = {}, obligatory = false, scene_end = false) => {
  updatePlayerCard_(gamestate, token)

  const { aliens = [], answer_options = [], apprenticeassassins = [], assassins = [], auraseer = [], cow = [], dreamwolf = [], evilometer = [], groob = [], groobzerb = [], lovers = [], madscientist = [], masons = [], part_of_blob = [], part_of_family = [], random = [], seers = [], selectableCards = {}, selectableMarks = {}, selected_center_card = '', showCards = [], showMarks = [], swapped_cards = [], swapped_marks = [], tanner = [], villains = [], vampires = [], vote = [], werewolves = [], zerb = [] } = actionDetails
  const { selectable_cards = [], selectable_card_limit = {} } = selectableCards
  const { selectable_marks = [], selectable_mark_limit = {} } = selectableMarks
  const flipped_cards = gamestate.positions.flipped_cards
  const show_cards = showCards !== null ? combineUniqueObjects(showCards, flipped_cards) : flipped_cards
  const show_marks = showMarks
  const shielded_cards = gamestate.positions.shielded_cards
  const artifacted_cards = getKeys(gamestate.positions.artifacted_cards)

  const rawActionDetails = { aliens, answer_options, apprenticeassassins, assassins, auraseer, cow, dreamwolf, evilometer, groob, groobzerb, lovers, madscientist, masons, part_of_blob, part_of_family, random, seers, selectableCards, selectableMarks, selected_center_card, show_cards, show_marks, swapped_cards, swapped_marks, tanner, villains, vampires, vote, werewolves, zerb, obligatory, scene_end, selectable_cards, selectable_card_limit, selectable_marks, selectable_mark_limit, shielded_cards, artifacted_cards }

  const filteredAcrtionDetails = Object.entries(rawActionDetails).reduce((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      acc[key] = value
    } else if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
      acc[key] = value 
    } else if (value !== null && value !== undefined && value !== '') {
      acc[key] = value 
    }
    return acc
  }, {})

  updatePlayerHistory_(gamestate, token, title, filteredAcrtionDetails)

  return {
    private_message: privateMessage,
    ...filteredAcrtionDetails
  }
}

aliens,
answer_options,
apprenticeassassins,
assassins,
auraseer,
cow,
dreamwolf,
evilometer,
groob,
groobzerb,
lovers,
madscientist,
masons,
obligatory,
part_of_blob,
part_of_family,
random,
scene_end,
seers,
selectableCards,
selectableMarks,
selectable_cards,
selectable_card_limit,
selectable_marks,
selectable_mark_limit,
selected_center_card,
showCards,
showMarks,
show_cards,
show_marks,
swapped_cards,
swapped_marks,
tanner,
villains,
vampires,
vote,
werewolves,
zerb


  const actionDetails = { aliens, answer_options, apprenticeassassins, assassins, auraseer, cow, dreamwolf, evilometer, groob, groobzerb, lovers, madscientist, masons, part_of_blob, part_of_family, random, seers, selectableCards, selectableMarks, selected_center_card, showCards, showMarks, swapped_cards, swapped_marks, tanner, villains, vampires, vote, werewolves, zerb }
*/
