import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { vampiresInteraction } from './vampires.interaction'

/* // TODO   Uses the Robber or Witch and swaps with a Werewolf or Vampire 
Does not wake up with the Werewolves/Vampires */

export const vampires = (gamestate, title) => {
  const narration = ['vampires_kickoff_text', 'vampires_vote_text']
  const tokens = getAllPlayerTokens(gamestate.players)

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).VAMPIRES) {
      gamestate.players[token].action_finished = false
      interaction = vampiresInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
