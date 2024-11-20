import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { copycatInteraction } from '../copycat/copycat.interaction'

export const mirrorman = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['mirrorman_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).MIRROR_MAN) {
      gamestate.players[token].action_finished = false
      interaction = copycatInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
