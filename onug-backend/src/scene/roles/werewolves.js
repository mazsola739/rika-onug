//@ts-check
import {
  getWerewolfPlayerNumbersByRoleIds,
  getDreamWolfPlayerNumberByRoleIds,
  getCardIdsByPositions,
  getAllPlayerTokens,
} from '../../utils/scene'
import { centerCardPositions, werewolvesIds } from '../../constant'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

export const werewolves = (gameState, hasDreamWolf) => { 
  const newGameState = { ...gameState }
  const narration =  [
    hasDreamWolf
    ? "werewolves_dreamwolf_kickoff_text"
    : "werewolves_kickoff_text",
]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
    newGameState.players[token].scene_role_interaction.narration = narration
 
    if (werewolvesIds.some(id => newGameState.players[token].card.player_role_id === id)) {
     newGameState.players[token].scene_role_interaction.interaction = werewolves_interaction(newGameState, token)
    }
   })
 
   return newGameState
}

export const werewolves_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGameState.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGameState.players)
  const loneWolf = werewolves.length + dreamwolf.length === 1

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 },
    werewolves, dreamwolf
  }

  return generateRoleInteraction(
    newGameState,
    {private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
    icon: loneWolf ? 'spy' : 'werewolf',
    selectableCards: { selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 } },
    uniqInformations: { werewolves, dreamwolf }}
  )
}

export const werewolves_response = (gameState, token, selected_positions) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]

  if (newGameState.players[token].card.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    viewed_cards: [selected_positions[0]]
  }

  return generateRoleInteraction(
    newGameState,
    {private_message: ["interaction_saw_card", selected_positions[0]],
    icon: 'spy',
    showCards: showCards,
    uniqInformations: { viewed_cards: [selected_positions[0]] }}
  )
}