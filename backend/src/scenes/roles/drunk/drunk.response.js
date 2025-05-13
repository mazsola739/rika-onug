import { SPECIAL_VILLAGER_IDS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, swapCards, updateCardRoleAndTeam } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const drunkResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)

  if (SPECIAL_VILLAGER_IDS.includes(gamestate.positions.card_positions[currentPlayerNumber].card.id)) {
    updateCardRoleAndTeam(gamestate, currentPlayerNumber, 'VILLAGER', 'village')
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
