import { alienRoles, vampireRoles, werewolfRoles } from './constants'

// Utility functions
const isRole = (card, role) => card.role === role
const isTeam = (card, team) => card.team === team
const isAnySurvivor = (survivors, player_number) => survivors.some(survivor => survivor.position === player_number)
const isSurvivor = (card, survivors) => survivors.includes(card.position)
const isFallen = (card, fallens) => fallens.includes(card.position)

// Role check functions
const bodyguard = card => isRole(card, 'BODYGUARD')
const master = card => isRole(card, 'THE_MASTER')
const prince = card => isRole(card, 'PRINCE')
const hunter = card => isRole(card, 'HUNTER')
const lover = card => isRole(card, 'LOVER')
const blob = card => isRole(card, 'BLOB')
const mortician = card => isRole(card, 'MORTICIAN')
const zerb = card => isRole(card, 'ZERB')
const groob = card => isRole(card, 'GROOB')
const leader = card => isRole(card, 'LEADER')
const assassin = card => isRole(card, 'ASSASSIN')
const apprenticeAssassin = card => isRole(card, 'APPRENTICE_ASSASSIN')
const minion = card => isRole(card, 'MINION')
const renfield = card => isRole(card, 'RENFIELD')
const tanner = card => isRole(card, 'TANNER')
const synthetic = card => isRole(card, 'SYNTHETIC_ALIEN')
const target = card => isRole(card, 'TARGET')
const diseased = card => isRole(card, 'DISEASED')
const traitor = card => isRole(card, 'TRAITOR')

// Team check functions
const villageTeam = card => isTeam(card, 'village')
const werewolfTeam = card => isTeam(card, 'werewolf')
const vampireTeam = card => isTeam(card, 'vampire')
const alienTeam = card => isTeam(card, 'alien')

// Exported role check functions
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

// Exported team check functions
export const isVillageTeam = playerCard => playerCard && villageTeam(playerCard)
export const isWerewolfTeam = playerCard => playerCard && werewolfRoles.includes(playerCard.role)
export const isVampireTeam = playerCard => playerCard && vampireRoles.includes(playerCard.role)
export const isAlienTeam = playerCard => playerCard && alienRoles.includes(playerCard.role)

// Game status functions
export const isCircleVote = countedVotes => Object.values(countedVotes).every(votes => votes.length === 1)

export const getTeamStatus = activeCards => {
  const normalizedTeams = activeCards.map(card => (card.team === 'hero' ? 'village' : card.team))
  const teams = [...new Set(normalizedTeams)]
  return {
    isSameTeam: teams.length === 1,
    teams
  }
}

// Survivor and fallen check functions
export const isWinner = (card, winners) => winners.includes(card.position)
export const isLoser = (card, losers) => losers.includes(card.position)

// Alive and dead check functions
export const groobAlive = (playerCard, survivors, player_number) => isGroob(playerCard) && isAnySurvivor(survivors, player_number)
export const zerbAlive = (playerCard, survivors, player_number) => isZerb(playerCard) && isAnySurvivor(survivors, player_number)

export const allGroobAlive = (activeCards, survivors) => {
  const groobCards = activeCards.filter(groob)
  return groobCards.length > 0 && groobCards.every(card => isSurvivor(card, survivors))
}
export const allZerbsAlive = (activeCards, survivors) => {
  const zerbCards = activeCards.filter(zerb)
  return zerbCards.length > 0 && zerbCards.every(card => isSurvivor(card, survivors))
}

export const anyTargetDead = (activeCards, fallens) => activeCards.some(card => target(card) && isFallen(card, fallens))
export const anyZerbDead = (activeCards, survivors) => !activeCards.some(card => zerb(card) && isSurvivor(card, survivors))
export const anyGroobDead = (activeCards, survivors) => !activeCards.some(card => groob(card) && isSurvivor(card, survivors))
export const anyAssassinDead = (activeCards, fallens) => activeCards.some(card => assassin(card) && isFallen(card, fallens))
export const anyTannerDead = (activeCards, fallens) => activeCards.filter(tanner).some(card => isFallen(card, fallens))
export const anySyntheticDead = (activeCards, fallens) => activeCards.filter(synthetic).some(card => isFallen(card, fallens))

export const hasActiveWerewolf = activeCards => activeCards.some(card => werewolfRoles.includes(card.role))
export const hasActiveVampire = activeCards => activeCards.some(card => vampireRoles.includes(card.role))

export const anyWerewolfDead = (activeCards, fallens) => activeCards.filter(werewolfTeam).some(card => isFallen(card, fallens))
export const anyVampireDead = (activeCards, fallens) => activeCards.filter(vampireTeam).some(card => isFallen(card, fallens))
export const anyAlienDead = (activeCards, fallens) => activeCards.filter(alienTeam).some(card => isFallen(card, fallens))

export const villageWins = (activeCards, fallens) =>
  (anyWerewolfDead(activeCards, fallens) || anyVampireDead(activeCards, fallens) || anyAlienDead(activeCards, fallens)) &&
  !anyTannerDead(activeCards, fallens) &&
  !anySyntheticDead(activeCards, fallens)
