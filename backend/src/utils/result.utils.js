//TODO check if we can refactor this

export const getPlayerInfo = player => ({
  player_name: player.name,
  player_number: player.player_number,
  player_card_id: player.card.player_card_id,
  player_role: player.card.player_role,
  player_team: player.card.player_team,
  player_mark: player.card.player_mark,
  player_artifact: player.card.player_artifact
})
