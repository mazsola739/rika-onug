import { COPY_PLAYER_IDS, SCENE, VOTE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers, empathNumbers, getSceneEndTime, getPlayerNumbersWithMatchingTokens, addVote, getEmpathTokensByRoleIds, getDoppelgangerEmpathTokensByRoleIds, formatPlayerIdentifier, findMostVoted } from '../../../utils'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

const empathKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]
const randomEmpathInstructions = [
  'empath_action1_text',
  'empath_action2_text',
  'empath_action3_text',
  'empath_action4_text',
  'empath_action5_text',
  'empath_action6_text',
  'empath_action7_text',
  'empath_action8_text',
  'empath_action9_text',
  'empath_action10_text',
  'empath_action11_text',
  'empath_action12_text',
  'empath_action13_text',
  'empath_action14_text',
]

export const empath = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const totalPlayers = newGamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]
  const actionTime = 8

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [randomPlayers.map(player => parseInt(player.replace('identifier_player', '').replace('_text', '')))]
  } else if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text' || randomKey === 'identifier_everyone_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = empathNumbers(totalPlayers, evenOdd)
  }

  newGamestate.empath = {
    instruction: '',
    icon: ''
  }
  newGamestate.empath.instruction = randomEmpathInstruction
  
  tokens.forEach((token) => {
    let interaction = {}
    const playerNumber = newGamestate.players[token].player_number
    
    if (activePlayerNumbers.includes(playerNumber)) {
      const card = newGamestate.players[token].card
      const isNotEmpath = prefix === 'empath' && (card.player_original_id !== 77 || (card.player_role_id !== 20 && COPY_PLAYER_IDS.includes(card.player_original_id)));
      const isNotDoppelgangerEmpath = prefix === 'doppelganger_empath' && (card.player_role_id !== 20 && card.player_original_id === 1);
    
      if (isNotEmpath || isNotDoppelgangerEmpath) {
        interaction = empathInteraction(newGamestate, token, title);
      }
    }
    
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const empathInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  let icon = 'empath'
  const randomEmpathInstruction = newGamestate.empath.instruction

  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

  switch (randomEmpathInstruction) {
    case 'empath_action1_text':
      icon = 'empath'
      break
    case 'empath_action2_text':
      icon = 'pretty'
      break
    case 'empath_action3_text':
      icon = 'sus'
      break
    case 'empath_action4_text':
      icon = 'smell'
      break
    case 'empath_action5_text':
      icon = 'dress'
      break
    case 'empath_action6_text':
      icon = 'awesome'
      break
    case 'empath_action7_text':
      icon = 'select'
      break
    case 'empath_action8_text':
      icon = 'bulb'
      break
    case 'empath_action9_text':
      icon = 'friend'
      break
    case 'empath_action10_text':
      icon = 'jest'
      break
    case 'empath_action11_text':
      icon = 'trophy'
      break
    case 'empath_action12_text':
      icon = 'like'
      break
    case 'empath_action13_text':
      icon = 'think'
      break
    case 'empath_action14_text':
      icon = 'nice'
      break
  }

  newGamestate.empath.icon = icon

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return {
    private_message: ['interaction_may_one_any'],
    icon,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
    player_name: newGamestate.players[token].name,
    player_number: newGamestate.players[token].player_number,
    ...newGamestate.players[token].card,
  }
}

export const empathResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const votes = addVote(newGamestate.players[token].player_number, selected_card_positions[0], newGamestate.empath_votes)

  newGamestate.players[token].empath_vote = selected_card_positions[0]
  newGamestate.empath_votes = votes

  const empathTokens = title === 'empath' ? getEmpathTokensByRoleIds(newGamestate.plyers) : getDoppelgangerEmpathTokensByRoleIds(newGamestate.plyers)

  empathTokens.forEach((empathToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][empathToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    empath_vote: [selected_card_positions[0]]
  }

  const icon = newGamestate.empath.icon

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]],
    icon,
    uniqueInformations: { empath_vote: [selected_card_positions[0]], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

export const empathVote = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const narration =  [`${prefix}_kickoff_text`, 'empath_kickoff2_text']
  const actionTime = 5

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'empath') {
      if (card.player_original_id === 77 || (card.player_role_id === 77 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = empathVoteResult(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_empath') {
      if (card.player_role_id === 77 && card.player_original_id === 1) {
        interaction = empathVoteResult(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const empathVoteResult = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const icon = newGamestate.empath.icon
  const mostVotedPlayer = findMostVoted(newGamestate.empath_votes)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    [icon]: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vote_result', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon,
    uniqueInformations: { [icon]: [mostVotedPlayer[0]] },
  })
}
