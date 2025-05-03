import { getRandomArtifact, getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateCardSelection } from '../../../validators'

export const curatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newArtifact = getRandomArtifact(gamestate.artifacted_cards)
  const artifactedPlayersToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  if (artifactedPlayersToken) {
    gamestate.artifacted_cards.push({ [selected_card_positions[0]]: newArtifact })
    gamestate.card_positions[selected_card_positions[0]].artifact = newArtifact
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    new_artifact_card: selected_card_positions[0],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_placed_artifact', formatPlayerIdentifier(selected_card_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
