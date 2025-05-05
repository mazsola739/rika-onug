import { getPlayerNumberWithMatchingToken } from '.'
import { getKeys, isActivePlayersCardsFlipped, isPlayersCardsFlipped } from '../../utils/council.util'

//TODO fix history update, combine with card update?
export const updatePlayerHistory = (gamestate, token, title, updates) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    ...updates
  }
}

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

const updatePlayerCard = (gamestate, token) => {
  let newGamestate = { ...gamestate }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const flippedCards = newGamestate.positions.flipped_cards

  const playerCard = newGamestate.players[token].card
  const currentCard = newGamestate.positions.card_positions[currentPlayerNumber].card

  if (!playerCard || !currentCard) return

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, playerCard.player_card_id)

  if (iSeeMyCardIsFlipped) {
    newGamestate.players[token].card.player_card_id = currentCard.id
    newGamestate.players[token].card.player_role = currentCard.role
    newGamestate.players[token].card.player_team = currentCard.team
  }

  if (iSeeMyCardElsewhere) {
    newGamestate.players[token].card.player_card_id = 87
  }

  return newGamestate
}

export const generateRoleAction = (
  gamestate,
  token,
  { private_message, selectableCards = {}, selectableMarks = {}, showCards = [], showMarks = [], obligatory = false, scene_end = false, uniqueInformation = {} }
) => {
  let newGamestate = updatePlayerCard(gamestate, token)
  const flippedCards = JSON.parse(JSON.stringify(newGamestate.positions.flipped_cards))

  const information = {
    shielded_cards: newGamestate.positions.shielded_cards,
    artifacted_cards: getKeys(newGamestate.positions.artifacted_cards),
    show_cards: showCards !== null ? combineUniqueObjects(showCards, flippedCards) : flippedCards,
    show_marks: showMarks,
    obligatory,
    scene_end,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformation
  }

  return {
    private_message,
    ...information
  }
}
