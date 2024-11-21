import { formatPlayerIdentifier, generateRoleAction, getNonVampirePlayerNumbersByRoleIds, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const vampiresAction = (gamestate, token, title) => {
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(gamestate)
  const vampires = getVampirePlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    vampires
  }

  const isSingleNonVampire = nonVampires.length === 1
  const isSingleVampire = vampires.length === 1

  const messageVampireIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = isSingleVampire ? ['action_no_vampires'] : ['action_vampires', ...messageVampireIdentifiers]

  if (isSingleNonVampire) {
    const vampirePosition = gamestate.mark_positions.vampire
    const selectedPosition = gamestate.card_positions[nonVampires[0]].mark

    const isSwappedAlready = vampirePosition === selectedPosition

    if (!isSwappedAlready) {
      gamestate.mark_positions.vampire = selectedPosition
      gamestate.card_positions[nonVampires[0]].mark = vampirePosition
    }

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      mark_of_vampire: [nonVampires[0]],
      vampires,
      scene_end: true
    }

    const messageVictimIdentifiers = formatPlayerIdentifier([nonVampires[0]])[0]
    privateMessage.push('action_mark_of_vampire')
    privateMessage.push(...messageVictimIdentifiers)

    return generateRoleAction(gamestate, token, {
      private_message: privateMessage,
      uniqueInformations: { vampires },
      scene_end: true
    })
  }

  if (isSingleVampire) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 },
      vampires,
      vote: false,
      obligatory: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_must_one_any_non_vampire'],
      selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
      uniqueInformations: { vote: false, vampires },
      obligatory: true
    })
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    vampires,
    vote: true,
    obligatory: true
  }

  privateMessage.push('action_must_one_any_non_vampire')

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vote: true, vampires },
    obligatory: true
  })
}
