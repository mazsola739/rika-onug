import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getSceneEndTime, moveCardsButYourOwn } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateAnswerSelection } from '../validate-response-data'

export const villageidiot = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['villageidiot_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 26 || (card.player_role_id === 26 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = villageidiotInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const villageidiotInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    answer_options: ['left', 'right'],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_direction'],
    icon: title === 'RASCAL' ? 'prank' : 'jest',
    uniqueInformations: { answer_options: ['left', 'right'] },
  })
}

export const villageidiotResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayer = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const updatedPlayerCards = moveCardsButYourOwn(newGamestate.card_positions, selected_answer, currentPlayer)

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.card_positions = {
    ...newGamestate.card_positions,
    ...updatedPlayerCards
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    direction: selected_answer,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
    icon: title === 'RASCAL' ? 'prank' : 'jest',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
