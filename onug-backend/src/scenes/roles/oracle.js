//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene-utils'

const random_oracle_question = [
  'oracle_alienteam_text',
  'oracle_werewolfteam_text',
  'oracle_vampireteam_text',
  'oracle_alienexchange_text',
  'oracle_centerexchange_text',
  'oracle_viewcenter_text',
  'oracle_ripple_text',
  'oracle_viewplayer_text',

  'oracle_evenodd_text',
  'oracle_guessnumber_text',
]

const oracle_responses = {
  oracle_alienteam_text: {
    yes: [
      'oracle_alienteam_yes_text',
      'oracle_alienteam_yes2_text',
      'oracle_teamswitch_yes_text',
    ],
    no: ['oracle_teamswitch_no_text'],
  },
  oracle_werewolfteam_text: {
    yes: ['oracle_werewolfteam_yes_text', 'oracle_teamswitch_yes_text'],
    no: ['oracle_teamswitch_no_text'],
  },
  oracle_vampireteam_text: {
    yes: ['oracle_vampireteam_yes_text', 'oracle_teamswitch_yes_text'],
    no: ['oracle_teamswitch_no_text'],
  },
  oracle_alienexchange_text: {
    yes: ['oracle_alienexchange_yes_text'],
    no: ['oracle_alienexchange_no_text'],
  },
  oracle_centerexchange_text: {
    yes: ['oracle_centerexchange_yes_text', 'oracle_centerexchange_yes2_text'],
    no: ['oracle_teamswitch_no_text'],
  },
  oracle_viewcenter_text: {
    yes: [
      'oracle_view_yes1_text',
      'oracle_view_yes2_text',
      'oracle_view_yes3_text',
    ],
    no: ['oracle_ripple_no_text'],
  },
  oracle_ripple_text: {
    yes: ['oracle_ripple_yes_text'],
    no: ['oracle_ripple_no_text'],
  },
  oracle_viewplayer_text: {
    yes: ['oracle_viewplayer_result_text'],
    no: ['oracle_viewplayer_result2_text'],
  },
}

export const oracle_question = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = [
    'oracle_kickoff_text',
    getRandomItemFromArray(random_oracle_question),
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  newGameState.oracle.question = narration[1]

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 50) {
      newGameState.players[token].player_history.oracle = narration[1]
      interaction = oracle_question_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const oracle_question_interaction = (gameState, token, title) => {
  return {}
}
//TODO newGameState.oracle.answer = ? if no answer do sure answer
export const oracle_question_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}

export const oracle_answer = (gameState, title) => {
  const newGameState = { ...gameState }
  const question = newGameState.oracle.question
  const answer = newGameState.oracle.answer
  let narration = []
  if (question === 'oracle_evenodd_text') {
    if (answer === 'even') {
      narration = ['oracle_evenodd_even_text']
    } else {
      narration = ['oracle_evenodd_odd_text']
    }
  } else if (question === 'oracle_guessnumber_text') {
    if (answer === 'success') {
      narration = ['oracle_guessnumber_success_text']
    } else {
      narration = ['oracle_guessnumber_failure_text']
    }
  } else {
    if (answer === 'yes') {
      narration = [getRandomItemFromArray(oracle_responses[question].yes)]
    } else {
      narration = [getRandomItemFromArray(oracle_responses[question].no)]
    }
  }
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 50) {
      newGameState.players[token].player_history.oracle = narration[0]
      interaction = oracle_answer_interaction(newGameState, token, title)
    }
  })

  delete newGameState.oracle
  return newGameState
}

export const oracle_answer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
