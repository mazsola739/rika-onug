  export const updatePlayerRoleIdAndRole = (gamestate, token, id, role) => {

    gamestate.players[token].card.player_role = role
  }

  /* TODO consider Object.assign in case like this:      
gamestate.players[token].card.player_team = 'tanner'
gamestate.players[token].card.player_role = 'TANNER' 

 Object.assign(gamestate.players[token].card, {
    player_team: 'tanner',
    player_role: 'TANNER'
  })

"player_original_id": 8,
"player_card_id": 8,
"player_role": "ROBBER",
"player_role_id": 8,
"player_team": "village"
*/