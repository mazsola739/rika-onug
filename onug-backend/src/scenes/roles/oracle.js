import { SCENE, centerCardPositions } from '../../constant'
import { createNumberArray, formatOracleAnswer, formatPlayerIdentifier, getAllPlayerTokens, getCardIdsByPositions, getPlayerNumberWithMatchingToken, getRandomItemFromArray, getRandomNumber, getSceneEndTime, isCurrentPlayerNumberEven, thinkRandomNumber } from '../../utils'
import { hasAnyAlien, hasAnyVampire, hasAnyWerewolf } from '../conditions'
import { isValidAnswerSelection, isValidCardSelection } from '../validate-response-data'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

const randomOracleQuestions = [
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

const oracleResponses = {
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

//ORACLE_QUESTION
export const oracle_question = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const selectedCards = newGameState.selected_cards

  let availableOracleQuestionOptions = []

  if (!hasAnyAlien(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('alien') || !question.includes('ripple'))
  } else if (!hasAnyVampire(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('vampire'))
  } else if (!hasAnyWerewolf(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('werewolf'))
  }

  const oracleQuestion = getRandomItemFromArray(availableOracleQuestionOptions)
  const theNumberIThinkingOf = thinkRandomNumber()

  const narration = ['oracle_kickoff_text', oracleQuestion]
  const actionTime = 8

  newGameState.oracle = {
    question: '',
    answer: '',
    aftermath: ''
  }
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
      break
  }

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 50) {
      newGameState.players[token].player_history[title].oracle = narration[1]
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
      answerOptions = createNumberArray(newGameState.total_players)
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

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    answer_options: answerOptions,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_oracle_question'],
    icon: 'oracle',
    uniqueInformations: { answer_options: answerOptions },
  })
}

