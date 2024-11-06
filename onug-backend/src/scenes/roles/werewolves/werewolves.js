import { ALL_COPY_PLAYER, WEREVOLVES } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { werewolvesInteraction } from './werewolves.interaction'

export const werewolves = (gamestate, title, hasDreamWolf) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDreamWolf
      ? 'werewolves_dreamwolf_kickoff_text'
      : 'werewolves_kickoff_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (
      WEREVOLVES.some(
        (id) =>
          card.player_role_id === id &&
          [id, ...ALL_COPY_PLAYER].includes(card.player_original_id)
      )
    ) {
      newGamestate.players[token].action_finished = false
      interaction = werewolvesInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
