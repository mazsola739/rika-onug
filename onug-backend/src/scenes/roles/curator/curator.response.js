import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'
import { getRandomArtifact } from './curator.utils'

export const curatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const newArtifact = getRandomArtifact(newGamestate.artifact)
  const artifactedPlayersToken = getPlayerTokensByPlayerNumber(newGamestate.players, selected_card_positions[0])

  if (artifactedPlayersToken) {
    newGamestate.artifact.push({ [selected_card_positions[0]]: newArtifact })
    newGamestate.players[artifactedPlayersToken[0]].artifact = true
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    new_artifact_card: selected_card_positions[0]
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_placed_artifact', formatPlayerIdentifier(selected_card_positions)[0]]
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
