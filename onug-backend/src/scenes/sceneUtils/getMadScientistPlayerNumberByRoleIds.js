export const getMadScientistPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 63) {
      result.push(player.player_number)
    }
  }

  return result
}
