//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene-utils'

const randomBlobKickoffText = [
  'blob_1pleft_text',
  'blob_1pright_text',
  'blob_eachside_text',
  'blob_2pleft_text',
  'blob_2pright_text',
  'blob_3pleft_text',
  'blob_3pright_text',
  'blob_4pleft_text',
  'blob_4pright_text',
  'blob_2eachside_text',
]

export const blob = (gameState, title) => {
  const newGameState = { ...gameState }
  const randomKickoff = getRandomItemFromArray(randomBlobKickoffText)
  const narration = [
    randomKickoff,
    randomKickoff.includes('1p') ? 'blob_is_end_text' : 'blob_are_end_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 44 || (newGameState.players[token].card.player_role_id === 44 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 44 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = blob_interaction(newGameState, token, title)
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

export const blob_interaction = (gameState, token, title) => {
  return {}
}
