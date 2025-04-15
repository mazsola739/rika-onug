import { getActiveAndInactiveCards, isDiseased, isTraitor } from "."
import { getPlayerTokenByPlayerNumber } from "../scenes/sceneUtils"

export const getLosers = (voteResult, gamestate, playerStates) => {
  const { activeCards } = getActiveAndInactiveCards(gamestate.card_positions)
  const players = gamestate.players

  let losers = [...playerStates.LOSER_PLAYERS]
  let winners = [...playerStates.WINNER_PLAYERS]

  // DISEASED
  const diseased = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isDiseased(playerCard)
  })
  diseased.forEach(patient => {
    voteResult.forEach(player => {
      const playerToken = getPlayerTokenByPlayerNumber(players, player.player_number)

      if (players[playerToken].vote.includes(patient.player_number)) {
        if (!losers.includes(player.player_number)) {
          losers.push(player.player_number)
        }
        winners = winners.filter(p => p !== p.player_number)
      }
    })
  })

  // TRAITOR
  const traitors = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isTraitor(playerCard)
  })
  traitors.forEach(traitor => {
    const traitorCard = activeCards.find(card => card.position === traitor.player_number)
    const traitorTeam = traitorCard?.team
    const teamMemberDied = voteResult.some(teammate => {
      const teammateCard = activeCards.find(card => card.position === teammate.player_number)
      return teammateCard?.team === traitorTeam && !playerStates.SURVIVOR_PLAYERS.includes(teammate.player_number)
    })

    if (!teamMemberDied) {
      if (!losers.includes(traitor.player_number)) {
        losers.push(traitor.player_number)
      }
      winners = winners.filter(p => p !== traitor.player_number)
    } else {
      if (!winners.includes(traitor.player_number)) {
        winners.push(traitor.player_number)
      }
      losers = losers.filter(p => p !== traitor.player_number)
    }
  })

  return { ...playerStates, WINNER_PLAYERS: winners, LOSER_PLAYERS: losers }
}
