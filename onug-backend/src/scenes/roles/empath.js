//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, pickRandomUpToThreePlayers, getAllPlayerTokens, getSceneEndTime, empathNumbers, getPlayerNumbersWithMatchingTokens } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'

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

export const empath = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const totalPlayers = newGameState.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const activePlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? activePlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]
  const actionTime = 8

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [activePlayers.map(player => parseInt(player.replace('identifier_player', '').replace('_text', '')))]
  } if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : 'odd'
    activePlayerNumbers = empathNumbers(totalPlayers, evenOdd)
  }

  newGameState.empath = {
    instruction: '',
  }
  newGameState.empath.instruction = randomEmpathInstruction
  
  tokens.forEach((token) => {
    let interaction = {}
    const playerNumber = newGameState.players[token].player_number
    
    if (activePlayerNumbers.includes(playerNumber)) {
      const card = newGameState.players[token].card
      const isNotEmpath = prefix === 'empath' && (card.player_original_id !== 77 || (card.player_role_id !== 20 && copyPlayerIds.includes(card.player_original_id)));
      const isNotDoppelgangerEmpath = prefix === 'doppelganger_empath' && (card.player_role_id !== 20 && card.player_original_id === 1);
    
      if (isNotEmpath || isNotDoppelgangerEmpath) {
        interaction = empath_interaction(newGameState, token, title);
      }
    }
    
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const empath_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  let icon = 'empath'
  const randomEmpathInstruction = newGameState.empath.instruction

  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

  switch (randomEmpathInstruction) {
    case 'empath_action1_text': //point in the direction of the player you think is the Empath.
      icon = 'empath'
      break
    case 'empath_action2_text': //point in the direction of the player you think is really good looking.
      icon = 'pretty'
      break
    case 'empath_action3_text': //point in the direction of the player you think is the most suspicious.
      icon = 'sus'
      break
    case 'empath_action4_text': //point in the direction of a player who smells really good.
      icon = 'smell'
      break
    case 'empath_action5_text': //point in the direction of a player you think is a sharp dresser.
      icon = 'dress'
      break
    case 'empath_action6_text': //point in the direction of the player who is awesome.
      icon = 'awesome'
      break
    case 'empath_action7_text': //point in the direction of the player you think everyone else is pointing at.
      icon = 'select'
      break
    case 'empath_action8_text': //point in the direction of the smartest player.
      icon = 'bulb'
      break
    case 'empath_action9_text': //point in the direction of the friendliest player.
      icon = 'friend'
      break
    case 'empath_action10_text': //point in the direction of the funniest player.
      icon = 'jest'
      break
    case 'empath_action11_text': //point in the direction a player who will win this game.
      icon = 'trophy'
      break
    case 'empath_action12_text': //point in the direction a player you really, really like.
      icon = 'like'
      break
    case 'empath_action13_text': //point in the direction of a player who you don't think anyone else will point at.
      icon = 'think'
      break
    case 'empath_action14_text': //point in the direction of the nicest player.
      icon = 'nice'
      break
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  }

  return {
    private_message: ['interaction_may_one_any'],
    icon,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
  }
}

export const empath_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const empath_vote = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const narration =  [`${prefix}_kickoff_text`, 'empath_kickoff2_text']
  const actionTime = 5

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card
    //TODO is not the empath here who get this, but empathKeys
    if (prefix === 'empath') {
      if (card.player_original_id === 77 || (card.player_role_id === 77 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = empath_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_empath') {
      if (card.player_role_id === 77 && card.player_original_id === 1) {
        interaction = empath_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

/* export const alien_vote = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (alienIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = alien_vote_result(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const alien_vote_result = (gameState, token, title) => {
  const newGameState = { ...gameState }

  newGameState.players[token].card_or_mark_action = true

  const mostVotedPlayer = findMostVoted(newGameState.alien_votes)

  //TODO alien helper or new alien || view card
  const selectedPosition = newGameState.card_positions[mostVotedPlayer[0]]
  newGameState.mark_positions.alien = selectedPosition

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    babyalien: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_alien', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon: 'alienhand',
    uniqueInformations: { babyalien: [mostVotedPlayer[0]] },
  })
}
 */