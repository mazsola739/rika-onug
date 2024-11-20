import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { copycatInteraction } from './copycat.interaction'

//TODO if oracle is oracle team
export const copycat = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['copycat_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).COPYCAT) {
      gamestate.players[token].action_finished = false
      interaction = copycatInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
