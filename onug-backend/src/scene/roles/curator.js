//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getPlayerNumbersWithMatchingTokens,
  getPlayerTokenByPlayerNumber,
  getRandomArtifact,
  getSelectablePlayersWithNoArtifact,
  getSelectablePlayersWithNoShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

const createCurator = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'curator_kickoff2_text']

export const curator = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createCurator(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 20) {
      interaction = curator_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const curator_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const allPlayerTokens = getAllPlayerTokens(newGameState.players) //TODO better solution
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(
    newGameState.players,
    allPlayerTokens
  )
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(
    selectablePlayerNumbers,
    newGameState.shield
  )
  const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(
    selectablePlayersWithNoShield,
    newGameState.artifact
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    selectable_cards: selectablePlayersWithNoArtifact,
    selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any'],
    icon: 'artifact',
    selectableCards: {
      selectable_cards: selectablePlayersWithNoArtifact,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}

export const curator_response = (
  gameState,
  token,
  selected_positions,
  title
) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }

  const newArtifact = getRandomArtifact(newGameState.artifact)
  const artifactedPlayersToken = getPlayerTokenByPlayerNumber(
    newGameState.players,
    selected_positions[0]
  )

  if (artifactedPlayersToken) {
    newGameState.artifact.push({ [selected_positions[0]]: newArtifact })
    newGameState.players[artifactedPlayersToken[0]].artifact = true
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    new_artifact_card: selected_positions[0],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_placed_artifact', selected_positions[0]],
    icon: 'artifact',
    uniqInformations: { new_artifact_card: selected_positions[0] },
  })
}
