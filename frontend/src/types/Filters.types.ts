export type Expansion = 'Werewolf' | 'Daybreak' | 'Vampire' | 'Alien' | 'Super Villains' | 'Bonus Roles'

export type Style = 'classic' | 'comic'

export type ExpansionType = {
  werewolf: 'Werewolf'
  daybreak: 'Daybreak'
  vampire: 'Vampire'
  alien: 'Alien'
  supervillains: 'Super Villains'
  bonusroles: 'Bonus Roles'
}

export type ExpansionsType = {
  [key: string]: string
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

export type StyleType = {
  classic: 'classic'
  comic: 'comic'
}

export type TeamNameType = {
  village: 'The Townfolk'
  hero: 'The Bravehearts'
  own: 'The Inner Circle'
  werewolf: 'The Pack'
  vampire: 'The Coven'
  alien: 'The Cosmic Collective'
  villain: "The Rogue's Gallery"
}

export type roomNameType = { room_id: '', room_name: '' }

export type TeamNames = {
  alien: string
  apprenticeassassin: string
  assassin: string
  blob: string
  family: string
  hero: string
  mad: string
  mortician: string
  nostradamus: string
  synthetic: string
  tanner: string
  traitor: string
  vampire: string
  villager: string
  villain: string
  werewolf: string
}

export type TeamsType = {
  village: number
  hero: number
  own: number
  werewolf: number
  vampire: number
  alien: number
  villain: number
}

export type WakeType = {
  day: 'day'
  twilight: 'twilight'
  dusk: 'dusk'
  night: 'night'
}
