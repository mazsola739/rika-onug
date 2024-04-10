//@ts-check
import { werewolvesIds, allCopyPlayerIds, SCENE, centerCardPositions } from '../../constant'
import { getAllPlayerTokens, getWerewolfPlayerNumbersByRoleIds, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const werewolves = (gameState, title, hasDreamWolf) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDreamWolf
      ? 'werewolves_dreamwolf_kickoff_text'
      : 'werewolves_kickoff_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (werewolvesIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = werewolves_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const werewolves_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGameState.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGameState.players)
  const loneWolf = werewolves.length + dreamwolf.length === 1

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 },
    werewolves,
    dreamwolf,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
    icon: loneWolf ? 'lonely' : 'werewolf',
    selectableCards: { selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 } },
    uniqueInformations: { werewolves, dreamwolf },
  })
}

export const werewolves_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
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

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'lonely',
    showCards,
    uniqueInformations: { lonely: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })

  newGameState.scene = scene

  return newGameState
}
