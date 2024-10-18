import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getRandomItemFromArray, getAllPlayerTokens, getAnyEvenOrOddPlayers, getAnySeerPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { validateCardSelection } from '../../validators'
import { generateRoleInteraction } from '../../generateRoleInteraction'

const randomPsychicInstructions = ['psychic_view1_text', 'psychic_view2_text']
const psychicKeys = ['identifier_anyeven_text', 'identifier_anyodd_text']

export const psychic = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availablePsychicOptions = []

  if (total_players === 3) {
    availablePsychicOptions = randomPsychicInstructions.filter(option => !option.includes('view2'))
  }
 //todo better narration and save into constants
     /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  const narration = [`${prefix}_kickoff_text`, getRandomItemFromArray(availablePsychicOptions), getRandomItemFromArray(psychicKeys)]
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'psychic') {
      if (card.player_original_id === 51 || (card.player_role_id === 51 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = psychicInteraction(newGamestate, token, title, randomPsychicInstructions, psychicKeys)
      }
    } else if (prefix === 'doppelganger_psychic') {
      if (card.player_role_id === 51 && card.player_original_id === 1) {
        interaction = psychicInteraction(newGamestate, token, title, randomPsychicInstructions, psychicKeys)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const psychicInteraction = (gamestate, token, title, randomPsychicInstructions, psychicKeys) => {
  const newGamestate = { ...gamestate }
  
  const evenOrOdd = psychicKeys.replace('identifier_', '').replace('_text', '').replace('any', '')
  const selectablePlayers = getAnyEvenOrOddPlayers(newGamestate.players, evenOrOdd)
  const selectablePlayerNumbers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(selectablePlayers)

  const limit = +randomPsychicInstructions.replace('psychic_view', '').replace('_text', '')

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : limit === 1 ? 'interaction_may_one_any_other' : 'interaction_may_two_any'],
    icon: 'psychic',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 } },
  })
}

export const psychicResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const limit = newGamestate.players[token].player_history[title].selectable_card_limit.player
  const showCards = getCardIdsByPositions(newGamestate?.card_positions, selected_card_positions.slice(0, limit))

  if (showCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: 'psychic',
    uniqueInformations: { seer: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
