import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { vampiresAction } from './vampires.action'

/* // TODO   Uses the Robber or Witch and swaps with a Werewolf or Vampire 
Does not wake up with the Werewolves/Vampires */

//TODO fix vampires pick together player

export const vampires = (gamestate, title) => {
  const narration = ['vampires_kickoff_text', 'vampires_vote_text']
  const tokens = getAllPlayerTokens(gamestate.players)

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).VAMPIRES) {
      gamestate.players[token].action_finished = false

      action = vampiresAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
