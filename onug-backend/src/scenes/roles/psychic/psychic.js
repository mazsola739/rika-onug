import { COPY_PLAYER } from '../../../constants'
import {
  createAndSendSceneMessage,
  getAllPlayerTokens,
  getRandomItemFromArray,
} from '../../sceneUtils'
import { psychicKeys, randomPsychicInstructions } from './psychic.constants'
import { psychicInteraction } from './psychic.interaction'

export const psychic = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availablePsychicOptions = []

  if (total_players === 3) {
    availablePsychicOptions = randomPsychicInstructions.filter(
      (option) => !option.includes('view2')
    )
  }
  //todo better narration and save into constants
  /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  const narration = [
    `${prefix}_kickoff_text`,
    getRandomItemFromArray(availablePsychicOptions),
    getRandomItemFromArray(psychicKeys),
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'psychic') {
      if (
        card.player_original_id === 51 ||
        (card.player_role_id === 51 &&
          COPY_PLAYER.includes(card.player_original_id))
      ) {
        newGamestate.players[token].action_finished = false
        interaction = psychicInteraction(
          newGamestate,
          token,
          title,
          randomPsychicInstructions,
          psychicKeys
        )
      }
    } else if (prefix === 'doppelganger_psychic') {
      if (card.player_role_id === 51 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = psychicInteraction(
          newGamestate,
          token,
          title,
          randomPsychicInstructions,
          psychicKeys
        )
      }
    }

    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