export const oracle_question_response = (gameState, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gameState.players[token].player_history, title)) {
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

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
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

//ORACLE_ANSWER
export const oracle_answer = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const oracleQuestion = newGameState.oracle.question
  const oracleAnswer = newGameState.oracle.answer

  let narration = []
  let aftermath = false

  switch (oracleQuestion) {
    case 'oracle_evenodd_text':
      if (oracleAnswer === 'even') {
        narration = ['oracle_evenodd_even_text']
      } else {
        narration = ['oracle_evenodd_odd_text']
      }
      break
    case 'oracle_guessnumber_text':
      aftermath = true
      if (oracleAnswer === 'success') {
        narration = ['oracle_guessnumber_success_text']
      } else {
        narration = ['oracle_guessnumber_failure_text']
      }
      break
    case 'oracle_viewplayer_text': 
      const yes = oracleResponses[oracleQuestion].yes
      const no = oracleResponses[oracleQuestion].no
      const options = yes.concat(no)
      narration = [getRandomItemFromArray(options)]
      break
    case 'oracle_alienexchange_text':
      aftermath = true
      if (oracleAnswer === 'yes') {
        newGameState.alienexchange = true
        narration = ['oracle_alienexchange_yes_text']
      } else {
        newGameState.alienexchange = false
        narration = ['oracle_alienexchange_no_text']
      }
      break
    case 'oracle_ripple_text':
      aftermath = true
      if (oracleAnswer === 'yes') {
        newGameState.ripple = true
        narration = ['oracle_ripple_yes_text']
      } else {
        newGameState.ripple = false
        narration = ['oracle_ripple_no_text']
      }
      break
    default:
      if (oracleAnswer === 'yes') {
        aftermath = true
        narration = [getRandomItemFromArray(oracleResponses[oracleQuestion].yes)]
      } else {
        narration = [getRandomItemFromArray(oracleResponses[oracleQuestion].no)]
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

  return newGameState
}

export const oracle_answer_aftermath = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const oracleQuestion = newGameState.oracle.question
  const oracleAnswer = newGameState.oracle.answer
  const oracleAftermath = newGameState.oracle.aftermath

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerCard = { ...newGameState.card_positions[currentPlayerNumber].card }

  let showCards = []
  let limit = 0
  let privateMessage = []
  
  switch (oracleQuestion) {
    case 'oracle_guessnumber_text':
      if (oracleAftermath.includes('success')) {
        newGameState.oracle_eyes_open = true
        privateMessage = ['interaction_oracle_open_you_eyes']
      } else {
        newGameState.oracle_target = true

        newGameState.players[token].card.player_team = 'oracle'
        currentPlayerCard.team = 'oracle'
        privateMessage = ['interaction_oracle_team']
      }
      break
    case 'oracle_viewplayer_text':
      newGameState.players[token].card_or_mark_action = true

      if (oracleAftermath.includes('yes')) {
        showCards = getCardIdsByPositions(newGameState.card_positions, [`player_${oracleAnswer}`])
      } else {
        const randomPlayerNumber = getRandomNumber(1, newGameState.total_players)
        showCards = getCardIdsByPositions(newGameState.card_positions, [`player_${randomPlayerNumber}`])
      }

      privateMessage = ['interaction_selected_card', formatPlayerIdentifier(showCards)]
      break
    case 'oracle_alienteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        newGameState.players[token].card.player_team = 'alien'
        privateMessage = ['interaction_alien_team']
        if (oracleAftermath.includes('yes2')) {
          newGameState.players[token].card.player_role = 'ALIEN'
          currentPlayerCard.role = 'ALIEN'
          currentPlayerCard.team = 'alien'
          privateMessage = ['interaction_alien_role']
        }
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_werewolfteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        newGameState.players[token].card.player_team = 'werewolf'
        currentPlayerCard.team = 'werewolf'
        privateMessage = ['interaction_werewolf_team']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_vampireteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        newGameState.players[token].card.player_team = 'vampire'
        currentPlayerCard.team = 'vampire'
        privateMessage = ['interaction_vampire_team']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_centerexchange_text':
      if (!oracleAftermath.includes('yes2')) {
        limit = 1
        privateMessage = ['interaction_must_one_center']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_viewcenter_text':
      if (oracleAftermath.includes('yes1')) {
        limit = 1
        privateMessage = ['interaction_must_one_center']
      } else if (oracleAftermath.includes('yes2')) {
        limit = 2
        privateMessage = ['interaction_must_two_center']
      } else if (oracleAftermath.includes('yes3')) {
        limit = 3
        privateMessage = ['interaction_must_three_center']
      }
      break
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    viewed_cards: showCards,
    selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit } },
    uniqueInformations: { oracle: showCards },
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'oracle',
    showCards,
    selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit } },
    uniqueInformations: { oracle: showCards },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const oracle_answer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []
  let interaction = {}

  const oracleQuestion = newGameState.oracle.question
  const oracleAftermath = newGameState.oracle.aftermath

  if (oracleQuestion === 'oracle_centerexchange_text') {
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
    const currentPlayerCard = { ...newGameState.card_positions[currentPlayerNumber].card }
    const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]].card }
    newGameState.card_positions[currentPlayerNumber].card = selectedCard
    newGameState.card_positions[selected_card_positions[0]].card = currentPlayerCard

    newGameState.players[token].card.player_card_id = 0
    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: 'oracle',
      uniqueInformations: { oracle: [currentPlayerNumber, selected_card_positions[0]] },
    })
  } else if (oracleQuestion === 'oracle_viewcenter_text') {
    const limit = +oracleAftermath.replace('oracle_view_yes', '').replace('_text', '')
    const selectedCardPositions = selected_card_positions.slice(0, limit)
    const selectedCards = getCardIdsByPositions(newGameState.card_positions, selectedCardPositions)

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      viewed_cards: selectedCards,
    }

    const identifiers = formatPlayerIdentifier(selectedCardPositions)
    const message = ['interaction_saw_card', ...identifiers]

    interaction = generateRoleInteraction(newGameState, token, {
      private_message: message,
      icon: 'nostradamus',
      showCards: selectedCards,
      uniqueInformations: { nostradamus: selectedCardPositions },
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
