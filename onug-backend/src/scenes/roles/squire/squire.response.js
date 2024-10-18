import { SCENE } from "../../../constants"
import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleInteraction } from "../../sceneUtils"
import { validateAnswerSelection } from "../../validators"
import { getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield } from "./squire.utils"

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  let interaction = {}

  if (selected_answer === 'yes') {
    const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)
    const viewCards = getCardIdsByPositions(newGamestate.card_positions, werewolves)

    if ( werewolves.some(wolf => newGamestate.card_positions[wolf].card.id === newGamestate.players[token]?.card?.original_id)  ) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
      viewed_cards: werewolves,
    }

    const messageIdentifiers = formatPlayerIdentifier(werewolves)
  
    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      showCards: viewCards,
      uniqueInformations: { werewolves },
    })
  } else if (selected_answer === 'no') {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
    }

    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_nothing'],
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
