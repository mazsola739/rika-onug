import { ALL_ALIEN_IDS, ALL_COPY_PLAYER_IDS, MESSAGE, SCENE, VOTE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers, getSceneEndTime, getAlienPlayerNumbersByRoleIds, getAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getSelectableAnyPlayerNumbersWithNoShield, findUniqueElementsInArrays, getAnyEvenOrOddPlayers, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getNeighborByPosition, moveCards, formatPlayerIdentifier, getCardIdsByPlayerNumbers, getCardIdsByPositions, addVote, getPlayerTokensByPlayerNumber, findMostVoted } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

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

  newGameState.alien = {
    instruction: '',
    key: '',
    vote: false,
  }
  newGameState.alien.instruction = randomAlienInstruction
  newGameState.alien.key = alienKey
  newGameState.alien.vote = randomAlienInstruction === 'aliens_allview_text' || randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text'

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (ALL_ALIEN_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = aliens_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const aliens_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const aliens = getAlienPlayerNumbersByRoleIds(newGameState.players)
  const aliensWithoutShield = getAlienPlayerNumbersByRoleIdsWithNoShield(newGameState.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const randomAlienInstruction = newGameState.alien.instruction
  const alienKey = newGameState.alien.key

  let selectableCards = {}
  let showCards = []
  let privateMessage = ['interaction_aliens']
  let icon = randomAlienInstruction === 'aliens_stare_text' ? 'alienstare' : 'alien'

  if (alienKey.length > 1) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_', ''))
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(newGameState.players)
    const selectablePlayers = findUniqueElementsInArrays(playerNumbersWithNoShield, selectablePlayerNumbers)
    selectableCards = { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 } }
  } else {
    const evenOrOdd = alienKey.length === 1 && (alienKey[0].includes('even') ? 'even' : 'odd')
    const evenOrOddPlayers = evenOrOdd ? getAnyEvenOrOddPlayers(newGameState.players, evenOrOdd) : newGameState.players
    const selectableNonAlienPlayers = randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text' ? getSelectableAnyPlayerNumbersWithNoShield(evenOrOddPlayers) : getNonAlienPlayerNumbersByRoleIdsWithNoShield(evenOrOddPlayers)
    selectableCards = { selectable_cards: selectableNonAlienPlayers, selectable_card_limit: { player: 1, center: 0 } }
  }

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
    case 'aliens_allview_text':
      if (newGameState.players[token].shield) {
        newGameState.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push('interaction_may_one_any')
      }

      break
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (newGameState.players[token].shield) {
        newGameState.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(newGameState.card_positions, direction, aliensWithoutShield)
        newGameState.players[token].card_or_mark_action = true
        newGameState.card_positions = {
          ...newGameState.card_positions,
          ...updatedPlayerCards,
        }
        privateMessage.push('interaction_moved_yours', formatPlayerIdentifier([neighbor])[0])
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
        newGameState.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      break
    case 'aliens_timer_text':
      newGameState.vote_timer /= 2
      privateMessage.push('interaction_timer')

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      privateMessage.push('interaction_must_one_any_other')
      break
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    ...selectableCards,
    aliens,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon,
    showCards,
    selectableCards,
    uniqueInformations: { aliens },
  })
}

export const aliens_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const randomAlienInstruction = newGameState.alien.instruction
  const aliens = getAlienPlayerNumbersByRoleIds(newGameState.players)

  if (randomAlienInstruction === 'aliens_view_text') {

    const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card

    if (newGameState.players[token].card.player_original_id === selectedPositionCard.id) {
      newGameState.players[token].card.player_card_id = 0
    }
  
    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      viewed_cards: showCards,
    }
  
    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
      icon: 'alienhand',
      uniqueInformations: { aliens, alienhand: showCards },
    })
  
    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene
  
    return newGameState
  }

  const votes = addVote(newGameState.players[token].player_number, selected_card_positions[0], newGameState.alien_votes)

  newGameState.players[token].alien_vote = selected_card_positions[0]
  newGameState.alien_votes = votes

  const alienTokens = getPlayerTokensByPlayerNumber(newGameState.players, aliens)

  alienTokens.forEach((alienToken) => {
    websocketServerConnectionsPerRoom[newGameState.room_id][alienToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    aliens,
    alien_vote: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'alien',
    uniqueInformations: { aliens },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const aliens_vote = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (ALL_ALIEN_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = aliens_vote_result(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const aliens_vote_result = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const randomAlienInstruction = newGameState.alien.instruction
  const mostVotedPlayer = findMostVoted(newGameState.alien_votes)
  
  let privateMessage = []
  let icon = 'babyalien'
  let showCards = []
  let uniqueInformations = {}
  
  if (randomAlienInstruction === 'aliens_allview_text') {
    newGameState.players[token].card_or_mark_action = true
    privateMessage = ['interaction_saw_card', formatPlayerIdentifier(mostVotedPlayer)[0]]
    icon = 'alienstare'
    showCards = getCardIdsByPlayerNumbers([mostVotedPlayer[0]])
    uniqueInformations = { alienstare: [mostVotedPlayer[0]] }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    uniqueInformations = { babyalien: [mostVotedPlayer[0]] }
    
    const selectedPlayer = getPlayerTokensByPlayerNumber(newGameState.players, [mostVotedPlayer[0]])
    const selectedPositionCard = newGameState.card_positions[mostVotedPlayer[0]].card
    
    if (newGameState.players[token].card.player_original_id === selectedPositionCard.id) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[selectedPlayer[0]].card.player_team = 'alien'
    newGameState.card_positions[mostVotedPlayer[0]].card.team = 'alien'
    
    if (randomAlienInstruction === 'aliens_newalien_text') {
      privateMessage = ['interaction_turned_newalien']
      newGameState.players[selectedPlayer[0]].card.player_role = 'ALIEN'
      newGameState.card_positions[mostVotedPlayer[0]].card.role = 'ALIEN'
    } else if (randomAlienInstruction === 'aliens_alienhelper_text') {
      privateMessage = ['interaction_turned_alienhelper']
    }

    websocketServerConnectionsPerRoom[newGameState.room_id][mostVotedPlayer[0]].send(
      JSON.stringify({
        type: MESSAGE,
        message: (randomAlienInstruction === 'aliens_newalien_text') ? ['interaction_alien_role'] : ['interaction_alien_team'],
        icon: 'babyalien',
      })
    )
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    ...uniqueInformations,
  }
  
  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon,
    showCards,
    uniqueInformations,
  })
}
