//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPlayerNumbers,
  getPlayerNumbersWithMatchingTokens,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const insomniac = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_insomniac_kickoff_text'
      : 'insomniac_kickoff_text',
    'insomniac_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 4 || (newGameState.players[token].card.player_role_id === 4 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 4 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = insomniac_interaction(newGameState, token, title)
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

export const insomniac_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const currentCard = newGameState.card_positions[currentPlayerNumber[0]].card

  if (!newGameState.players[token].shield) {
    newGameState.players[token].card.player_card_id = currentCard.id
    newGameState.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, currentPlayerNumber)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      viewed_cards: currentPlayerNumber,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_own'],
      icon: 'insomniac',
      showCards: showCards,
      uniqInformations: { viewed_cards: currentPlayerNumber }
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
      uniqInformations: { shielded: true },
    })
  }
}
