import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { werewolvesInteraction } from './werewolves.interaction'

/* // TODO   Uses the Robber or Witch and swaps with a Werewolf or Vampire 
Does not wake up with the Werewolves/Vampires */

export const werewolves = (gamestate, title, hasDreamWolf) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDreamWolf ? 'werewolves_dreamwolf_kickoff_text' : 'werewolves_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).WEREWOLVES) {
      gamestate.players[token].action_finished = false
      interaction = werewolvesInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
