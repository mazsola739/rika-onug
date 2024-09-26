import { SCENE, CENTER_CARD_POSITIONS } from '../../constants'
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
export const oracle_question = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const selectedCards = newGamestate.selected_cards

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

  newGamestate.oracle = {
    question: '',
    answer: '',
    aftermath: ''
  }
  newGamestate.oracle.question = oracleQuestion

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      newGamestate.oracle.answer = '1'
      break
    case 'oracle_evenodd_text':
      newGamestate.oracle.answer = 'even'
      break
    case 'oracle_guessnumber_text':
      newGamestate.oracle.number = `${theNumberIThinkingOf}`
      newGamestate.oracle.answer = 'failure'
      break
    default:
      newGamestate.oracle.answer = 'no'
      break
  }

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 50) {
      newGamestate.players[token].player_history[title].oracle = narration[1]
      interaction = oracle_question_raising(newGamestate, token, title)
    } else {

    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const oracle_question_raising = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const oracleQuestion = newGamestate.oracle.question

  let answerOptions = []

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      answerOptions = createNumberArray(newGamestate.total_players)
      break
    case 'oracle_evenodd_text':
      const isCurrentPlayerEven = isCurrentPlayerNumberEven(newGamestate.players, token)
      newGamestate.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      break
    case 'oracle_guessnumber_text':
      answerOptions = createNumberArray(10)
      break
    default:
      answerOptions = ['yes', 'no']
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    answer_options: answerOptions,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_oracle_question'],
    icon: 'oracle',
    uniqueInformations: { answer_options: answerOptions },
  })
}

export const oracle_question_response = (gamestate, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const oracleQuestion = newGamestate.oracle.question

  if (oracleQuestion === 'oracle_guessnumber_text') {
    const answer = selected_answer
    const number = newGamestate.oracle.number
    if (answer === number) {
      newGamestate.oracle.answer = 'success'
    } else {
      newGamestate.oracle.answer = 'failure'
    }
  } else {
    newGamestate.oracle.answer = selected_answer
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    question: oracleQuestion,
    answer: selected_answer
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_oracle_answer', formatOracleAnswer(selected_answer)],
    icon: 'oracle',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

//ORACLE_ANSWER
export const oracle_answer = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const oracleQuestion = newGamestate.oracle.question
  const oracleAnswer = newGamestate.oracle.answer

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
        newGamestate.alienexchange = true
        narration = ['oracle_alienexchange_yes_text']
      } else {
        newGamestate.alienexchange = false
        narration = ['oracle_alienexchange_no_text']
      }
      break
    case 'oracle_ripple_text':
      aftermath = true
      if (oracleAnswer === 'yes') {
        newGamestate.ripple = true
        narration = ['oracle_ripple_yes_text']
      } else {
        newGamestate.ripple = false
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

    const card = newGamestate.players[token].card

    if (aftermath && card.player_original_id === 50) {
      newGamestate.oracle.aftermath = narration[0]
      interaction = oracle_answer_aftermath(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  return newGamestate
}

export const oracle_answer_aftermath = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const scene = []

  const oracleQuestion = newGamestate.oracle.question
  const oracleAnswer = newGamestate.oracle.answer
  const oracleAftermath = newGamestate.oracle.aftermath

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }

  let showCards = []
  let limit = 0
  let privateMessage = []
  
  switch (oracleQuestion) {
    case 'oracle_guessnumber_text':
      if (oracleAftermath.includes('success')) {
        newGamestate.oracle_eyes_open = true
        privateMessage = ['interaction_oracle_open_you_eyes']
      } else {
        newGamestate.oracle_target = true

        newGamestate.players[token].card.player_team = 'oracle'
        currentPlayerCard.team = 'oracle'
        privateMessage = ['interaction_oracle_team']
      }
      break
    case 'oracle_viewplayer_text':
      newGamestate.players[token].card_or_mark_action = true

      if (oracleAftermath.includes('yes')) {
        showCards = getCardIdsByPositions(newGamestate.card_positions, [`player_${oracleAnswer}`])
      } else {
        const randomPlayerNumber = getRandomNumber(1, newGamestate.total_players)
        showCards = getCardIdsByPositions(newGamestate.card_positions, [`player_${randomPlayerNumber}`])
      }

      privateMessage = ['interaction_selected_card', formatPlayerIdentifier(showCards)]
      break
    case 'oracle_alienteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        newGamestate.players[token].card.player_team = 'alien'
        privateMessage = ['interaction_alien_team']
        if (oracleAftermath.includes('yes2')) {
          newGamestate.players[token].card.player_role = 'ALIEN'
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
        newGamestate.players[token].card.player_team = 'werewolf'
        currentPlayerCard.team = 'werewolf'
        privateMessage = ['interaction_werewolf_team']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_vampireteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        newGamestate.players[token].card.player_team = 'vampire'
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

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards,
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit } },
    uniqueInformations: { oracle: showCards },
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    icon: 'oracle',
    showCards,
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit } },
    uniqueInformations: { oracle: showCards },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

export const oracle_answer_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []
  let interaction = {}

  const oracleQuestion = newGamestate.oracle.question
  const oracleAftermath = newGamestate.oracle.aftermath

  if (oracleQuestion === 'oracle_centerexchange_text') {
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
    const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
    const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
    newGamestate.card_positions[currentPlayerNumber].card = selectedCard
    newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard

    newGamestate.players[token].card.player_card_id = 0
    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: 'oracle',
      uniqueInformations: { oracle: [currentPlayerNumber, selected_card_positions[0]] },
    })
  } else if (oracleQuestion === 'oracle_viewcenter_text') {
    const limit = +oracleAftermath.replace('oracle_view_yes', '').replace('_text', '')
    const selectedCardPositions = selected_card_positions.slice(0, limit)
    const selectedCards = getCardIdsByPositions(newGamestate.card_positions, selectedCardPositions)

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: selectedCards,
    }

    const identifiers = formatPlayerIdentifier(selectedCardPositions)
    const message = ['interaction_saw_card', ...identifiers]

    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: message,
      icon: 'nostradamus',
      showCards: selectedCards,
      uniqueInformations: { nostradamus: selectedCardPositions },
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
