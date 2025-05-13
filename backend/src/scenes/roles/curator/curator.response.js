import { artifactsJson } from '../../../data'
import { getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO util function?
export const curatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const getRandomArtifact = playerArtifacts => {
    const assignedArtifacts = playerArtifacts.map(obj => Object.values(obj)[0])
    const availableArtifacts = artifactsJson.filter(artifact => !assignedArtifacts.includes(artifact.id))
    const randomIndex = Math.floor(Math.random() * availableArtifacts.length)

    return availableArtifacts[randomIndex].id
  }

  const newArtifact = getRandomArtifact(gamestate.positions.artifacted_cards)
  const artifactedPlayersToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  if (artifactedPlayersToken) {
    gamestate.positions.artifacted_cards.push({ [selected_card_positions[0]]: newArtifact })
    gamestate.positions.card_positions[selected_card_positions[0]].artifact = newArtifact
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_placed_artifact', ...formatPlayerIdentifier([selected_card_positions[0]])],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
