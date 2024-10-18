import { getPlayerNumberWithMatchingToken } from "./getPlayerNumberWithMatchingToken"

export const getKeys = array => array.map(obj => Object.keys(obj)[0])

export const concatArraysWithUniqueElements = (array1, array2) => [...new Set([...array1, ...array2])]

const isPlayersCardsFlipped = (flipped, playersPosition) => Object.keys(flipped).some(key => playersPosition === key)

const isActivePlayersCardsFlipped = (flipped, playersPosition) => flipped.some((obj) => Object.keys(obj)[0] === playersPosition)

export const updatePlayerCard = (gamestate, token) => {
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const player = gamestate.players[token]
  const flippedCards = gamestate.flipped

  const playerCard = player?.card
  const currentCard = gamestate.card_positions[currentPlayerNumber].card

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