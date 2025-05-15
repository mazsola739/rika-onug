import { isActivePlayer } from '../../activePlayer'
import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

//TODO closed eyes!!!
export const empathAction = (gamestate, token, title, prefix) => {
  const activePlayerNumbers = gamestate.roles[prefix].active_player_numbers

  let selectable_cards = []
  let selectable_card_limit = {}
  const private_message = []
  let obligatory = true
  let vote = false

  if (activePlayerNumbers.includes(gamestate.players[token].player_number)) {
    selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
    selectable_card_limit = { player: 1, center: 0 }
    private_message.push('action_must_one_any')
    vote = true
  }
  if (!activePlayerNumbers.includes(gamestate.players[token].player_number) || (prefix === 'empath' && isActivePlayer(gamestate.players[token].card).EMPATH) || (prefix === 'doppelganger_empath' && isActivePlayer(gamestate.players[token].card).DOPPELGANGER_EMPATH)) {
    private_message.push('action_empath')
  }
  return generateRoleAction(gamestate, token, title, {
    private_message,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation: { vote },
    obligatory
  })
}
