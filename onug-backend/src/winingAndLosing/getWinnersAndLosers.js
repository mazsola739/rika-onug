import { logInfo } from '../log'
import { isEveryoneInSameTeam, isCircleVote, isMostVotedPlayer } from './conditions'
import { countVotes, buildVoteResult, getTopVotes, getActiveAndInactiveCards } from './winingAndLosing.utils'

export const getWinnersAndLosers = gamestate => {
  const players = gamestate.players
  const cardPositions = gamestate.card_positions

  const countedVotes = countVotes(players)
  let voteResult = buildVoteResult(countedVotes, players)

  const { mostVoted, secondMostVoted } = getTopVotes(countedVotes)
  const { activeCards, inactiveCards } = getActiveAndInactiveCards(cardPositions)
  console.log(`secondMostVoted: `, secondMostVoted)
  console.log(`inactiveCards: `, inactiveCards)

  const sameTeam = isEveryoneInSameTeam(activeCards)
  const circleVote = isCircleVote(countedVotes)

  // Circle Vote: No team wins, but all players survive.
  if (sameTeam) {
    if (circleVote) {
      voteResult.forEach(item => {
        item.win = false
        item.survived = true
      })
      return { voteResult, winnerTeams: [], loserTeam: [] }
    } else {
      voteResult.forEach(item => {
        item.survived = !isMostVotedPlayer(item.player_number, mostVoted)
        item.win = false
      })
    }
  } else if (!sameTeam) {
    voteResult.forEach(item => {
      item.survived = !isMostVotedPlayer(item.player_number, mostVoted)
      item.win = !isMostVotedPlayer(item.player_number, mostVoted)
    })
  }

  // Dead status checks
  const tannerDead = voteResult.some(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return playerCard && playerCard.role === 'TANNER' && !player.survived
  })

  const werewolfDead = voteResult.some(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return playerCard && !player.survived && (playerCard.role === 'WEREWOLF' || [15, 16, 17, 21, 22].includes(playerCard.id))
  })

  const werewolfAllSurvive = voteResult.every(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return playerCard && player.survived && (playerCard.role === 'WEREWOLF' || [15, 16, 17, 21, 22].includes(playerCard.id))
  })

  // TANNER WIN CONDITION: Tanner wins if they are dead.
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    if (playerCard && playerCard.role === 'TANNER') {
      player.win = !player.survived // Tanner wins if they are dead
    }
  })

  // WEREWOLF TEAM WIN CONDITION: Werewolves win if all werewolves survive and Tanner is not dead.
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    if (playerCard && playerCard.team === 'werewolf') {
      player.win = werewolfAllSurvive && !tannerDead
    }
  })

  // MINION WIN CONDITION: Minions win with werewolves if all werewolves survive and Tanner is not dead.
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    if (playerCard && playerCard.role === 'MINION') {
      player.win = werewolfAllSurvive && !tannerDead
    }
  })

  // VILLAGE TEAM WIN CONDITION: Village wins if any werewolf dies and Tanner is not dead.
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    if (playerCard && playerCard.team === 'village') {
      player.win = werewolfDead && !tannerDead
    }
  })

  const winnerTeams = Array.from(
    new Set(
      voteResult
        .filter(player => player.win)
        .map(player => {
          const playerCard = activeCards.find(card => card.position === player.player_number)
          return playerCard ? playerCard.team : null
        })
        .filter(team => team)
    )
  )

  const loserTeam = Array.from(
    new Set(
      voteResult
        .filter(player => !player.win)
        .map(player => {
          const playerCard = activeCards.find(card => card.position === player.player_number)
          return playerCard ? playerCard.team : null
        })
        .filter(team => team)
    )
  )

  logInfo(`winnerTeams: ${JSON.stringify(winnerTeams)}`)
  logInfo(`loserTeam: ${JSON.stringify(loserTeam)}`)
  logInfo(`voteResult: ${JSON.stringify(voteResult)}`)

  return {
    voteResult,
    winnerTeams,
    loserTeam
  }
}
