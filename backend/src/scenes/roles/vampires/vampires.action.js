import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const vampiresAction = (gamestate, token, title) => {
  const vampires = getPlayerNumbersByGivenConditions(gamestate, 'vampires')
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate, 'nonVampire')
  const selectable_mark_limit = { mark: 1 }

  const isSingleNonVampire = selectable_marks.length === 1
  const isSingleVampire = vampires.length === 1

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = isSingleVampire ? ['action_no_vampires'] : ['action_vampires', ...messageIdentifiers]

  //TODO fix singleselection
  if (isSingleNonVampire) {
    const vampirePosition = gamestate.positions.mark_positions.vampire
    const selectedPosition = gamestate.positions.card_positions[selectable_marks[0]].mark

    const isSwappedAlready = vampirePosition === selectedPosition

    if (!isSwappedAlready) {
      gamestate.positions.mark_positions.vampire = selectedPosition
      gamestate.positions.card_positions[selectable_marks[0]].mark = vampirePosition
    }

    gamestate.players[token].card_or_mark_action = true

    const messageIdentifiers = formatPlayerIdentifier([selectable_marks[0]])
    privateMessage.push('action_mark_of_vampire', ...messageIdentifiers)

    return generateRoleAction(gamestate, token, title, {
      private_message: privateMessage,
      uniqueInformation: { vampires, mark_of_vampire: [selectable_marks[0]] },
      scene_end: true
    })
  }

  if (isSingleVampire) {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_must_one_any_non_vampire'],
      selectableMarks: { selectable_marks, selectable_mark_limit },
      uniqueInformation: { vote: false, vampires },
      obligatory: true
    })
  }

  privateMessage.push('FYI_TBD', 'action_must_one_any_non_vampire')

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    selectableMarks: { selectable_marks, selectable_mark_limit },
    uniqueInformation: { vote: true, vampires },
    obligatory: true
  })
}
