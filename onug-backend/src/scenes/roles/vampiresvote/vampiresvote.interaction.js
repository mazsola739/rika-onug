import { formatPlayerIdentifier, generateRoleInteraction, getNonVampirePlayerNumbersByRoleIds, getPlayerTokenByPlayerNumber, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

//TODO swap only once the mark.
export const vampiresvoteInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)
  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)

  const isSingleNonVampire = nonVampires.length === 1
  const isSingleVampire = vampires.length === 1

  if (isSingleNonVampire) {
    const vampirePosition = newGamestate.mark_positions.vampire
    const selectedPosition = newGamestate.card_positions[nonVampires[0]].mark

    const victimToken = getPlayerTokenByPlayerNumber(newGamestate.players, nonVampires[0])
    const isSwappedAlready = vampirePosition === newGamestate.players[victimToken].card.player_mark

    if (!isSwappedAlready) {
      newGamestate.mark_positions.vampire = selectedPosition
      newGamestate.card_positions[nonVampires[0]].mark = vampirePosition
    }

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      mark_of_vampire: [nonVampires[0]],
      scene_end: true
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier([nonVampires[0]])[0]],
      scene_end: true
    })
  }

  if (isSingleVampire) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 },
      vote: false,
      obligatory: true
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_one_any_non_vampire'],
      selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
      uniqueInformations: { vote: false },
      obligatory: true
    })
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    vote: true,
    obligatory: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vote: true },
    obligatory: true
  })
}
