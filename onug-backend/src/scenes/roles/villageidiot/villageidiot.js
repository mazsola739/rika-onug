import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { villageidiotInteraction } from './villageidiot.interaction'

export const villageidiot = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['villageidiot_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).VILLAGE_IDIOT) {
      gamestate.players[token].action_finished = false
      interaction = villageidiotInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
