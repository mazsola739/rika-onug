import { logInfo } from "../log"
import { isEveryoneInSameTeam, isCircleVote, isMostVotedPlayer } from "./conditions"
import { countVotes, buildVoteResult, getTopVotes, getActiveAndInactiveCards } from "./winingAndLosing.utils"

export const getWinnersAndLosers = gamestate => {
  const players = gamestate.players
  const cardPositions = gamestate.card_positions

  const countedVotes = countVotes(players)
  let voteResult = buildVoteResult(countedVotes, players)
  const { mostVoted } = getTopVotes(countedVotes)
  const { activeCards } = getActiveAndInactiveCards(cardPositions)

  // Circle Vote: No team wins, but all players survive.
  if (isEveryoneInSameTeam(activeCards)) {
    if (isCircleVote(countedVotes)) {
      voteResult.forEach(item => {
        item.win = false
        item.survived = true
      })
      return { voteResult, winnerTeams: [] }
    } else {
      voteResult.forEach(item => {
        item.survived = !isMostVotedPlayer(item.player_number, mostVoted)
        item.win = false
      })
    }
  }

  // Dead status checks
  const tannerDead = voteResult.some(player => {
    const playerCard = activeCards[player.player_number]
    return playerCard && playerCard.role === 'TANNER' && !player.survived
  })
  
  const werewolfDead = voteResult.some(player => {
    const playerCard = activeCards[player.player_number]
    return playerCard && playerCard.role === 'WEREWOLF' && !player.survived
  })

  const werewolfAllSurvive = voteResult.every(player => {
    const playerCard = activeCards[player.player_number]
    return playerCard && playerCard.role === 'WEREWOLF' && player.survived
  })

  // Manipulating voteResult based on conditions

  // TANNER WIN CONDITION: Tanner wins if they are dead.
  voteResult.forEach(player => {
    const playerCard = activeCards[player.player_number]
    if (playerCard && playerCard.role === 'TANNER') {
      player.win = !player.survived // Tanner wins if they are dead
    }
  })

  // WEREWOLF TEAM WIN CONDITION: Werewolves win if all werewolves survive and Tanner is not dead.
  voteResult.forEach(player => {
    const playerCard = activeCards[player.player_number]
    if (playerCard && playerCard.role === 'WEREWOLF') {
      player.win = werewolfAllSurvive && !tannerDead
    }
  })

  // MINION WIN CONDITION: Minions win with werewolves if all werewolves survive and Tanner is not dead.
  voteResult.forEach(player => {
    const playerCard = activeCards[player.player_number]
    if (playerCard && playerCard.role === 'MINION') {
      player.win = werewolfAllSurvive && !tannerDead
    }
  })

  // VILLAGE TEAM WIN CONDITION: Village wins if any werewolf dies and Tanner is not dead.
  voteResult.forEach(player => {
    const playerCard = activeCards[player.player_number]
    if (playerCard && playerCard.team === 'village') {
      player.win = werewolfDead && !tannerDead
    }
  })

  // Set winner teams based on final win statuses
  const winnerTeams = Array.from(new Set(voteResult.filter(player => player.win).map(player => {
    const playerCard = activeCards[player.player_number]
    return playerCard ? playerCard.team : null
  })))

  // Set loser teams (optional)
  const loserTeam = Array.from(new Set(voteResult.filter(player => !player.win).map(player => {
    const playerCard = activeCards[player.player_number]
    return playerCard ? playerCard.team : null
  })))

  logInfo(`winnerTeams: ${JSON.stringify(winnerTeams)}`)
  logInfo(`loserTeam: ${JSON.stringify(loserTeam)}`)
  logInfo(`voteResult: ${JSON.stringify(voteResult)}`)

  return {
    voteResult,
    winnerTeams,
    loserTeam
  }
}
