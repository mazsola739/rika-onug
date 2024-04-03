//@ts-check
import { SCENE } from '../../constant'
import { createNumberArray, formatOracleAnswer, formatPlayerIdentifier, getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime, isCurrentPlayerNumberEven, thinkRandomNumber } from '../../utils'
import { isValidAnswerSelection, isValidCardSelection } from '../validate-response-data';
import { generateRoleInteraction } from './../generate-scene-role-interactions';

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

const oracleQuestion = getRandomItemFromArray(random_oracle_question)
const theNumberIThinkingOf = thinkRandomNumber()


export const oracle_question = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    'oracle_kickoff_text',
    oracleQuestion,
  ]
  const actionTime = 8

  newGameState.oracle.question = oracleQuestion
  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      newGameState.oracle.answer = '1'
      break
    case 'oracle_evenodd_text':
      newGameState.oracle.answer = 'even'
      break
    case 'oracle_guessnumber_text':
      newGameState.oracle.number = `${theNumberIThinkingOf}`
      newGameState.oracle.answer = 'failure'
      break
    default:
      newGameState.oracle.answer = 'no'
      break;
  }

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 50) {
      newGameState.players[token].player_history.oracle = narration[1]
      interaction = oracle_question_raising(newGameState, token, title)
    } else {

    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const oracle_question_raising = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const oracleQuestion = newGameState.oracle.question

  let answerOptions = []

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      answerOptions = createNumberArray(Object.keys(newGameState.players).length)
      break
    case 'oracle_evenodd_text':
      const isCurrentPlayerEven = isCurrentPlayerNumberEven(newGameState.players, token)
      newGameState.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      break
    case 'oracle_guessnumber_text':
      answerOptions = createNumberArray(10)
      break
    default:
      answerOptions = ['yes', 'no']
      break
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    answer_options: answerOptions,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_oracle_question'],
    icon: 'oracle',
    uniqueInformations: { answer_options: answerOptions },
  })
}

export const oracle_question_response = (gameState, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const oracleQuestion = newGameState.oracle.question

  if (oracleQuestion === 'oracle_guessnumber_text') {
    const answer = selected_answer
    const number = newGameState.oracle.number
    if (answer === number) {
      newGameState.oracle.answer = 'success'
    } else {
      newGameState.oracle.answer = 'failure'
    }
  } else {
    newGameState.oracle.answer = selected_answer
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    question: oracleQuestion,
    answer: selected_answer
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_oracle_answer', formatOracleAnswer(selected_answer)],
    icon: 'oracle',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const oracle_answer = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const question = newGameState.oracle.question
  const answer = newGameState.oracle.answer

  let narration = []
  let aftermath = false

  switch (question) {
    case 'oracle_evenodd_text':
      if (answer === 'even') {
        narration = ['oracle_evenodd_even_text']
      } else {
        narration = ['oracle_evenodd_odd_text']
      }
      break
    case 'oracle_guessnumber_text':
      aftermath = true
      if (answer === 'success') {
        narration = ['oracle_guessnumber_success_text']
      } else {
        narration = ['oracle_guessnumber_failure_text']
      }
      break
    case 'oracle_viewplayer_text':
      aftermath = true
      const yes = oracle_responses[question].yes
      const no = oracle_responses[question].no
      const options = yes.concat(no)

      narration = [getRandomItemFromArray(options)]
      break
    default:
      //todo ripple and alien exchange saving!
      if (answer === 'yes') {
        aftermath = true
        narration = [getRandomItemFromArray(oracle_responses[question].yes)]
      } else {
        narration = [getRandomItemFromArray(oracle_responses[question].no)]
      }
      break
  }

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (aftermath && card.player_original_id === 50) {
      newGameState.oracle.aftermath = narration[0]
      interaction = oracle_answer_aftermath(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  delete newGameState.oracle
  return newGameState
}

export const oracle_answer_aftermath = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const oracleQuestion = newGameState.oracle.question
  const oracleAftermath = newGameState.oracle.aftermath
  let privateMessage = []

  switch (oracleQuestion) {
    case 'oracle_guessnumber_text':
      //success oracle can open eyes
      //failure oracle team, new wining condition to everyone
      break
    case 'oracle_viewplayer_text':
      //result2 random player number
      //result selected answer
      break
    case 'oracle_alienteam_text':
      //yes card is now an alien card
      //yes2 win with aliens, but not alien (team?)
      //teamswitch_yes stays oracle and village team
      break
    case 'oracle_werewolfteam_text':
      //teamswitch_yes stays oracle and village team
      //yes werewolf card
      break
    case 'oracle_vampireteam_text':
      //teamswitch_yes stays oracle and village team
      //yes vampire card
      break
    case 'oracle_centerexchange_text':
      //yes2 no card change 
      //yes can pick center card
      break
    case 'oracle_viewcenter_text':
      //yes1 can pick 1 center card
      //yes2 can pick 2 center card
      //yes3 can pick 3 center card
      break
    case 'oracle_viewplayer_text':
      //selectable player number
      break
  }
  
  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    aftermath: oracleAftermath
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'oracle',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

//TODO finish view card
export const oracle_answer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [selected_card_positions[0], 'center_wolf'],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_wolf'])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    icon: 'claw',
    uniqueInformations: { swap: [selected_card_positions[0], 'center_wolf'], claw: [selected_card_positions[0]], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}