const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getAllPlayerTokens, getSelectablePlayersWithNoArtifact, getRandomArtifact, getPlayerTokenByPlayerNumber, getKeys } = require("../utils")

//? INFO: Curator - Gives any player (including himself) a random, unknown Artifact. Cannot give to a Shielded player.
//TODO doppelganger separated 
//! cant give to shielded
exports.curator = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const allPlayerTokens = getAllPlayerTokens(players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
  const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGameState.artifact)

  tokens.forEach((token) => {
    const player = players[token]

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    const playerHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoArtifact,
    }
    player.player_history = playerHistory

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ['interaction_may_one_any'],
        icon: 'artifact',
        selectable_cards: selectablePlayersWithNoArtifact,
        selectable_card_limit: { player: 1, center: 0 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.curator_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const randomPickedArtifact = getRandomArtifact(newGameState.artifact)
  newGameState.artifact.push({ [selected_positions[0]]: randomPickedArtifact })
  const artifactedPlayersToken = getPlayerTokenByPlayerNumber(players, selected_positions[0])
  players[artifactedPlayersToken].artifact = true

  const player = players[token]
  const playerCard = player?.card
  const artifactedCard = newGameState.artifact
  player.player_history.artifacted_cards = artifactedCard

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_placed_artifact", `${selected_positions[0]}`],
      icon: 'artifact',
      new_artifact_card: selected_positions[0],
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
    },
    player: {
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    },
  })
  newGameState.role_interactions = role_interactions
 
  return newGameState
}