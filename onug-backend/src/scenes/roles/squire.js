//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getWerewolfAndDreamwolfPlayerNumbersByRoleIds, getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidAnswerSelection } from '../validate-response-data'

export const squire = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 83 || (card.player_role_id === 27 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = squire_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const squire_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGameState.players)

  if (werewolves.length === 0) {
    newGameState.players[token].card.player_team = 'squire'
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    werewolves,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_werewolves', 'interaction_may_look'],
    icon: 'werewolf',
    uniqueInformations: { werewolves, answer_options: ['yes', 'no'] },
  })
}

export const squire_response = (gameState, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gameState.players[token].player_history, title)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  let interaction = {}

  if (selected_answer === 'yes') {
    const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield(newGameState.players)
    const viewCards = getCardIdsByPositions(newGameState.card_positions, werewolves)

    if ( werewolves.some(wolf => newGameState.card_positions[wolf].card.id === newGameState.players[token]?.card?.original_id)  ) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      viewed_cards: werewolves,
    }

    const messageIdentifiers = formatPlayerIdentifier(werewolves)
  
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      icon: 'werewolves',
      showCards: viewCards,
      uniqueInformations: { werewolves },
    })
  } else if (selected_answer === 'no') {
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_nothing'],
      icon: 'werewolves',
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
