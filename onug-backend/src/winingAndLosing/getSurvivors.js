import { getActiveAndInactiveCards, isBodyguard, isMaster, isPrince, vampireRoles } from "."
import { getPlayerTokenByPlayerNumber } from "../scenes/sceneUtils"

export const getSurvivors = (voteResult, gamestate, playerStates) => {
  const { activeCards } = getActiveAndInactiveCards(gamestate.card_positions)
  const players = gamestate.players

  let survivors = [...playerStates.SURVIVOR_PLAYERS]
  let fallens = [...playerStates.KILLED_PLAYERS]

  // BODYGUARD Protection
  const bodyguards = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isBodyguard(playerCard)
  })
  bodyguards.forEach(bodyguard => {
    const bodyguardToken = getPlayerTokenByPlayerNumber(players, bodyguard.player_number)
    const protectedPlayer = players[bodyguardToken].vote

    if (!survivors.includes(protectedPlayer)) {
      survivors.push(protectedPlayer)
    }
    fallens = fallens.filter(doomedPlayer => doomedPlayer !== protectedPlayer)
  })

  // THE_MASTER Protection
  const masters = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isMaster(playerCard)
  })
  masters.forEach(master => {
    const votedByVampire = players.some(player => {
      const playerCard = activeCards.find(card => card.position === player.player_number)
      return vampireRoles.includes(playerCard?.role) && players[player].vote.includes(master.player_number)
    })
    if (votedByVampire) {
      if (!survivors.includes(master.player_number)) {
        survivors.push(master.player_number)
      }
      fallens = fallens.filter(doomedPlayer => doomedPlayer !== master.player_number)
    }
  })

  // PRINCE Protection
  const princes = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isPrince(playerCard)
  })
  princes.forEach(prince => {
    if (!survivors.includes(prince.player_number)) {
      survivors.push(prince.player_number)
    }
    fallens = fallens.filter(p => p !== prince.player_number)
  })

  return { ...playerStates, SURVIVOR_PLAYERS: survivors, KILLED_PLAYERS: fallens }
}
