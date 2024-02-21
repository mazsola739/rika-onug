const createCurator = (prefix) => () =>
  [`${prefix}_kickoff_text`, "curator_kickoff2_text"]

export const curator = (gameState) => createCurator("curator")
export const doppelganger_curator = (gameState) => createCurator("doppelganger_curator")

import { updatePlayerCard } from '../update-player-card'
import { generateSceneRoleInteractions } from '../generate-role-interactions'
import { isValidSelection } from '../validate-response-data'

import {
  getSelectablePlayersWithNoShield,
  getPlayerNumbersWithMatchingTokens,
  getAllPlayerTokens,
  getSelectablePlayersWithNoArtifact,
  getRandomArtifact,
  getPlayerTokenByPlayerNumber,
} from '../utils'

/* if (conditions.hasCuratorPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [20])
  return roles.curator_interaction(newGameState, tokens, sceneTitle)
}
if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [1])
  return roles.curator_interaction(newGameState, tokens, sceneTitle)
} */

//? INFO: Curator - Gives any player (including himself) a random, unknown Artifact. Cannot give to a Shielded player.
//TODO doppelganger separated 
//! cant give to shielded
export const curator_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGameState.artifact)

    updatePlayerCard(newGameState, token)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
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

  return { ...newGameState, scene_role_interactions }
}

export const curator_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const newArtifact = getRandomArtifact(newGameState.artifact)
  const artifactedPlayersToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])
  newGameState.artifact.push({ [selected_positions[0]]: newArtifact })
  newGameState.players[artifactedPlayersToken].artifact = true

  newGameState.players[token].player_history.new_artifact_card = selected_positions[0]

  const scene_role_interactions = [
    generateSceneRoleInteractions(
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
 
  return { ...newGameState, scene_role_interactions }
}