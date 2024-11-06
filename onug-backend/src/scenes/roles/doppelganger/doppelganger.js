import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { doppelgangerInteraction } from './doppelganger.interaction'

//TODO if oracle is oracle team
export const doppelganger = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['doppelganger_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 1) {
      newGamestate.players[token].action_finished = false
      interaction = doppelgangerInteraction(newGamestate, token, title)
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
