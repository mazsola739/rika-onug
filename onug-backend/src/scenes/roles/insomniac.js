//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const insomniac = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_insomniac_kickoff_text'
      : 'insomniac_kickoff_text',
    'insomniac_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 4 || (card.player_role_id === 4 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = insomniac_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const insomniac_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentCard = newGameState.card_positions[currentPlayerNumber].card

  if (!newGameState.players[token].shield) {
    newGameState.players[token].card.player_card_id = currentCard.id
    newGameState.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, currentPlayerNumber)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      viewed_cards: [currentPlayerNumber],
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_own_card'],
      icon: 'insomniac',
      showCards: showCards,
      uniqInformations: { viewed_cards: [currentPlayerNumber] }
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
