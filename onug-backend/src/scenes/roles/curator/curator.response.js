import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'
import { getRandomArtifact } from './curator.utils'

export const curatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newArtifact = getRandomArtifact(gamestate.artifact)
  const artifactedPlayersToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  if (artifactedPlayersToken) {
    gamestate.artifact.push({ [selected_card_positions[0]]: newArtifact })
    gamestate.card_positions[selected_card_positions[0]].artifact = newArtifact
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    new_artifact_card: selected_card_positions[0],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['interaction_placed_artifact', formatPlayerIdentifier(selected_card_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
