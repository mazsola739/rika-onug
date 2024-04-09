//@ts-check
import { alienIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers, getSceneEndTime, getAlienPlayerNumbersByRoleIds, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getSelectableAnyPlayerNumbersWithNoShield, findUniqueElementsInArrays, getAnyEvenOrOddPlayers, getSelectableOtherPlayerNumbersWithNoShield, getNeighborByPosition, moveCards, formatPlayerIdentifier, getCardIdsByPlayerNumbers, getAlienPlayerNumbersByRoleIdsWithNoShield } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

const randomAlienInstructions = [
  'aliens_view_text',
  'aliens_allview_text',
  'aliens_stare_text',
  'aliens_left_text',
  'aliens_right_text',
  'aliens_show_text',
  'aliens_timer_text',
  'aliens_newalien_text',
  'aliens_alienhelper_text',
]
const alienAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
const alienAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
]

export const aliens = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['aliens_kickoff_text']
  const randomAlienInstruction = newGameState.alienexchange ? getRandomItemFromArray(['aliens_left_text', 'aliens_right_text']) : getRandomItemFromArray(randomAlienInstructions)
  let alienKey = []
  const actionTime = 8

  if (randomAlienInstruction.includes('view')) {
    alienKey = [getRandomItemFromArray(alienAnyKeys)]
    if (alienKey[0] === 'activePlayers') {
      alienKey = pickRandomUpToThreePlayers(newGameState.total_players, 'conjunction_and')
      narration.push(...alienKey)
      narration.push(randomAlienInstruction)
    }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    alienKey = [getRandomItemFromArray(alienAllKeys)]
    narration.push(randomAlienInstruction)
    narration.push(...alienKey)
  } else {
    narration.push(randomAlienInstruction)
  }

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (alienIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = aliens_interaction(newGameState, token, title, randomAlienInstruction, alienKey)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const aliens_interaction = (gameState, token, title, randomAlienInstruction, alienKey) => {
  const newGameState = { ...gameState }
  
  const aliens = getAlienPlayerNumbersByRoleIds(newGameState.players)
  const aliensWithoutShield = getAlienPlayerNumbersByRoleIdsWithNoShield(newGameState.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

  let selectableCards = {}
  let showCards = []
  let privateMessage = ['interaction_aliens']
  let icon = 'alien'

  if (alienKey.length > 1) {
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(newGameState.players)
    const selectablePlayerNumbers = (alienKey.filter(key => key.includes('identifier_player'))).map(key => key.replace('identifier_', ''))
    const selectablePlayers = findUniqueElementsInArrays(playerNumbersWithNoShield, selectablePlayerNumbers)

    selectableCards = { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 }, }
  } else if (alienKey.length === 1 && (alienKey[0].includes('even') || alienKey[0].includes('odd'))) {

    const evenOrOdd = alienKey.includes('even') ? 'even' : 'odd'
    const evenOrOddPlayers = getAnyEvenOrOddPlayers(newGameState.players, evenOrOdd)

    if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
      const selectableNonAlienEvenOddPlayers = getSelectableAnyPlayerNumbersWithNoShield(evenOrOddPlayers)
      selectableCards = { selectable_cards: selectableNonAlienEvenOddPlayers, selectable_card_limit: { player: 1, center: 0 }, }
    } else {
      const selectableEvenOddPlayers = getNonAlienPlayerNumbersByRoleIdsWithNoShield(evenOrOddPlayers)
      selectableCards = { selectable_cards: selectableEvenOddPlayers, selectable_card_limit: { player: 1, center: 0 }, }
    }
  } else {
    if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
      const selectableNonAlienPlayers = getSelectableAnyPlayerNumbersWithNoShield(newGameState.players)
      selectableCards = { selectable_cards: selectableNonAlienPlayers, selectable_card_limit: { player: 1, center: 0 }, }
    } else {
      const selectablePlayers = getNonAlienPlayerNumbersByRoleIdsWithNoShield(newGameState.players)
      selectableCards = { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 }, }
    }
  }

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
    case 'aliens_allview_text':
      if (newGameState.players[token].shield) {
        newGameState.players[token].player_history.shielded = true

        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push('interaction_may_one_any')
      }

      break
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (newGameState.players[token].shield) {
        newGameState.players[token].player_history.shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(newGameState.card_positions, direction, aliensWithoutShield)

        newGameState.players[token].card_or_mark_action = true

        newGameState.card_positions = {
          ...newGameState.card_positions,
          ...updatedPlayerCards
        }

        privateMessage.push(...['interaction_moved_yours', formatPlayerIdentifier([neighbor])[0]])
      }

      break
    case 'aliens_show_text':
      showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, aliensWithoutShield)

      showCards.forEach((key) => {
        const card = newGameState.card_positions[key].card

        if (newGameState.players[token]?.card?.original_id === card.id && currentPlayerNumber !== key) {
          newGameState.players[token].card.player_card_id = 0
        } else if (currentPlayerNumber === key) {
          newGameState.players[token].card.player_card_id = card.id
          newGameState.players[token].card.player_team = card.team
        }
      })

      if (newGameState.players[token].shield) {
        newGameState.players[token].player_history.shielded = true

        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      break
    case 'aliens_timer_text':
      newGameState.vote_timer = gameState.vote_timer / 2
      privateMessage.push('interaction_timer')

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      privateMessage.push('interaction_must_one_any_other')

      break
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectableCards,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: icon,
    showCards,
    selectableCards,
    uniqueInformations: { aliens },
  })
}

export const aliens_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const aliens_vote = (gameState, title) => {}
