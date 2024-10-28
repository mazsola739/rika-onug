import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomBlobKickoffText } from './blob.constants'
import { blobInteraction } from './blob.interaction'

export const blob = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availableBlobOptions = []

  if (total_players === 3) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomKickoff = getRandomItemFromArray(availableBlobOptions)
  const narration = [
    randomKickoff,
    randomKickoff.includes('1p') 
      ? 'blob_is_end_text' 
      : 'blob_are_end_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 44 || (card.player_role_id === 44 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = blobInteraction(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
