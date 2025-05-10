import { generateRoleAction, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const morticianAction = (gamestate, token, title, prefix) => {
  const randomMorticianInstruction = gamestate.roles[prefix].instruction
  const morticianKey = gamestate.roles[prefix].key
  let selectable_cards, selectable_card_limit
  let scene_end = true

  if (morticianKey === 'identifier_yourself') {
    if (!gamestate.players[token].shield) {
      const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)

      selectable_cards = currentPlayerNumber
      selectable_card_limit = { player: 1, center: 0 }

      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_cards,
        selectable_card_limit
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_may_look_yourself'],
        selectableCards: { selectable_cards, selectable_card_limit },
        scene_end
      })
    } else {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        shielded: true,
        scene_end
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_shielded']
      })
    }
  } else if (morticianKey.includes('neighbor')) {
    const direction = morticianKey.includes('left') ? 'left' : morticianKey.includes('right') ? 'right' : 'both'
    const selectablePlayers = getPlayerNeighborsByToken(gamestate.players, token, direction, 1)

    const limit = randomMorticianInstruction.includes('1') ? 1 : 2

    selectable_cards = getSelectablePlayersWithNoShield(selectablePlayers)
    selectable_card_limit = { player: limit, center: 0 }
    scene_end = selectable_cards.length === 0

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards,
      selectable_card_limit,
      scene_end
    }

    return generateRoleAction(gamestate, token, {
      private_message: [scene_end ? 'action_no_selectable_player' : `action_may_${morticianKey.replace('identifier_', '')}`],
      selectableCards: { selectable_cards, selectable_card_limit },
      scene_end
    })
  }
}
