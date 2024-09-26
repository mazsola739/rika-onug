import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getWerewolfAndDreamwolfPlayerNumbersByRoleIds, getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidAnswerSelection } from '../validate-response-data'

export const squire = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 83 || (card.player_role_id === 27 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = squire_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const squire_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'squire'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    werewolves,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_werewolves', 'interaction_may_look'],
    icon: 'werewolf',
    uniqueInformations: { werewolves, answer_options: ['yes', 'no'] },
  })
}

export const squire_response = (gamestate, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
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
      icon: 'werewolves',
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
      icon: 'werewolves',
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
