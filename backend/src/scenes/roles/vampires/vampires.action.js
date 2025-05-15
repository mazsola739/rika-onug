import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, updateMark } from '../../sceneUtils'

export const vampiresAction = (gamestate, token, title) => {
  const vampires = getPlayerNumbersByGivenConditions(gamestate, 'vampire')
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate, 'nonVampire')
  const selectable_mark_limit = { mark: 1 }
  const isSingleVampire = vampires.length === 1

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  let private_message = isSingleVampire ? ['action_no_vampires'] : ['action_vampires', ...messageIdentifiers]

  if (selectable_marks.length === 0) {
    private_message.push('action_no_selectable_player')
    return generateRoleAction(gamestate, token, title, {
      private_message,
      selectableMarks: { selectable_marks, selectable_mark_limit },
      uniqueInformation: { vote: false, vampires },
      scene_end: true
    })
  }

  if (selectable_marks.length === 1) {
    const isSwappedAlready = gamestate.positions.mark_positions.vampire === gamestate.positions.card_positions[selectable_marks[0]].mark

    if (!isSwappedAlready) {
      updateMark(gamestate, token, selectable_marks, ['vampire'])
      gamestate.roles.vampires.new_vampire.push(selectable_marks)
      private_message.push('action_mark_of_vampire', ...formatPlayerIdentifier(selectable_marks))
    }

    return generateRoleAction(gamestate, token, title, {
      private_message,
      uniqueInformation: { vote: false, vampires },
      scene_end: true
    })
  }

  if (isSingleVampire) {
    private_message.push('action_must_one_any_non_vampire')
    return generateRoleAction(gamestate, token, title, {
      private_message,
      selectableMarks: { selectable_marks, selectable_mark_limit },
      uniqueInformation: { vote: false, vampires },
      obligatory: true,
      scene_end: false
    })
  }

  private_message.push('action_must_one_any_non_vampire')
  return generateRoleAction(gamestate, token, title, {
    private_message,
    selectableMarks: { selectable_marks, selectable_mark_limit },
    uniqueInformation: { vote: true, vampires },
    obligatory: true,
    scene_end: false
  })
}
