import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getRandomItemFromArray, getAllPlayerTokens, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getPlayerNumberWithMatchingToken, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateCardSelection } from '../validate-response-data'

const randomMorticianInstructions = ['mortician_1card_text', 'mortician_2cards_text']
const morticianKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

export const mortician = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`]
  const actionTime = 10
//TODO
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
 // narration.push(randomMorticianInstruction, morticianKey)


    /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'mortician') {
      if (card.player_original_id === 49 || (card.player_role_id === 49 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const morticianInteraction = (gamestate, token, title, randomMorticianInstruction, morticianKey) => {
  const newGamestate = { ...gamestate }

  if (morticianKey === 'identifier_yourself_text') {
    if (!newGamestate.players[token].shield) {
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        selectable_cards: [currentPlayerNumber], selectable_card_limit: { player: 1, center: 0 },
      }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_may_look_yourself'],
        icon: 'mortician',
        selectableCards: { selectable_cards: [currentPlayerNumber], selectable_card_limit: { player: 1, center: 0 } },
      })
    } else {
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        shielded: true,
      }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_shielded'],
        icon: 'shielded',
      })
    }
  } else if (morticianKey.includes('neighbor')) {
    const direction = morticianKey.includes('left') ? 'left' : morticianKey.includes('right') ? 'right' : 'both'
    const selectablePlayers = getPlayerNeighborsByToken(newGamestate.players, direction, 1)
    const selectablePlayerNumbers = getSelectablePlayersWithNoShield(selectablePlayers)
    const limit = randomMorticianInstruction.includes('1') ? 1 : 2

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : `interaction_may_${morticianKey.replace('identifier_', '').replace('_text', '')}`],
      icon: 'mortician',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 }, }
    })
  }
}

export const morticianResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.player)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const viewCards = getCardIdsByPositions(newGamestate.card_positions, cardPositions)

  const shouldResetPlayerCardId = () => {
    if (viewCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
      return true
    }
    if (cardPositions.length === 1 && currentPlayerNumber === cardPositions[0] && viewCards[0].card.id === newGamestate.players[token].card.player_original_id) {
      return false
    }
    return true
  }

  if (shouldResetPlayerCardId()) {
    newGamestate.players[token].card.player_card_id = 0
  } else {
    newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
    newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: cardPositions,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(cardPositions)],
    icon: 'mortician',
    showCards: viewCards,
    uniqueInformations: { mortician: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
