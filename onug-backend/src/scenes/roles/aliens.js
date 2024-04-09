//@ts-check
import { alienIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAlienPlayerNumbersByRoleIds, getAllPlayerTokens, getAnyEvenOrOddPlayers, getSelectableOtherPlayerNumbersWithNoShield, getNeighborByPosition, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getRandomItemFromArray, getSceneEndTime, pickRandomUpToThreePlayers, getSelectableAnyPlayerNumbersWithNoShield, findUniqueElementsInArrays, moveCards, formatPlayerIdentifier, getCardIdsByPlayerNumbers } from '../../utils'
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
  const aliensWithoutShield = getNonAlienPlayerNumbersByRoleIdsWithNoShield(newGameState.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

  let selectablePlayers = []
  let showCards = []
  let privateMessage = ['interaction_aliens']
  let requiredCardSelection
  let icon = 'alien'

  if (alienKey.length > 1) {
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(newGameState.players)
    const selectablePlayerNumbers = (alienKey.filter(key => key.includes('identifier_player'))).map(key => key.replace('identifier_', ''))
    selectablePlayers = findUniqueElementsInArrays(playerNumbersWithNoShield, selectablePlayerNumbers)
  } else if (alienKey.length === 1) {
    switch (alienKey[0]) {
      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
      case 'identifier_evenplayers_text':
      case 'identifier_oddplayers_text':
        const evenOrOdd = alienKey.includes('even') ? 'even' : 'odd'
        const evenOrOddPlayers = getAnyEvenOrOddPlayers(newGameState.players, evenOrOdd)
        selectablePlayers = getSelectableOtherPlayerNumbersWithNoShield(evenOrOddPlayers, evenOrOdd)
        break
      case 'identifier_any_text':
      case 'identifier_everyone_text':
        selectablePlayers = getSelectableOtherPlayerNumbersWithNoShield(newGameState.players)
        break
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

      if (randomAlienInstruction === 'aliens_allview_text') {
        //TODO vote
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
        //TODO privateMessage.push(aliensWithoutShield )
      }

      break
    case 'aliens_timer_text':
      newGameState.vote_timer = gameState.vote_timer / 2
      privateMessage = ['interaction_timer']
      break
    case 'aliens_newalien_text': //Tap one of the fists to turn that player into an alien from MUST

      break
    case 'aliens_alienhelper_text': //Tap one of the fists to turn that player into alien team, but isn't an alien from MUST

      break
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectableCards: { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 } },
    required_card_selection: requiredCardSelection, private_message: privateMessage,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: icon,
    showCards,
    selectableCards: { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 } },
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

export const alien_vote = (gameState, aliens, selected_card_positions, title) => {}
