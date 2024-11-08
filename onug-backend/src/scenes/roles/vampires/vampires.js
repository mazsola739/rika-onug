import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { vampiresInteraction } from './vampires.interaction'

export const vampires = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGamestate.players)

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (isActivePlayer(card).VAMPIRES) {
      newGamestate.players[token].action_finished = false
      interaction = vampiresInteraction(newGamestate, token, title)
    }

    newGamestate.players[token].player_history[title].scene_title = title
    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
