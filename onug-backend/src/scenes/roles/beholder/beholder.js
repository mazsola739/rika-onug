import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getAnySeerPlayerNumbersByRoleIds, getAnySeerPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateAnswerSelection } from '../../validate-response-data'

export const beholder = (gamestate, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_beholder_kickoff_text'
      : 'beholder_seer_kickoff_text',
    hasSeer && hasApprenticeSeer
      ? 'beholder_seer_apprenticeseer_kickoff_text'
      : hasSeer
      ? 'beholder_seer_kickoff_text'
      : 'beholder_apprenticeseer_kickoff_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 73 || (card.player_role_id === 73 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = beholderInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}



export const beholderInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const seers = getAnySeerPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    seers,
  }

  const messageIdentifiers = formatPlayerIdentifier(seers)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_seers', ...messageIdentifiers, 'interaction_may_look'],
    icon: 'seer',
    uniqueInformations: { seers, answer_options: ['yes', 'no'] },
  })
}

export const beholderResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  let interaction = {}

  if (selected_answer === 'yes') {
    const seers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)
    const viewCards = getCardIdsByPositions(newGamestate.card_positions, seers)

    if ( seers.some(seer => newGamestate.card_positions[seer].card.id === newGamestate.players[token]?.card?.original_id)  ) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: seers,
    }
    
    const messageIdentifiers = formatPlayerIdentifier(seers)
  
    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      icon: 'seer',
      showCards: viewCards,
      uniqueInformations: { seers },
    })
  } else if (selected_answer === 'no') {
    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_nothing'],
      icon: 'seer',
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
