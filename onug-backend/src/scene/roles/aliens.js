//@ts-check
import { SCENE, alienIds } from '../../constant'
import {
  getAllPlayerTokens,
  getRandomItemFromArray,
  pickRandomUpToThreePlayers,
} from '../../utils'

const random_aliens = [
  'aliens_view_text',
  'aliens_allview_text',
  'aliens_stare_text',
  'aliens_left_text',
  'aliens_right_text',
  'aliens_show_text',
  'aliens_timer_text',
  'aliens_newalien_text',
  'aliens_alienhelper_text',
]
const alienAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
const alienAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
]

export const aliens = (gameState, title) => {
  const newGameState = { ...gameState }

  const narration = ['aliens_kickoff_text']
  const randomInstructions = getRandomItemFromArray(random_aliens)
  narration[1] = randomInstructions

  if (randomInstructions.includes('view')) {
    let randomAnyIdentifier = getRandomItemFromArray(alienAnyKeys)
    if (randomAnyIdentifier === 'activePlayers') {
      randomAnyIdentifier = pickRandomUpToThreePlayers(
        newGameState.total_players,
        'conjunction_or'
      )
    }
    narration[2] = randomAnyIdentifier
  }
  if (
    randomInstructions === 'aliens_newalien_text' ||
    randomInstructions === 'aliens_alienhelper_text'
  ) {
    const randomAllIdentifier = getRandomItemFromArray(alienAllKeys)
    narration[2] = randomAllIdentifier
  }

  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (alienIds.some((id) => newGameState.players[token].card.player_role_id === id)) {
      newGameState.players[token].player_history.random = {
        random_instruction: narration[1],
        random_identifier: narration.slice(2),
      }
      interaction = aliens_interaction(newGameState, token, title)
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

export const aliens_interaction = (gameState, token, title) => {
  return {}
}
export const aliens_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
