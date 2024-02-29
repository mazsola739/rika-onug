//@ts-check
import {
  getWerewolfPlayerNumbersByRoleIds,
  getDreamWolfPlayerNumberByRoleIds,
  getCardIdsByPositions,
  getAllPlayerTokens,
} from '../../utils/scene-utils'
import { SCENE, centerCardPositions, werewolvesIds } from '../../constant'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const werewolves = (gameState, title, hasDreamWolf) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDreamWolf
      ? 'werewolves_dreamwolf_kickoff_text'
      : 'werewolves_kickoff_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (werewolvesIds.some((id) => newGameState.players[token].card.player_role_id === id)) {
      interaction = werewolves_interaction(newGameState, token, title)
    }

    newGameState.players[token].player_history.scene_title = title
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

export const werewolves_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGameState.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGameState.players)
  const loneWolf = werewolves.length + dreamwolf.length === 1

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 },
    werewolves,
    dreamwolf,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
    icon: loneWolf ? 'spy' : 'werewolf',
    selectableCards: { selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 } },
    uniqInformations: { werewolves, dreamwolf },
  })
}

export const werewolves_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
  const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card

  if (newGameState.players[token].card.player_original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', selected_card_positions[0]],
    icon: 'spy',
    showCards: showCards,
    uniqInformations: { viewed_cards: [selected_card_positions[0]] },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })

  newGameState.scene = scene

  return newGameState
}
