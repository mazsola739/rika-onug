import { formatPlayerIdentifier, generateRoleInteraction, getNonVampirePlayerNumbersByRoleIds, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

/* // TODO   Uses the Robber or Witch and swaps with a Werewolf or Vampire 
Does not wake up with the Werewolves/Vampires */

export const vampiresInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    vampires,
    obligatory: true
  }

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = vampires.length === 1 ? ['interaction_no_vampires'] : ['interaction_vampires', ...messageIdentifiers]

  return generateRoleInteraction(newGamestate, token, {
    private_message: [...privateMessage, 'interaction_must_one_any_non_vampire'],
    selectableMarks: {
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 }
    },
    uniqueInformations: { vampires },
    obligatory: true
  })
}
