import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { villageidiotInteraction } from './villageidiot.interaction'

export const villageidiot = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['villageidiot_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 26 || (card.player_role_id === 26 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = villageidiotInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
