const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger instant action
exports.annoyinglad = () => {
    const playerCards = collectCardInfo(gameState.players);
    const annoyingladPlayer = getPlayersByRoleIds(playerCards, [55])
  
    return annoyingladPlayer
}

exports.annoyinglad_request = () => {}

exports.annoyinglad_result = () => {}

exports.annoyinglad = "annoyinglad_kickoff_text" //left or right neigbor player sending message to selected player - no update
