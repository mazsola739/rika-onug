import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomFamilyman } from './familyman.constants'
import { familymanInteraction } from './familyman.interaction'

export const familyman = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availableFamilyManOptions = []

  if (total_players === 3) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  }else if (total_players >= 4 && total_players < 5) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomAvailableOption = getRandomItemFromArray(availableFamilyManOptions)

  const narration = [
    hasDoppelganger
      ? 'doppelganger_familyman_kickoff_text'
      : 'familyman_kickoff_text',
    randomAvailableOption,
    randomFamilyman.includes('1p')
      ? 'familyman_is_end_text'
      : 'familyman_are_end_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 78 || (card.player_role_id === 78 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = familymanInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}