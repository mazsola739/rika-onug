//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene'

const random_psychic = ['psychic_view1_text', 'psychic_view2_text']
const psychicKeys = ['identifier_anyeven_text', 'identifier_anyodd_text']
const createPsychic = (prefix) => () =>
  [
    `${prefix}_kickoff_text`,
    getRandomItemFromArray(random_psychic),
    getRandomItemFromArray(psychicKeys),
  ]

export const psychic = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPsychic(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 51 || (newGameState.players[token].card.player_role_id === 51 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 51 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = psychic_interaction(newGameState, token, title)
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

export const psychic_interaction = (gameState, token, title) => {
  return {}
}
export const psychic_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
