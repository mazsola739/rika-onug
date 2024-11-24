import { getPlayerNumberWithMatchingToken } from '.'

export const getKeys = array => array.map(obj => Object.keys(obj)[0])

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

const isPlayersCardsFlipped = (flippedCards, playerCardId) => {
  return flippedCards.some(obj => {
    const key = Object.keys(obj)[0]
    return obj[key] === playerCardId
  })
}

const isActivePlayersCardsFlipped = (flippedCards, playersPosition) => flippedCards.some(obj => Object.keys(obj)[0] === playersPosition)

export const updatePlayerCard = (gamestate, token) => {
  let newGamestate = { ...gamestate }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const flippedCards = newGamestate.flipped_cards

  const playerCard = newGamestate.players[token].card
  const currentCard = newGamestate.card_positions[currentPlayerNumber].card

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
  { private_message, selectableCards = {}, selectableMarks = {}, showCards = [], showMarks = [], obligatory = false, scene_end = false, uniqueInformations = {} }
) => {
  let newGamestate = updatePlayerCard(gamestate, token)
  const flippedCards = JSON.parse(JSON.stringify(newGamestate.flipped_cards))

  const informations = {
    shielded_cards: newGamestate.shielded_cardsed_cards,
    artifacted_cards: getKeys(newGamestate.artifacted_cards),
    show_cards: showCards !== null ? combineUniqueObjects(showCards, flippedCards) : flippedCards,
    show_marks: showMarks,
    obligatory,
    scene_end,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformations
  }

  return {
    private_message,
    ...informations
  }
}
