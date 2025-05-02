import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { epicbattleAction } from './epicbattle.action'
import { random_easteregg_nobadguys, random_easteregg_nogoodguys } from './epicbattle.constants'

export const epicbattle = (ws, gamestate, title, hasEasterEgg, hasEpicBattle, totalPlayers, nogoodguys, nobadguys) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = []

  if (hasEpicBattle) {
    narration.push('everyone_epic_intro_text')
  } else if (!hasEpicBattle && hasEasterEgg) {
    if (totalPlayers === 12) {
      narration.push('easteregg_really_text', 'easteregg_whatever_text')
    } else if (nobadguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nobadguys), 'easteregg_whatever_text')
    } else if (nogoodguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nogoodguys), 'easteregg_whatever_text')
    }
  }

  tokens.forEach(token => {
    let action = {}

    gamestate.players[token].action_finished = false

    action = epicbattleAction(gamestate, token, title)

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
