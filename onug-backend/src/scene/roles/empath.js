//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getRandomItemFromArray,
  pickRandomUpToThreePlayers,
} from '../../utils/scene'

const empathAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]

const randomEmpath = [
  'empath_action1_text',
  'empath_action2_text',
  'empath_action3_text',
  'empath_action4_text',
  'empath_action5_text',
  'empath_action6_text',
  'empath_action7_text',
  'empath_action8_text',
  'empath_action9_text',
  'empath_action10_text',
  'empath_action11_text',
  'empath_action12_text',
  'empath_action13_text',
  'empath_action14_text',
]

const createEmpath = (prefix, totalPlayers) => () => {
  const randomIdentifier = getRandomItemFromArray(empathAllKeys)
  const randomInstructions = getRandomItemFromArray(randomEmpath)

  return [
    `${prefix}_kickoff_text`,
    'empath_kickoff2_text',
    randomIdentifier === 'activePlayers'
      ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
      : randomIdentifier,
    randomInstructions,
  ]
}

export const empath = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const total_players = newGameState.total_players
  const narration = createEmpath(prefix, total_players)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 77 || (newGameState.players[token].card.player_role_id === 77 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 77 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = empath_interaction(newGameState, token, title)
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

export const empath_interaction = (gameState, token, title) => {
  return {}
}
export const empath_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
