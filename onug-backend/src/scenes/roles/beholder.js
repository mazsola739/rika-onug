//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getAnySeerPlayerNumbersByRoleIds, getAnySeerPlayerNumbersByRoleIdsWithoutShield, getCardIdsByPositions } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const beholder = (gameState, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
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

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 73 || (card.player_role_id === 73 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = beholder_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}



export const beholder_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const seers = getAnySeerPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    seers,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_seers', 'interaction_may_look'],
    icon: 'seer',
    uniqInformations: { seers, answer_options: ['yes', 'no'] },
  })
}

export const beholder_response = (gameState, token, answer, title) => {
  const newGameState = { ...gameState }
  const scene = []

  let interaction = {}

  if (answer === 'yes') {
    const seers = getAnySeerPlayerNumbersByRoleIdsWithoutShield(newGameState.players)
    const viewCards = getCardIdsByPositions(newGameState.card_positions, seers)

    if ( seers.some(seer => newGameState.card_positions[seer].card.id === newGameState.players[token]?.card?.original_id)  ) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      viewed_cards: seers,
    }
  
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(seers)],
      icon: 'seer',
      showCards: viewCards,
      uniqInformations: { viewed_cards: seers },
    })
  } else if (answer === 'no') {
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_nothing'],
      icon: 'seer',
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
