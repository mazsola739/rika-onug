export type TeamsType = {
  village: number
  hero: number
  own: number
  werewolf: number
  vampire: number
  alien: number
  villain: number
}

export type ExpansionsType = {
  [key: string]: string
  werewolf: 'Werewolf',
  daybreak: 'Daybreak',
  vampire: 'Vampire',
  alien: 'Alien',
  supervillains: 'Super Villains',
  bonusroles: 'Bonus Roles',
}

export type TeamNames = {
  werewolf: string
  vampire: string
  alien: string
  villain: string
  villager: string
  hero: string
  synthetic: string
  tanner: string
  assassin: string
  apprenticeassassin: string
  blob: string
  mortician: string
  nostradamus: string
  mad: string
  family: string
  traitor: string
}

export type WakeType = {
  day: 'day'
  twilight: 'twilight'
  dusk: 'dusk'
  night: 'night'
}

export type ExpansionType = {
  werewolf: 'Werewolf'
  daybreak: 'Daybreak'
  vampire: 'Vampire'
  alien: 'Alien'
  supervillains: 'Super Villains'
  bonusroles: 'Bonus Roles'
}

export type TeamType = {
  village: 'village'
  hero: 'hero'
  own: 'own'
  werewolf: 'werewolf'
  vampire: 'vampire'
  alien: 'alien'
  villain: 'villain'
}
