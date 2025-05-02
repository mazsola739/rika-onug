import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { apprenticetannerAction } from './apprenticetanner.action'

export const apprenticetanner = (ws, gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_apprenticetanner_kickoff_text' : 'apprenticetanner_kickoff_text', 'apprenticetanner_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).APPRENTICE_TANNER) {
      gamestate.players[token].action_finished = false

      action = apprenticetannerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
