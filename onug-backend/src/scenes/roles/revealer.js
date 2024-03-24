//@ts-check
import { copyPlayerIds, SCENE, townIds } from '../../constant'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithoutShield, getCardIdsByPositions } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const createRevealer = prefix => [`${prefix}_kickoff_text`, 'revealer_kickoff2_text']

export const revealer = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createRevealer(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'revealer') {
      if (card.player_original_id === 24 || (card.player_role_id === 24 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = revealer_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_revealer') {
      if (card.player_role_id === 24 && card.player_original_id === 1) {
        interaction = revealer_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const revealer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'id',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

//TODO better response message
export const revealer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card
  const revealedCard = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
  const isTown = revealedCard.every((card) => townIds.includes(Object.values(card)[0]))

  if (newGameState.players[token].card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
  }

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].player_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].player_history.show_cards = revealedCard
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', selected_card_positions[0]],
    icon: 'id',
    showCards: revealedCard,
    uniqInformations: { flipped_cards: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
