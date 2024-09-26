import { getPlayerNumberWithMatchingToken } from "../utils"

const getKeys = array => array.map(obj => Object.keys(obj)[0])

const concatArraysWithUniqueElements = (array1, array2) => {
  const uniqueSet = new Set([...array1, ...array2])
  const uniqueArray = [...uniqueSet]

  return uniqueArray
}

const isPlayersCardsFlipped = (flipped, playersPosition) => Object.keys(flipped).some(key => playersPosition === key)

const isActivePlayersCardsFlipped = (flipped, playersPosition) => flipped.some((obj) => Object.keys(obj)[0] === playersPosition)

const updatePlayerCard = (gameState, token) => {
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gameState.players, token)
  const player = gameState.players[token]
  const flippedCards = gameState.flipped

  const playerCard = player?.card
  const currentCard = gameState.card_positions[currentPlayerNumber].card

  if (!playerCard || !currentCard) return

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, currentPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    playerCard.player_card_id = currentCard.id
    playerCard.player_role_id = currentCard.id
    playerCard.player_role = currentCard.role
    playerCard.player_team = currentCard.team
  } else if (iSeeMyCardElsewhere) {
    playerCard.player_card_id = 0
  }
}

export const generateRoleInteraction = (gameState, token, {
  private_message,
  icon,
  selectableCards = {},
  selectableMarks = {},
  showCards = [],
  showMarks = [],
  uniqueInformations = {}
}) => {
  updatePlayerCard(gameState, token)

  const informations = {
    shielded_cards: gameState.shield,
    artifacted_cards: getKeys(gameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, gameState.flipped) : gameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformations,
  }

  return {
    private_message,
    icon,
    ...informations,
    player_name: gameState.players[token].name,
    player_number: gameState.players[token].player_number,
    ...gameState.players[token].card,
  }
}
