import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { randomFamilyman } from './familyman.constants'
import { familymanAction } from './familyman.action'

export const familyman = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const total_players = gamestate.total_players

  let availableFamilyManOptions = []

  if (total_players === 3) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomAvailableOption = getRandomItemFromArray(availableFamilyManOptions)

  const narration = [
    hasDoppelganger ? 'doppelganger_familyman_kickoff_text' : 'familyman_kickoff_text',
    randomAvailableOption,
    randomAvailableOption.includes('1p') ? 'familyman_is_end_text' : 'familyman_are_end_text'
  ]

  gamestate.familyman = {
    instruction: ''
  }
  gamestate.familyman.instruction = randomAvailableOption

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).FAMILY_MAN) {
      gamestate.players[token].action_finished = false

      action = familymanAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
