import { getPlayerTokenByPlayerNumber } from "../scenes/sceneUtils"
import { isLeader, isAlienTeam, isBlob, isMortician, isTanner, isSynthetic, groobAlive, anyZerbDead, zerbAlive, anyGroobDead, allGroobAlive, allZerbsAlive, isAssassin, anyTargetDead, isApprenticeAssassin, anyAssassinDead, isVillageTeam, villageWins, isWinner, isLoser, isWerewolfTeam, anyWerewolfDead, anySyntheticDead, anyTannerDead, isMinion, hasActiveWerewolf, isVampireTeam, anyVampireDead, isRenfield, hasActiveVampire, anyAlienDead, getActiveAndInactiveCards, getPlayerNeighbors } from "."

export const getWinners = (voteResult, gamestate, playerStates) => {
  const { activeCards } = getActiveAndInactiveCards(gamestate.card_positions)
  const players = gamestate.players

  let losers = [...playerStates.WINNER_PLAYERS]
  let winners = [...playerStates.LOSER_PLAYERS]
  const survivors = playerStates.SURVIVOR_PLAYERS
  const fallens = playerStates.KILLED_PLAYERS

  const leader = voteResult.find(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)
    return isLeader(playerCard)
  })
  const allAliensVotedForLeader = voteResult.every(player => {
    const playerCard = activeCards.find(card => card.position === player.player_number)

    if (isAlienTeam(playerCard)) {
      const playerToken = getPlayerTokenByPlayerNumber(players, player.player_number)
      if (!playerToken || !players[playerToken]) return false

      return players[playerToken].vote?.includes(leader?.player_number)
    }
    return true
  })

  voteResult.forEach(player => {
    const playerNumber = player.player_number
    const playerCard = activeCards.find(card => card.position === playerNumber)

    // BLOB win condition
    if (isBlob(playerCard)) {
      const blobNeighbors = getPlayerNeighbors(voteResult, playerNumber, 1)
      const anyNeighborDoomed = blobNeighbors.some(neighborNumber => {
        return fallens.includes(neighborNumber) && !survivors.includes(neighborNumber)
      })

      if (anyNeighborDoomed) {
        if (!losers.includes(playerNumber)) {
          losers.push(playerNumber)
        }
        winners = winners.filter(p => p !== playerNumber)
      } else {
        if (!winners.includes(playerNumber)) {
          winners.push(playerNumber)
        }
        losers = losers.filter(p => p !== playerNumber)
      }
    }

    // MORTICIAN win condition
    if (isMortician(playerCard)) {
      const morticianNeighbors = getPlayerNeighbors(voteResult, playerNumber, 1)
      const anyNeighborDied = morticianNeighbors.some(neighborNumber => {
        const neighbor = voteResult.find(p => p.player_number === neighborNumber)
        return !neighbor?.survived
      })

      if (anyNeighborDied) {
        if (!winners.includes(playerNumber)) {
          winners.push(playerNumber)
        }
        losers = losers.filter(p => p !== playerNumber)
      } else {
        if (!losers.includes(playerNumber)) {
          losers.push(playerNumber)
        }
        winners = winners.filter(p => p !== playerNumber)
      }
    }

    // TANNER win condition
    if (isTanner(playerCard)) {
      if (fallens.includes(playerNumber)) {
        if (!winners.includes(playerNumber)) {
          winners.push(playerNumber)
        }
      } else if (survivors.includes(playerNumber)) {
        if (!losers.includes(playerNumber)) {
          losers.push(playerNumber)
        }
      }
    }

    // SYNTHETIC_ALIEN win condition
    if (isSynthetic(playerCard)) {
      if (fallens.includes(playerNumber)) {
        if (!winners.includes(playerNumber)) {
          winners.push(playerNumber)
        }
      } else if (survivors.includes(playerNumber)) {
        if (!losers.includes(playerNumber)) {
          losers.push(playerNumber)
        }
      }
    }

    // GROOB win condition
    if (groobAlive(playerCard, survivors, playerNumber) && anyZerbDead(activeCards, survivors)) {
      if (!winners.includes(playerCard.position)) {
        winners.push(playerCard.position)
      }
      losers = losers.filter(loser => loser !== playerCard.position)
    }

    // ZERB win condition
    if (zerbAlive(playerCard, survivors, playerNumber) && anyGroobDead(activeCards, survivors)) {
      if (!winners.includes(playerCard.position)) {
        winners.push(playerCard.position)
      }
      losers = losers.filter(loser => loser !== playerCard.position)
    }

    // LEADER win condition
    if (isLeader(playerCard) && allGroobAlive(activeCards, survivors) && allZerbsAlive(activeCards, survivors)) {
      if (!winners.includes(playerCard.position)) {
        winners.push(playerCard.position)
      }
      losers = losers.filter(loser => loser !== playerCard.position)
    }

    // ASSASSIN win condition
    if (isAssassin(playerCard)) {
      if (anyTargetDead(activeCards, fallens)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
        losers = losers.filter(loser => loser !== playerCard.position)
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
        winners = winners.filter(winner => winner !== playerCard.position)
      }
    }

    // APPRENTICE_ASSASSIN win condition
    if (isApprenticeAssassin(playerCard)) {
      if (anyAssassinDead(activeCards, fallens)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
        losers = losers.filter(loser => loser !== playerCard.position)
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
        winners = winners.filter(winner => winner !== playerCard.position)
      }
    }

    // VILLAGE TEAM win condition
    if (isVillageTeam(playerCard)) {
      if (villageWins(activeCards, fallens) && !isWinner(playerCard, winners) && !isLoser(playerCard, losers)) {
        winners.push(playerCard.position)
      }
      if (!villageWins(activeCards, fallens) && !isLoser(playerCard, losers) && !isWinner(playerCard, winners)) {
        losers.push(playerCard.position)
      }
    }

    // WEREWOLF TEAM WIN CONDITION
    if (isWerewolfTeam(playerCard)) {
      if (!anyWerewolfDead(activeCards, fallens) && !anySyntheticDead(activeCards, fallens) && !anyTannerDead(activeCards, fallens)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
      }
    }

    // MINION WIN CONDITION
    if (isMinion(playerCard)) {
      if (hasActiveWerewolf(activeCards) && !anyWerewolfDead(activeCards, fallens) && !anyTannerDead(activeCards, fallens)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
        losers = losers.filter(p => p !== playerNumber)
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
        winners = winners.filter(p => p !== playerCard.position)
      }
    }

    // VAMPIRE TEAM WIN CONDITION
    if (isVampireTeam(playerCard)) {
      if (!anyVampireDead(activeCards, fallens) && !anySyntheticDead(activeCards, fallens) && !anyTannerDead(activeCards, fallens)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
      }
    }

    // RENFIELD WIN CONDITION
    if (isRenfield(playerCard) && !anyVampireDead(activeCards, fallens) && !anyTannerDead(activeCards, fallens)) {
      if (hasActiveVampire(activeCards)) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
        losers = losers.filter(p => p !== playerNumber)
      }
    }

    // ALIEN TEAM WIN CONDITION
    if (isAlienTeam(playerCard)) {
      if ((!anyAlienDead(activeCards, fallens) && !anySyntheticDead(activeCards, fallens) && !anyTannerDead(activeCards, fallens)) || allAliensVotedForLeader) {
        if (!winners.includes(playerCard.position)) {
          winners.push(playerCard.position)
        }
      } else {
        if (!losers.includes(playerCard.position)) {
          losers.push(playerCard.position)
        }
      }
    }
  })

  return { ...playerStates, WINNER_PLAYERS: winners, LOSER_PLAYERS: losers }
}
