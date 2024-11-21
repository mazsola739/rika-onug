import { getPlayerNumberWithMatchingToken } from './getPlayerNumberWithMatchingToken'

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

const isPlayersCardsFlipped = (flipped, playersPosition) => Object.keys(flipped).some(key => playersPosition === key)

const isActivePlayersCardsFlipped = (flipped, playersPosition) => flipped.some(obj => Object.keys(obj)[0] === playersPosition)

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
    playerCard.player_card_id = 87
  }
}

export const generateRoleAction = (
  gamestate,
  token,
  { private_message, selectableCards = {}, selectableMarks = {}, showCards = [], showMarks = [], obligatory = false, scene_end = false, uniqueInformations = {} }
) => {
  updatePlayerCard(gamestate, token)
  const flippedCards = JSON.parse(JSON.stringify(gamestate.flipped))

  const informations = {
    shielded_cards: gamestate.shield,
    artifacted_cards: getKeys(gamestate.artifact),
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
