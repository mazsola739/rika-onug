//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene'

const randomFamilyman = [
  'familyman_1pleft_text',
  'familyman_1pright_text',
  'familyman_eachside_text',
  'familyman_2pleft_text',
  'familyman_2pright_text',
  'familyman_3pleft_text',
  'familyman_3pright_text',
  'familyman_4pleft_text',
  'familyman_4pright_text',
  'familyman_2eachside_text',
]

export const familyman = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_familyman_kickoff_text'
      : 'familyman_kickoff_text',
    getRandomItemFromArray(randomFamilyman),
    randomFamilyman.includes('1p')
      ? 'familyman_is_end_text'
      : 'familyman_are_end_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 78) {
      interaction = familyman_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const familyman_interaction = (gameState, token, title) => {
  return {}
}
export const familyman_response = (gameState, token, selected_positions, title) => {
  return {}
}
