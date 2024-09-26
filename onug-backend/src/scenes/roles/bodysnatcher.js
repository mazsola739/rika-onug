import { CENTER_CARD_POSITIONS, COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken, getAnyOtherPlayersByToken, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, formatPlayerIdentifier } from '../../utils'
import { validateCardSelection } from '../validate-response-data'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

const randomBodysnatcherInstructions = [
  'bodysnatcher_steal_text',
  'bodysnatcher_center_text',
]
const bodysnatcherKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
]

export const bodysnatcher = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
 //todo better narration
  const actionTime = 8

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

/*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'bodysnatcher') {
      if (card.player_original_id === 74 || (card.player_role_id === 74 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const bodysnatcherInteraction = (gamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey) => {
  const newGamestate = { ...gamestate }

  if (newGamestate.players[token].shield) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }

  let selectablePlayers
  let selectableCards
  let interactionMessage

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal_text') {
    switch (bodysnatcherKey) {
      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
        const evenOrOdd = bodysnatcherKey.replace('identifier_', '').replace('_text', '').replace('any', '')
        selectablePlayers = getAnyEvenOrOddPlayers(newGamestate.players, evenOrOdd)
        break
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
      case 'identifier_oneneighbor_text':
        const direction = bodysnatcherKey.includes('left') ? 'left' : bodysnatcherKey.includes('right') ? 'right' : 'both'
        selectablePlayers = getPlayerNeighborsByToken(newGamestate.players, direction, 1)
        break
      case 'identifier_any_text':
        selectablePlayers = getAnyOtherPlayersByToken(newGamestate.players)
        break
    }

    const selectablePlayerNumbers = getNonAlienPlayerNumbersByRoleIdsWithNoShield(selectablePlayers)

    selectableCards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } }
    interactionMessage = selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_alien'
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
    selectableCards = { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } }
    interactionMessage = 'interaction_must_one_center'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...selectableCards,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [interactionMessage],
    icon: 'alienhand',
    selectableCards,
  })
}

export const bodysnatcherResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
  const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
  newGamestate.card_positions[currentPlayerNumber].card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard
  newGamestate.card_positions[currentPlayerNumber].card.team = "alien"
  newGamestate.card_positions[currentPlayerNumber].card.role = "ALIEN"

  newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
  newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
  newGamestate.players[token].card.player_role = newGamestate.card_positions[currentPlayerNumber].card.role

  const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_own_card'],
    icon: 'alienhand',
    showCards,
    uniqueInformations: { swap: [currentPlayerNumber, selected_card_positions[0]], alienhand: [currentPlayerNumber] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
