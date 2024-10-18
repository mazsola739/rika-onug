import { SCENE } from "../../../constants"
import { hasAnyAlien, hasAnyVampire, hasAnyWerewolf } from "../../conditions"
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from "../../sceneUtils"
import { randomOracleQuestions } from "./oracle.constants"
import { thinkRandomNumber } from "./oracle.utils"
import { oracleQuestionRaising } from "./oraclequestion.raising"

//ORACLE_QUESTION
export const oracleQuestion = (gamestate, title) => {
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
        interaction = oracleQuestionRaising(newGamestate, token, title)
      } else {
        console.log("do nothing")
      }
  
      scene.push({ type: SCENE, title, token, narration, interaction })
    })
  
    newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
    newGamestate.scene = scene
  
    return newGamestate
  }
  