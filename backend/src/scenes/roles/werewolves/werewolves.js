import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { werewolvesAction } from './werewolves.action'

export const werewolves = (gamestate, title, hasDreamWolf) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDreamWolf ? 'werewolves_dreamwolf_kickoff' : 'werewolves_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).WEREWOLVES) {
      gamestate.players[token].action_finished = false
      action = werewolvesAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
