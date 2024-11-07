import { isEveryoneInSameTeam, isCircleVote, isMostVotedPlayer } from './conditions'
import { countVotes, buildVoteResult, getTopVotes, getActiveAndInactiveCards } from './winingAndLosing.utils'

export const getWinnersAndLosers = gamestate => {
  const players = gamestate.players
  const cardPositions = gamestate.card_positions

  const countedVotes = countVotes(players)
  const voteResult = buildVoteResult(countedVotes, players)
  const { mostVoted } = getTopVotes(countedVotes)
  const { activeCards } = getActiveAndInactiveCards(cardPositions)

  // CIRCLE VOTE WIN
  if (isEveryoneInSameTeam(activeCards)) {
    if (isCircleVote(countedVotes)) {
      voteResult.forEach(item => (item.win = true))
    } else {
      voteResult.forEach(item => {
        item.survived = !isMostVotedPlayer(item.player_number, mostVoted)
        item.win = false
      })
    }
  }

  // GENERIC WIN BASED ON VOTING
  voteResult.forEach(player => {
    if (isMostVotedPlayer(player.player_number, mostVoted)) {
      player.survived = false
      player.win = false
    } else {
      player.survived = true
      player.win = true
    }
  })

  // TEAMS AND ROLES SETUP
  const werewolfTeam = voteResult.filter(({ player_number }) => {
    const playerCard = activeCards[player_number]
    return playerCard && playerCard.team === 'werewolf'
  })

  const werewolfRole = voteResult.filter(({ player_number }) => {
    const playerCard = activeCards[player_number]
    return playerCard && playerCard.role === 'WEREWOLF'
  })

  const minionRole = voteResult.filter(({ player_number }) => {
    const playerCard = activeCards[player_number]
    return playerCard && playerCard.role === 'MINION'
  })

  const tannerRole = voteResult.filter(({ player_number }) => {
    const playerCard = activeCards[player_number]
    return playerCard && playerCard.role === 'TANNER'
  })

  const villageTeam = voteResult.filter(({ player_number }) => {
    const playerCard = activeCards[player_number]
    return playerCard && playerCard.team === 'village'
  })

  // DEAD STATUS CHECKS
  const tannerDead = tannerRole.some(player => !player.survived)
  const werewolfDead = werewolfRole.some(player => !player.survived)

  // TANNER WIN CONDITION
  tannerRole.forEach(player => {
    player.win = !player.survived
  })

  // WEREWOLF TEAM WIN CONDITION
  werewolfTeam.forEach(player => {
    player.win = !werewolfDead && !tannerDead
  })

  // MINION WIN CONDITION
  minionRole.forEach(player => {
    player.win = !werewolfDead && !tannerDead
  })

  // VILLAGE TEAM WIN CONDITION
  villageTeam.forEach(player => {
    player.win = werewolfDead && !tannerDead
  })

  // SET WINNER TEAMS BASED ON THE FINAL WIN STATUS
  const winnerTeams = Array.from(new Set(voteResult.filter(player => player.win && activeCards[player.player_number]).map(player => activeCards[player.player_number].team)))

  return {
    voteResult,
    winnerTeams
  }
}
