//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getPlayerNumberWithMatchingToken } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

const randomMorticianInstructions = ['mortician_1card_text', 'mortician_2cards_text']
const morticianKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
const createMortician = prefix => [`${prefix}_kickoff_text`, randomMorticianInstruction, morticianKey]

export const mortician = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createMortician(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'mortician') {
      if (card.player_original_id === 49 || (card.player_role_id === 49 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = mortician_interaction(newGameState, token, title, randomMorticianInstruction, morticianKey)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = mortician_interaction(newGameState, token, title, randomMorticianInstruction, morticianKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const mortician_interaction = (gameState, token, title, randomMorticianInstruction, morticianKey) => {
  const newGameState = { ...gameState }

  if (morticianKey === 'identifier_yourself_text') {
    if (!newGameState.players[token].shield) {
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(gameState.players, token)

      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        selectable_cards: currentPlayerNumber, selectable_card_limit: { player: 1, center: 0 },
      }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_may_look_yourself'],
        icon: 'coffin',
        selectableCards: { selectable_cards: currentPlayerNumber, selectable_card_limit: { player: 1, center: 0 } },
      })
    } else {
      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        shielded: true,
      }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_shielded'],
        icon: 'shield',
        uniqInformations: { shielded: true },
      })
    }
  } else if (morticianKey.includes('neighbor')) {
    const direction = morticianKey.includes('left') ? 'left' : morticianKey.includes('right') ? 'right' : 'both'
    const selectablePlayers = getPlayerNeighborsByToken(newGameState.players, direction, 1)
    const selectablePlayerNumbers = getSelectablePlayersWithNoShield(selectablePlayers)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: randomMorticianInstruction.includes('1') ? 1 : 2, center: 0 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: [''],
      icon: 'coffin',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: randomMorticianInstruction.includes('1') ? 1 : 2, center: 0 }, }
    })
  }
}

export const mortician_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
