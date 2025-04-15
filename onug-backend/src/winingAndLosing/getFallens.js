import { getActiveAndInactiveCards, isHunter, isLover } from "."
import { getPlayerTokenByPlayerNumber } from "../scenes/sceneUtils"

export const getFallens = (voteResult, gamestate, playerStates) => {
  const { activeCards } = getActiveAndInactiveCards(gamestate.card_positions)
  const players = gamestate.players

  let survivors = [...playerStates.SURVIVOR_PLAYERS]
  let fallens = [...playerStates.KILLED_PLAYERS]

  // HUNTER Killing
  const hunters = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isHunter(playerCard) && fallens.includes(player.player_number)
  })

  hunters.forEach(hunter => {
    const hunterToken = getPlayerTokenByPlayerNumber(players, hunter.player_number)
    const hunterVote = players[hunterToken].vote

    hunterVote.forEach(votedPlayer => {
      if (survivors.includes(votedPlayer) && !fallens.includes(votedPlayer)) {
        survivors = survivors.filter(player => player !== votedPlayer)
        fallens.push(votedPlayer)
      }
    })
  })

  // LOVER deaths
  const lovers = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isLover(playerCard)
  })
  const anyLoverDoomed = lovers.some(lover => fallens.includes(lover.player_number))
  if (anyLoverDoomed) {
    lovers.forEach(lover => {
      if (!fallens.includes(lover.player_number)) {
        fallens.push(lover.player_number)
      }
      survivors = survivors.filter(playerNumber => playerNumber !== lover.player_number)
    })
  }

  return { ...playerStates, SURVIVOR_PLAYERS: survivors, KILLED_PLAYERS: fallens }
}
