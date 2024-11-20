import { generateRoleInteraction, getPlayerNeighborsByToken } from '../../sceneUtils'

export const thingInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighbors = getPlayerNeighborsByToken(newGamestate.players, token, 'both', 1)

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: neighbors,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_neighbor'],
    selectableCards: {
      selectable_cards: neighbors,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true
  })
}
