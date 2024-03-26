//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getSelectablePlayersWithNoArtifact, getRandomArtifact, getPlayerTokenByPlayerNumber, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const createCurator = prefix => [`${prefix}_kickoff_text`, 'curator_kickoff2_text']

export const curator = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createCurator(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'curator') {
      if (card.player_original_id === 20 || (card.player_role_id === 20 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = curator_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_curator') {
      if (card.player_role_id === 20 && card.player_original_id === 1) {
        interaction = curator_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const curator_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
  const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGameState.artifact)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any'],
    icon: 'artifact',
    selectableCards: { selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const curator_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const newArtifact = getRandomArtifact(newGameState.artifact)
  const artifactedPlayersToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_card_positions[0])

  if (artifactedPlayersToken) {
    newGameState.artifact.push({ [selected_card_positions[0]]: newArtifact })
    newGameState.players[artifactedPlayersToken[0]].artifact = true
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    new_artifact_card: selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_placed_artifact', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'artifact',
    uniqInformations: { new_artifact_card: selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
