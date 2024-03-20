//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene-utils'

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
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_familyman_kickoff_text'
      : 'familyman_kickoff_text',
    getRandomItemFromArray(randomFamilyman),
    randomFamilyman.includes('1p')
      ? 'familyman_is_end_text'
      : 'familyman_are_end_text',
  ]



  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 78 || (newGameState.players[token].card.player_role_id === 78 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 78 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = familyman_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const familyman_interaction = (gameState, token, title) => {
  return {}
}

export const familyman_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
