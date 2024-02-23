//@ts-check
import { SCENE, townIds } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPositions,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { isValidSelection } from '../validate-response-data'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']

export const flipper = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createFlipper(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 59) {
      interaction = flipper_interaction(newGameState, token)
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

export const flipper_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'id',
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}

//TODO better response message
export const flipper_response = (gameState, token, selected_positions, title) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }

  const selectedPositionCard =
    newGameState.card_positions[selected_positions[0]]
  const revealedCard = getCardIdsByPositions(newGameState.card_positions, [
    selected_positions[0],
  ])
  const isTown = revealedCard.every((card) =>
    townIds.includes(Object.values(card)[0])
  )

  if (
    newGameState.players[token].card?.original_id === selectedPositionCard.id
  ) {
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

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', selected_positions[0]],
    icon: 'id',
    showCards: revealedCard,
    uniqInformations: { flipped_cards: [selected_positions[0]] },
  })
}
