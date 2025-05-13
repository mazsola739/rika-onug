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
  alien_neighbor,
  answer_options,
  apprenticeassassins,
  assassins,
  auraseer,
  cow,
  direction,
  dreamwolf,
  empath_vote,
  evilometer,
  groob,
  groobzerb,
  lovers,
  madscientist,
  mark_of_assassin,
  mark_of_bat,
  mark_of_clarity,
  mark_of_disease,
  mark_of_fear,
  mark_of_love,
  mark_of_traitor,
  mark_of_vampire,
  masons,
  new_alien, BE
  new_alien_helper, BE
  new_artifact_card,
  new_shield_card,
  new_vampire,
  new_villain,
  new_werwolf,
  obligatory,
  part_of_blob,
  part_of_family,
  random,
  scene_end,
  seers,
  selectable_cards,
  selectable_card_limit,
  selectable_marks,
  selectable_mark_limit,
  selected_answer,
  selected_card_positions, //TODO save it in validator? cut the right size after the limit check?
  selected_center_card,
  selected_mark_positions, //TODO save it in validator? cut the right size after the limit check?
  show_cards,
  show_marks,
  swapped_cards,
  swapped_marks,
  tapped,
  tanner,
  villains,
  villain_neighbor,
  vampires,
  vote,
  werewolves,
  zerb
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
