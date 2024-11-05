import { COPY_PLAYER } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomExposerInstructions } from './exposer.constants'
import { exposerInteraction } from './exposer.interaction'

export const exposer = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
 //todo better narration

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  newGamestate.exposer = {
    instruction: '',
  }
  newGamestate.exposer.instruction = randomExposerInstruction

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'exposer') {
      if (card.player_original_id === 46 || (card.player_role_id === 46 && COPY_PLAYER.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = exposerInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (card.player_role_id === 46 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = exposerInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
