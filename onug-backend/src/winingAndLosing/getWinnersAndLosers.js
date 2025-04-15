import { buildVoteResult, countVotes, getActiveAndInactiveCards, getFallens, getLosers, getSurvivors, getTeamStatus, getTopVotes, getWinners, isCircleVote } from "."

export const getWinnersAndLosers = async gamestate => {
  const countedVotes = countVotes(gamestate.players)
  let voteResult = buildVoteResult(countedVotes, gamestate.players)
  const { mostVoted, secondMostVoted } = getTopVotes(countedVotes)
  const { activeCards } = getActiveAndInactiveCards(gamestate.card_positions)

  const { isSameTeam, teams } = getTeamStatus(activeCards)
  const circleVote = isCircleVote(countedVotes)

  let playerStates = {
    SURVIVOR_PLAYERS: [],
    KILLED_PLAYERS: [],
    WINNER_PLAYERS: [],
    LOSER_PLAYERS: []
  }

  // Circle Vote
  if (circleVote && isSameTeam) {
    voteResult.forEach(player => {
      player.survived = true
      player.win = true
    })
    return { voteResult, winnerTeams: [...teams], loserTeam: [] }
  }

  if (mostVoted.length === 0) {
    voteResult.forEach(player => {
      player.survived = true
    })
  }

  voteResult.forEach(p => {
    if (mostVoted.includes(p.player_number)) {
      playerStates.KILLED_PLAYERS.push(p.player_number)
    } else {
      playerStates.SURVIVOR_PLAYERS.push(p.player_number)
    }
  })

  playerStates = await getSurvivors(voteResult, gamestate, playerStates)
  playerStates = await getFallens(voteResult, gamestate, playerStates)

  const killedFromMostVotedGroup = playerStates.KILLED_PLAYERS.some(player => mostVoted.includes(player))
  if (!killedFromMostVotedGroup) {
    if (secondMostVoted.length === 0) {
      voteResult.forEach(player => {
        player.survived = true
      })
    }

    playerStates.KILLED_PLAYERS = []
    playerStates.SURVIVOR_PLAYERS = []

    voteResult.forEach(p => {
      if (secondMostVoted.includes(p.player_number)) {
        playerStates.KILLED_PLAYERS.push(p.player_number)
      } else {
        playerStates.SURVIVOR_PLAYERS.push(p.player_number)
      }
    })

    playerStates = await getSurvivors(voteResult, gamestate, playerStates)
    playerStates = await getFallens(voteResult, gamestate, playerStates)

    const killedFromSecondMostVotedGroup = playerStates.KILLED_PLAYERS.some(player => secondMostVoted.includes(player))

    if (!killedFromSecondMostVotedGroup) {
      voteResult.forEach(player => {
        if (playerStates.SURVIVOR_PLAYERS.includes(player.player_number)) {
          player.survived = true
        }
        if (playerStates.KILLED_PLAYERS.includes(player.player_number)) {
          player.survived = false
        }
      })
    }
  }

  playerStates = await getWinners(voteResult, gamestate, playerStates)
  playerStates = await getLosers(voteResult, gamestate, playerStates)

  voteResult.forEach(player => {
    if (playerStates.SURVIVOR_PLAYERS.includes(player.player_number)) {
      player.survived = true
    }
    if (playerStates.KILLED_PLAYERS.includes(player.player_number)) {
      player.survived = false
    }
    if (playerStates.WINNER_PLAYERS.includes(player.player_number)) {
      player.win = true
    }
    if (playerStates.LOSER_PLAYERS.includes(player.player_number)) {
      player.win = false
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

  return { voteResult, winnerTeams, loserTeam }
}
