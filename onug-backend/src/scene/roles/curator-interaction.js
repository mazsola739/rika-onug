const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getAllPlayerTokens, getSelectablePlayersWithNoArtifact, getRandomArtifact, getPlayerTokenByPlayerNumber } = require("../utils")

//? INFO: Curator - Gives any player (including himself) a random, unknown Artifact. Cannot give to a Shielded player.
//TODO doppelganger separated 
//! cant give to shielded
exports.curator_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGameState.artifact)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any'],
        'artifact',
        { selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.curator_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const newArtifact = getRandomArtifact(newGameState.artifact)
  const artifactedPlayersToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])
  newGameState.artifact.push({ [selected_positions[0]]: newArtifact })
  newGameState.players[artifactedPlayersToken].artifact = true

  newGameState.players[token].player_history.new_artifact_card = selected_positions[0]

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_placed_artifact", selected_positions[0]],
      'artifact',
      null,
      null,
      null,
      null,
      { new_artifact_card: selected_positions[0] }
    )
  ]
 
  return { ...newGameState, role_interactions }
}