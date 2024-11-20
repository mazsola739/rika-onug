import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { vampiresvoteInteraction } from './vampiresvote.interaction'

export const vampiresvote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['vampires_vote_text']
  const tokens = getAllPlayerTokens(newGamestate.players)

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (isActivePlayer(card).VAMPIRES_VOTE) {
      newGamestate.players[token].action_finished = false
      interaction = vampiresvoteInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
