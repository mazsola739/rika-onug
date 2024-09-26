import { ALL_ALIEN_IDS, ALL_COPY_PLAYER_IDS, MESSAGE, SCENE, VOTE } from '../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers, getSceneEndTime, getAlienPlayerNumbersByRoleIds, getAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getSelectableAnyPlayerNumbersWithNoShield, findUniqueElementsInArrays, getAnyEvenOrOddPlayers, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getNeighborByPosition, moveCards, formatPlayerIdentifier, getCardIdsByPlayerNumbers, getCardIdsByPositions, addVote, getPlayerTokensByPlayerNumber, findMostVoted } from '../../utils'
import { webSocketServerConnectionsPerRoom } from '../../websocket/connections'
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

export const aliens = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['aliens_kickoff_text']
  const randomAlienInstruction = newGamestate.alienexchange ? getRandomItemFromArray(['aliens_left_text', 'aliens_right_text']) : getRandomItemFromArray(randomAlienInstructions)
  let alienKey = []
  const actionTime = 8

  if (randomAlienInstruction.includes('view')) {
    alienKey = [getRandomItemFromArray(alienAnyKeys)]
    if (alienKey[0] === 'activePlayers') {
      alienKey = pickRandomUpToThreePlayers(newGamestate.total_players, 'conjunction_and')
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

  newGamestate.alien = {
    instruction: '',
    key: '',
    vote: false,
  }
  newGamestate.alien.instruction = randomAlienInstruction
  newGamestate.alien.key = alienKey
  newGamestate.alien.vote = randomAlienInstruction === 'aliens_allview_text' || randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text'

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_ALIEN_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = aliens_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const aliens_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)
  const aliensWithoutShield = getAlienPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const randomAlienInstruction = newGamestate.alien.instruction
  const alienKey = newGamestate.alien.key

  let selectableCards = {}
  let showCards = []
  let privateMessage = ['interaction_aliens']
  let icon = randomAlienInstruction === 'aliens_stare_text' ? 'alienstare' : 'alien'

  if (alienKey.length > 1) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_', ''))
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(newGamestate.players)
    const selectablePlayers = findUniqueElementsInArrays(playerNumbersWithNoShield, selectablePlayerNumbers)
    selectableCards = { selectable_cards: selectablePlayers, selectable_card_limit: { player: 1, center: 0 } }
  } else {
    const evenOrOdd = alienKey.length === 1 && (alienKey[0].includes('even') ? 'even' : 'odd')
    const evenOrOddPlayers = evenOrOdd ? getAnyEvenOrOddPlayers(newGamestate.players, evenOrOdd) : newGamestate.players
    const selectableNonAlienPlayers = randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text' ? getSelectableAnyPlayerNumbersWithNoShield(evenOrOddPlayers) : getNonAlienPlayerNumbersByRoleIdsWithNoShield(evenOrOddPlayers)
    selectableCards = { selectable_cards: selectableNonAlienPlayers, selectable_card_limit: { player: 1, center: 0 } }
  }

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
    case 'aliens_allview_text':
      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push('interaction_may_one_any')
      }

      break
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(newGamestate.card_positions, direction, aliensWithoutShield)
        newGamestate.players[token].card_or_mark_action = true
        newGamestate.card_positions = {
          ...newGamestate.card_positions,
          ...updatedPlayerCards,
        }
        privateMessage.push('interaction_moved_yours', formatPlayerIdentifier([neighbor])[0])
      }

      break
    case 'aliens_show_text':
      showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, aliensWithoutShield)
      showCards.forEach((key) => {
        const card = newGamestate.card_positions[key].card

        if (newGamestate.players[token]?.card?.original_id === card.id && currentPlayerNumber !== key) {
          newGamestate.players[token].card.player_card_id = 0
        } else if (currentPlayerNumber === key) {
          newGamestate.players[token].card.player_card_id = card.id
          newGamestate.players[token].card.player_team = card.team
        }
      })

      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
        icon = 'shielded'
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      break
    case 'aliens_timer_text':
      newGamestate.vote_timer /= 2
      privateMessage.push('interaction_timer')

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      privateMessage.push('interaction_must_one_any_other')
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...selectableCards,
    aliens,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    icon,
    showCards,
    selectableCards,
    uniqueInformations: { aliens },
  })
}

export const aliens_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const randomAlienInstruction = newGamestate.alien.instruction
  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)

  if (randomAlienInstruction === 'aliens_view_text') {

    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: showCards,
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
      icon: 'alienhand',
      uniqueInformations: { aliens, alienhand: showCards },
    })
  
    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }

  const votes = addVote(newGamestate.players[token].player_number, selected_card_positions[0], newGamestate.alien_votes)

  newGamestate.players[token].alien_vote = selected_card_positions[0]
  newGamestate.alien_votes = votes

  const alienTokens = getPlayerTokensByPlayerNumber(newGamestate.players, aliens)

  alienTokens.forEach((alienToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][alienToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    aliens,
    alien_vote: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'alien',
    uniqueInformations: { aliens },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

export const aliens_vote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  const scene = []
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_ALIEN_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = aliens_vote_result(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const aliens_vote_result = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const randomAlienInstruction = newGamestate.alien.instruction
  const mostVotedPlayer = findMostVoted(newGamestate.alien_votes)
  
  let privateMessage = []
  let icon = 'babyalien'
  let showCards = []
  let uniqueInformations = {}
  
  if (randomAlienInstruction === 'aliens_allview_text') {
    newGamestate.players[token].card_or_mark_action = true
    privateMessage = ['interaction_saw_card', formatPlayerIdentifier(mostVotedPlayer)[0]]
    icon = 'alienstare'
    showCards = getCardIdsByPlayerNumbers([mostVotedPlayer[0]])
    uniqueInformations = { alienstare: [mostVotedPlayer[0]] }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    uniqueInformations = { babyalien: [mostVotedPlayer[0]] }
    
    const selectedPlayer = getPlayerTokensByPlayerNumber(newGamestate.players, [mostVotedPlayer[0]])
    const selectedPositionCard = newGamestate.card_positions[mostVotedPlayer[0]].card
    
    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[selectedPlayer[0]].card.player_team = 'alien'
    newGamestate.card_positions[mostVotedPlayer[0]].card.team = 'alien'
    
    if (randomAlienInstruction === 'aliens_newalien_text') {
      privateMessage = ['interaction_turned_newalien']
      newGamestate.players[selectedPlayer[0]].card.player_role = 'ALIEN'
      newGamestate.card_positions[mostVotedPlayer[0]].card.role = 'ALIEN'
    } else if (randomAlienInstruction === 'aliens_alienhelper_text') {
      privateMessage = ['interaction_turned_alienhelper']
    }

    webSocketServerConnectionsPerRoom[newGamestate.room_id][mostVotedPlayer[0]].send(
      JSON.stringify({
        type: MESSAGE,
        message: (randomAlienInstruction === 'aliens_newalien_text') ? ['interaction_alien_role'] : ['interaction_alien_team'],
        icon: 'babyalien',
      })
    )
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...uniqueInformations,
  }
  
  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    icon,
    showCards,
    uniqueInformations,
  })
}
