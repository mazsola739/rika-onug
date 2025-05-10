import { getPlayerNumbersByGivenConditions, generateRoleAction } from '../../sceneUtils'

export const curatorAction = (gamestate, token, title) => {
  const selectablePlayersWithNoShield = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const getSelectablePlayersWithNoArtifact = (players, artifactedCards) => players.filter(player => !artifactedCards.includes(player))

  const selectable_cards = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, gamestate.positions.artifacted_cards)
  const selectable_card_limit = { player: 1, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [scene_end ? 'action_no_selectable_player' : 'action_may_one_any'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
