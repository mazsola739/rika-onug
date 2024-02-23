//@ts-check
import { SCENE, townIds } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPositions,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

export const paranormalinvestigator = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['paranormalinvestigator_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 23) {
      interaction = paranormalinvestigator_interaction(newGameState, token)
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

export const paranormalinvestigator_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_two_any_other'],
    icon: 'investigator',
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 2, center: 0 },
    },
  })
}

export const paranormalinvestigator_response = (
  gameState,
  token,
  selected_positions, 
  title
) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }

  const newGameState = { ...gameState }

  const selectedCards = getCardIdsByPositions(newGameState.card_positions, [
    selected_positions[0],
    selected_positions[1],
  ])
  const playerOneCardId = selectedCards[0][selected_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_positions[1]]

  let showCards = []

  if (townIds.includes(playerOneCardId)) {
    showCards = selectedCards
    if (!townIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0]]
      newGameState.players[token].card.player_role =
        newGameState.card_positions[selected_positions[0]].role
      newGameState.players[token].card.player_team =
        newGameState.card_positions[selected_positions[0]].team
    }
  } else {
    if (!townIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0]]
      newGameState.players[token].card.player_role =
        newGameState.card_positions[selected_positions[0]].role
      newGameState.players[token].card.player_team =
        newGameState.card_positions[selected_positions[0]].team
    } else {
      showCards = selectedCards
      if (
        newGameState.players[token].card.original_id === playerOneCardId ||
        newGameState.players[token].card.original_id === playerTwoCardId
      ) {
        newGameState.players[token].card.player_card_id = 0
      }
    }
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: showCards,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_saw_card',
      selected_positions[0],
      showCards.length === 2 ? selected_positions[1] : '',
    ],
    icon: 'investigator',
    showCards: showCards,
    uniqInformations: { viewed_cards: showCards },
  })
}
