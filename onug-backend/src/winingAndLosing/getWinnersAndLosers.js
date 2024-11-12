import { getPlayerTokenByPlayerNumber } from '../scenes/sceneUtils'
import { isEveryoneInSameTeam, isCircleVote, isMostVotedPlayer } from './conditions'
import { countVotes, buildVoteResult, getTopVotes, getActiveAndInactiveCards } from './winingAndLosing.utils'

export const getWinnersAndLosers = gamestate => {
  const players = gamestate.players
  const cardPositions = gamestate.card_positions

  const countedVotes = countVotes(players)
  let voteResult = buildVoteResult(countedVotes, players)

  const { mostVoted, secondMostVoted } = getTopVotes(countedVotes)
  const { activeCards } = getActiveAndInactiveCards(cardPositions)

  const sameTeam = isEveryoneInSameTeam(activeCards)
  const circleVote = isCircleVote(countedVotes)

  // Circle Vote
  if (sameTeam) {
    if (circleVote) {
      voteResult.forEach(item => {
        item.win = true
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

  // BODYGUARD(S)
  const bodyguards = voteResult.filter(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return playerCard?.role === 'BODYGUARD'
  })

  let protectedPlayers = []

  if (bodyguards.length > 0) {
    bodyguards.forEach(bodyguard => {
      const bodyguardToken = getPlayerTokenByPlayerNumber(players, bodyguard.player_number)
      const protectedPlayer = players[bodyguardToken].vote
      protectedPlayers.push(protectedPlayer)
    })

    voteResult.forEach(player => {
      if (protectedPlayers.includes(player.player_number)) {
        player.survived = true
      }
    })
  }

  let playersToProcess = [...mostVoted]

  if (
    mostVoted.every(player => {
      const targetPlayer = voteResult.find(p => p.player_number === player)
      return targetPlayer && targetPlayer.survived === true
    })
  ) {
    playersToProcess = [...secondMostVoted]
  }

  voteResult.forEach(item => {
    if (protectedPlayers.includes(item.player_number)) {
      item.survived = true
    } else {
      item.survived = !playersToProcess.includes(item.player_number)
      item.win = !playersToProcess.includes(item.player_number)
    }
  })

  // HUNTER
  const hunter = voteResult.find(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isMostVotedPlayer(player.player_number, playersToProcess) && playerCard?.role === 'HUNTER'
  })

  if (hunter) {
    const hunterToken = getPlayerTokenByPlayerNumber(players, hunter.player_number)
    const hunterVote = players[hunterToken].vote

    voteResult.forEach(player => {
      if (hunterVote.includes(player.player_number) && !protectedPlayers.includes(player.player_number)) {
        player.survived = false
      }
    })
  }

  // Dead status checks
  const tannerDead = voteResult.some(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isTanner = playerCard && playerCard.role === 'TANNER'
    return isTanner ? !player.survived : true
  })

  const werewolfRoles = ['WEREWOLF', 'MYSTIC_WOLF', 'DREAMWOLF', 'ALPHA_WOLF']

  const werewolfDead = voteResult.every(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isWerewolf = playerCard && werewolfRoles.includes(playerCard.role)
    return isWerewolf ? !player.survived : true
  })

  const werewolfSurvived = voteResult.some(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isWerewolf = playerCard && werewolfRoles.includes(playerCard.role)
    return isWerewolf && player.survived
  })

  // TANNER WIN CONDITION
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isTanner = playerCard && playerCard.role === 'TANNER'
    if (isTanner) {
      player.win = !player.survived
    }
  })

  // WEREWOLF TEAM WIN CONDITION
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isWerewolfTeam = playerCard && playerCard.team === 'werewolf'
    if (isWerewolfTeam) {
      player.win = !werewolfDead && !tannerDead
    }
  })

  // MINION WIN CONDITION
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isMinion = playerCard && playerCard.role === 'MINION'
    if (isMinion) {
      player.win = !werewolfDead && !tannerDead
    }
  })

  // VILLAGE TEAM WIN CONDITION
  voteResult.map(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    const isVillageTeam = playerCard && playerCard.team === 'village'
    if (isVillageTeam) {
      player.win = !werewolfSurvived && !tannerDead
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

  return {
    voteResult,
    winnerTeams,
    loserTeam
  }
}
