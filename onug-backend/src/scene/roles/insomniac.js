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

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 4) {
      interaction = insomniac_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const insomniac_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(
    newGameState.players,
    [token]
  )
  const currentCard = newGameState.card_positions[currentPlayerNumber[0]]

  if (!newGameState.players[token].shield) {
    newGameState.players[token].card.player_card_id = currentCard.id
    newGameState.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPlayerNumbers(
      newGameState.card_positions,
      currentPlayerNumber
    )

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      viewed_cards: showCards,
    }

    return generateRoleInteraction(newGameState, {
      private_message: ['interaction_own'],
      icon: 'insomniac',
      showCards: showCards,
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
      uniqInformations: { shielded: true },
    })
  }
}
