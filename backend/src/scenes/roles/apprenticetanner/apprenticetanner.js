import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticetannerAction } from './apprenticetanner.action'

export const apprenticetanner = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_apprenticetanner_kickoff' : 'apprenticetanner_kickoff', 'apprenticetanner_kickoff2']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).APPRENTICE_TANNER) {
      gamestate.players[token].action_finished = false
      action = apprenticetannerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
