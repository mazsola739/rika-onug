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

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(newGamestate.players, 'currentPlayer', [], token)[0]
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

export const generateRoleAction = (
  gamestate,
  token,
  title,
  { private_message, selectableCards = {}, selectableMarks = {}, showCards = [], showMarks = [], obligatory = false, scene_end = false, uniqueInformation = {} }
) => {
  let newGamestate = updatePlayerCard(gamestate, token)
  const flippedCards = newGamestate.positions.flipped_cards
  const show_cards = showCards !== null ? combineUniqueObjects(showCards, flippedCards) : flippedCards
  const show_marks = showMarks

  /* TODO gamestate.players[token].player_history[title]
  aliens, 
  cow,
  vote, 
  new_alien, 
  new_alien_helper,
  viewed_cards, 
  swapped_cards, 
  assassins, 
  mark_of_assassin, 
  tanner, 
  apprenticeassassins,
  auraseer,
  answer_options,
  seers,
  part_of_blob,
  alien_neighbor,
  mark_of_love,
  new_artifact_card,
  mark_of_disease,
  shielded,
  empath_vote,
  viewed_marks,
  villain_neighbor,
  flipped_cards,
  part_of_family,
  swapped_marks
  groobzerb,
  zerb,
  groob,
  mark_of_traitor,
  madscientist,
  lovers,
  masons,
  werewolves,
  mark_of_clarity,
  random,
  direction,
  new_vampire,
  mark_of_bat,
  vampires,
  new_shield_card,
  villains,
  evilometer,
  mark_of_fear,
  mark_of_vampire,
  dreamwolf,
  selected_center_card
   */

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
