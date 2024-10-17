import { CENTER_CARD_POSITIONS, COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getCardIdsByPositions, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

const randomExposerInstructions = [
  'exposer_flip1_text',
  'exposer_flip2_text',
  'exposer_flip3_text',
]



export const exposer = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
 //todo better narration
  const actionTime = 8

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  newGamestate.exposer = {
    instruction: '',
  }
  newGamestate.exposer.instruction = randomExposerInstruction

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'exposer') {
      if (card.player_original_id === 46 || (card.player_role_id === 46 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = exposerInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (card.player_role_id === 46 && card.player_original_id === 1) {
        interaction = exposerInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const exposerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const randomExposerInstruction = newGamestate.exposer.instruction
  const limit = randomExposerInstruction.replace('exposer_flip', '').replace('_text', '')

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [limit === 3 ? 'interaction_must_three_center' : limit === 2 ? 'interaction_must_two_center' : 'interaction_must_one_center'],
    icon: 'idcard',
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit } },
  })
}

export const exposerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.center)
  const revealedCards = getCardIdsByPositions(newGamestate.card_positions, cardPositions)

  newGamestate.flipped.push(...revealedCards)

  if (revealedCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: cardPositions,
    flipped_cards: revealedCards,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(cardPositions)],
    icon: 'idcard',
    showCards: revealedCards,
    uniqueInformations: { idcard: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
