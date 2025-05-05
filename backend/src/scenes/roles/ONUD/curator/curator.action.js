import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getSelectablePlayersWithNoArtifact, generateRoleAction } from '../../../sceneUtils'

export const curatorAction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.positions.shielded_cards)
  const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, gamestate.positions.artifacted_cards)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoArtifact,
    selectable_card_limit: { player: 1, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_may_one_any'],
    selectableCards: {
      selectable_cards: selectablePlayersWithNoArtifact,
      selectable_card_limit: { player: 1, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
