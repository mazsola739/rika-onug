import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { oracleResponses } from './oracle.constants'
import { oracleAnswerAftermath } from './oracleanswer.aftermath'

//ORACLE_ANSWER
export const oracleAnswer = (gamestate, title) => {
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
        { const yes = oracleResponses[oracleQuestion].yes
        const no = oracleResponses[oracleQuestion].no
        const options = yes.concat(no)
        narration = [getRandomItemFromArray(options)]
        break }
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
        interaction = oracleAnswerAftermath(newGamestate, token, title)
      }
  
      scene.push({ type: SCENE, title, token, narration, interaction })
    })
  
    return newGamestate
  }
  