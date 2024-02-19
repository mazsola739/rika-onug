const { townIds } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions } = require("../utils")

//? INFO: Paranormal Investigator - Looks at two other player's cards one at a time if he sees team they are not on the Villager Team he stops looking and becomes that role. May not look at any center cards.
exports.paranormalinvestigator = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players } = newGameState
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_two_any_other'],
        'investigator',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.paranormalinvestigator_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const player = newGameState.players[token]
  const playerCard = player?.card
  const cardPositions = newGameState.card_positions

  const selectedCards = getCardIdsByPositions(cardPositions, [selected_positions[0], selected_positions[1]])
  const playerOneCardId = selectedCards[0][selected_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_positions[1]]

  let showCards = []

  if (townIds.includes(playerOneCardId)) {
    showCards = selectedCards
    if (!townIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0]]
      playerCard.player_role = cardPositions[selected_positions[0]].role
      playerCard.player_team = cardPositions[selected_positions[0]].team
    }
  } else {
    if (!townIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0]]
      playerCard.player_role = cardPositions[selected_positions[0]].role
      playerCard.player_team = cardPositions[selected_positions[0]].team
    } else {
      showCards = selectedCards
      if (playerCard.original_id === playerOneCardId || playerCard.original_id === playerTwoCardId) {
        playerCard.player_card_id = 0
      }
    }
  }

  player.player_history.show_cards = viewCards
  player.card_or_mark_action = true

const role_interactions = [
  generateRoleInteractions(
    newGameState,
    title,
    token,
    ["interaction_saw_card", selected_positions[0], showCards.length === 2 ? selected_positions[1] : ''],
    'investigator',
    null,
    viewCards,
    null,
    null,
    { viewed_cards: showCards }
  )
]

return { ...newGameState, role_interactions }
}
