import { generateRoleAction, getPlayerNeighborsByToken, getPlayerNumberWithMatchingToken, getSelectablePlayersWithNoShield } from '../../sceneUtils'

//TODO neighbors
export const morticianInteraction = (gamestate, token, title, randomMorticianInstruction, morticianKey) => {
  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  if (morticianKey === 'identifier_yourself_text') {
    if (!gamestate.players[token].shield) {
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_cards: [currentPlayerNumber],
        selectable_card_limit: { player: 1, center: 0 }
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['interaction_may_look_yourself'],
        selectableCards: {
          selectable_cards: [currentPlayerNumber],
          selectable_card_limit: { player: 1, center: 0 }
        },
        scene_end: true
      })
    } else {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        shielded: true,
        scene_end: true
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['interaction_shielded']
      })
    }
  } else if (morticianKey.includes('neighbor')) {
    const direction = morticianKey.includes('left') ? 'left' : morticianKey.includes('right') ? 'right' : 'both'
    const selectablePlayers = getPlayerNeighborsByToken(gamestate.players, token, direction, 1)
    const selectablePlayerNumbers = getSelectablePlayersWithNoShield(selectablePlayers)
    const limit = randomMorticianInstruction.includes('1') ? 1 : 2

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: limit, center: 0 },
      scene_end: selectablePlayerNumbers.length === 0
    }

    return generateRoleAction(gamestate, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : `interaction_may_${morticianKey.replace('identifier_', '').replace('_text', '')}`],
      selectableCards: {
        selectable_cards: selectablePlayerNumbers,
        selectable_card_limit: { player: limit, center: 0 }
      },
      scene_end: selectablePlayerNumbers.length === 0
    })
  }
}
