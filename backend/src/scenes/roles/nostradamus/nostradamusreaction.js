import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { nostradamusreactionAction } from './nostradamusreaction.action'

export const nostradamusreaction = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const team = gamestate.roles.nostradamus.team
  const nostradamusTeam = !team ? 'nostradamus_team_villager' : `nostradamus_team_${team}`
  const narration = ['nostradamus_teamstart', nostradamusTeam]

  tokens.forEach(token => {
    let action = {}

    gamestate.players[token].action_finished = false

    action = nostradamusreactionAction(gamestate, token, title)

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
