import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { everyonemarkInteraction } from './everyonemark.interaction'

export const everyonemark = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['everyone_mark_text']

  tokens.forEach(token => {
    let interaction = {}

    newGamestate.players[token].action_finished = false
    interaction = everyonemarkInteraction(newGamestate, token, title)

    newGamestate.players[token].player_history[title].scene_title = title
    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
