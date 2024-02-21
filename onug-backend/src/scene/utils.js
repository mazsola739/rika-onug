export const getSelectablePlayersWithNoShield = (players, shielded_cards) => players.filter(player => !shielded_cards.includes(player));

export const getNonWerewolfPlayerNumbersByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!werewolvesAndDreamWolfIds.includes(player.card.player_role_id)) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

