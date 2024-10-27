import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { nostradamusInteraction } from './nostradamus.interaction'

export const nostradamus = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['nostradamus_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 80 || (card.player_role_id === 80 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = nostradamusInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
