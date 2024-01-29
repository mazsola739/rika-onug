const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");

exports.aliens = () => {
    const playerCards = collectCardInfo(gameState.players);
    const alienPlayer = getPlayersByRoleIds(playerCards, [alienIds]);
  
    return alienPlayer;
}


exports.aliens = "aliens_kickoff_text" //show aline cards
exports.random_aliens = [
  "aliens_view_text", //alienAnyKeys - selected - show it  - update known if own selected
  "aliens_allview_text", //alienAnyKeys random selected - selected - may show - update known & actual if own selected & viewed
  "aliens_stare_text", //alien cards - no update
  "aliens_left_text", //swap card from right side alien - show new alien card secretly - update aliens known & actual card
  "aliens_right_text", //swap card from left side alien - show new alien card secretly - update aliens known & actual card
  "aliens_show_text", //actual character cards show public - update alines known & actual card
  "aliens_timer_text", //vote time halfing - no update
  "aliens_newalien_text", //alienAllKeys random selected - show to this player alien cards - update known & actual selected card team
  "aliens_alienhelper_text", //alienAllKeys  random selected - show to this player alien cards - update player known & actual new team alien helper
]
exports.alienAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "activePlayers", //up to 3 random players example: identifier_player1_text with 'or'
]
exports.alienAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
]
