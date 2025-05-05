import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { villageidiotAction } from './villageidiot.action'

export const villageidiot = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['villageidiot_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).VILLAGE_IDIOT) {
      gamestate.players[token].action_finished = false

      action = villageidiotAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
