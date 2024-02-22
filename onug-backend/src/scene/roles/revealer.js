//@ts-check
import { townIds } from "../../constant"
import { getAllPlayerTokens, getCardIdsByPositions, getSelectableOtherPlayersWithoutShield } from "../../utils/scene"
import { generateRoleInteraction } from "../generate-scene-role-interactions"
import { isValidSelection } from '../validate-response-data'

const createRevealer = (prefix) => () =>
  [`${prefix}_kickoff_text`, "revealer_kickoff2_text"]


export const revealer = (gameState, prefix) => {
  const newGameState = { ...gameState }

  const narration = createRevealer(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 24) {
    newGameState.players[token].scene_role_interaction.interaction = revealer_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const revealer_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(newGameState.players, token)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 }
    }
    
    return generateRoleInteraction(
      newGameState,
      {private_message: ['interaction_may_one_any_other'],
      icon: 'id',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },}
    )
}

//TODO better response message
export const revealer_response =  (gameState, token, selected_positions) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }

  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const revealedCard = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const isTown = revealedCard.every(card => townIds.includes(Object.values(card)[0]))

  if (newGameState.players[token].card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
  }

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].player_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].player_history.show_cards = revealedCard
  }

  return generateRoleInteraction(
    newGameState,
   { private_message: ["interaction_saw_card", selected_positions[0]],
    icon: 'id',
    showCards: revealedCard,
    uniqInformations: { flipped_cards: [selected_positions[0]] }}
  )
}
