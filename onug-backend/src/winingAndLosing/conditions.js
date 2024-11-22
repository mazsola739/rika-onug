import { alienRoles, vampireRoles, werewolfRoles } from './constants'

export const isCircleVote = countedVotes => {
  return Object.values(countedVotes).every(votes => votes.length === 1)
}

export const getTeamStatus = activeCards => {
  const normalizedTeams = activeCards.map(card => {
    return card.team === 'hero' ? 'village' : card.team
  })

  const teams = [...new Set(normalizedTeams)]
  const isSameTeam = teams.length === 1

  return {
    isSameTeam,
    teams
  }
}

const bodyguard = card => card.role === 'BODYGUARD'
const master = card => card.role === 'THE_MASTER'
const prince = card => card.role === 'PRINCE'
const hunter = card => card.role === 'HUNTER'
const lover = card => card.role === 'LOVER'
const blob = card => card.role === 'BLOB'
const mortician = card => card.role === 'MORTICIAN'
const zerb = card => card.role === 'ZERB'
const groob = card => card.role === 'GROOB'
const leader = card => card.role === 'LEADER'
const assassin = card => card.role === 'ASSASSIN'
const apprenticeAssassin = card => card.role === 'APPRENTICE_ASSASSIN'
const minion = card => card.role === 'MINION'
const renfield = card => card.role === 'RENFIELD'
const tanner = card => card.role === 'TANNER'
const synthetic = card => card.role === 'SYNTHETIC_ALIEN'
const target = card => card.role === 'TARGET'
const diseased = card => card.role === 'DISEASED'
const traitor = card => card.role === 'TRAITOR'

const villageTeam = card => card.team === 'village'
const werewolfTeam = card => card.team === 'werewolf'
const vampireTeam = card => card.team === 'vampire'
const alienTeam = card => card.team === 'alien'
const isWerewolfRole = card => werewolfRoles.includes(card.role)
const isVampireRole = card => vampireRoles.includes(card.role)
const isAlienRole = card => alienRoles.includes(card.role)

export const isBodyguard = playerCard => playerCard && bodyguard(playerCard)
export const isMaster = playerCard => playerCard && master(playerCard)
export const isPrince = playerCard => playerCard && prince(playerCard)
export const isHunter = playerCard => playerCard && hunter(playerCard)
export const isLover = playerCard => playerCard && lover(playerCard)
export const isBlob = playerCard => playerCard && blob(playerCard)
export const isMortician = playerCard => playerCard && mortician(playerCard)
export const isTanner = playerCard => playerCard && tanner(playerCard)
export const isSynthetic = playerCard => playerCard && synthetic(playerCard)
export const isGroob = playerCard => playerCard && groob(playerCard)
export const isZerb = playerCard => playerCard && zerb(playerCard)
export const isLeader = playerCard => playerCard && leader(playerCard)
export const isAssassin = playerCard => playerCard && assassin(playerCard)
export const isApprenticeAssassin = playerCard => playerCard && apprenticeAssassin(playerCard)
export const isMinion = playerCard => playerCard && minion(playerCard)
export const isRenfield = playerCard => playerCard && renfield(playerCard)
export const isDiseased = playerCard => playerCard && diseased(playerCard)
export const isTraitor = playerCard => playerCard && traitor(playerCard)

export const isVillageTeam = playerCard => playerCard && villageTeam(playerCard)
export const isWerewolfTeam = playerCard => playerCard && isWerewolfRole(playerCard)
export const isVampireTeam = playerCard => playerCard && isVampireRole(playerCard)
export const isAlienTeam = playerCard => playerCard && isAlienRole(playerCard)

const isAnySurvivor = (survivors, player_number) => survivors.some(survivor => survivor.position === player_number)
const isSurvivor = (card, survivors) => survivors.includes(card.position)
const isFallen = (card, fallens) => fallens.includes(card.position)
export const isWinner = (card, winners) => winners.includes(card.position)
export const isLoser = (card, losers) => losers.includes(card.position)

export const groobAlive = (playerCard, survivors, player_number) => isGroob(playerCard) && isAnySurvivor(survivors, player_number)
export const zerbAlive = (playerCard, survivors, player_number) => isZerb(playerCard) && isAnySurvivor(survivors, player_number)

export const allGroobAlive = (activeCards, survivors) => {
  const groobCards = activeCards.filter(card => groob(card))
  return groobCards.length > 0 && groobCards.every(card => isSurvivor(card, survivors))
}
export const allZerbsAlive = (activeCards, survivors) => {
  const zerbCards = activeCards.filter(card => zerb(card))
  return zerbCards.length > 0 && zerbCards.every(card => isSurvivor(card, survivors))
}

export const anyTargetDead = (activeCards, fallens) => activeCards.some(card => target(card) && isFallen(card, fallens))
export const anyZerbDead = (activeCards, survivors) => !activeCards.some(card => zerb(card) && isSurvivor(card, survivors))
export const anyGroobDead = (activeCards, survivors) => !activeCards.some(card => groob(card) && isSurvivor(card, survivors))
export const anyAssassinDead = (activeCards, fallens) => activeCards.some(card => assassin(card) && isFallen(card, fallens))
export const anyTannerDead = (activeCards, fallens) => activeCards.filter(card => tanner(card)).some(card => isFallen(card, fallens))
export const anySyntheticDead = (activeCards, fallens) => activeCards.filter(card => synthetic(card)).some(card => isFallen(card, fallens))

export const hasActiveWerewolf = activeCards => {
  return activeCards.some(card => werewolfRoles.includes(card.role))
}
export const hasActiveVampire = activeCards => {
  return activeCards.some(card => vampireRoles.includes(card.role))
}

export const anyWerewolfDead = (activeCards, fallens) => activeCards.filter(card => werewolfTeam(card)).some(card => isFallen(card, fallens))
export const anyVampireDead = (activeCards, fallens) => activeCards.filter(card => vampireTeam(card)).some(card => isFallen(card, fallens))
export const anyAlienDead = (activeCards, fallens) => activeCards.filter(card => alienTeam(card)).some(card => isFallen(card, fallens))

export const villageWins = (activeCards, fallens) =>
  (anyWerewolfDead(activeCards, fallens) || anyVampireDead(activeCards, fallens) || anyAlienDead(activeCards, fallens)) &&
  !anyTannerDead(activeCards, fallens) &&
  !anySyntheticDead(activeCards, fallens)
