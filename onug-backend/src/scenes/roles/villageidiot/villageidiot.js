import { COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { villageidiotInteraction } from './villageidiot.interaction'

export const villageidiot = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['villageidiot_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (
      card.player_original_id === 26 ||
      (card.player_role_id === 26 &&
        COPY_PLAYER.includes(card.player_original_id))
    ) {
      newGamestate.players[token].action_finished = false
      interaction = villageidiotInteraction(newGamestate, token, title)
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
