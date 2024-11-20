import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { mysticwolfInteraction } from './mysticwolf.interaction'

export const mysticwolf = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['mysticwolf_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).MYSTIC_WOLF) {
      gamestate.players[token].action_finished = false
      interaction = mysticwolfInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
