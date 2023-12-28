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
  onuw: 'Werewolf'
  onud: 'Daybreak'
  onuv: 'Vampire'
  onua: 'Alien'
  onus: 'Super Villians'
  onub: 'Bonus Roles'
}

export type WakeType = {
  day: 'day'
  twilight: 'twilight'
  dusk: 'dusk'
  night: 'night'
}

export type ExpansionType = {
  werewolf: 'onuw'
  daybreak: 'onud'
  vampire: 'onuv'
  alien: 'onua'
  supervillains: 'onus'
  bonusroles: 'onub'
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
