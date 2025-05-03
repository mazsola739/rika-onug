import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { randomBlobKickoffText } from './blob.constants'
import { blobAction } from './blob.action'

export const blob = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const total_players = gamestate.total_players

  let availableBlobOptions = []

  if (total_players === 3) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') && !option.includes('3') && !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') && !option.includes('4'))
  }

  const randomKickoff = getRandomItemFromArray(availableBlobOptions)
  const narration = [randomKickoff, randomKickoff.includes('1p') ? 'blob_is_end_text' : 'blob_are_end_text']

  gamestate.blob = {
    instruction: ''
  }
  gamestate.blob.instruction = randomKickoff

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).BLOB) {
      gamestate.players[token].action_finished = false

      action = blobAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
