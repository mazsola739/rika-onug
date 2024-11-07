import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomBlobKickoffText } from './blob.constants'
import { blobInteraction } from './blob.interaction'

export const blob = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availableBlobOptions = []

  if (total_players === 3) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomKickoff = getRandomItemFromArray(availableBlobOptions)
  const narration = [randomKickoff, randomKickoff.includes('1p') ? 'blob_is_end_text' : 'blob_are_end_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 44 || (card.player_role_id === 44 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = blobInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
