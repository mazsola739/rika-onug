export interface TeamsType {
  village: number
  hero: number
  own: number
  werewolf: number
  vampire: number
  alien: number
  villain: number
}

export interface ExpansionsType {
  [key: string]: string
  onuw: 'Werewolf'
  onud: 'Daybreak'
  onuv: 'Vampire'
  onua: 'Alien'
  onus: 'Super Villians'
  onub: 'Bonus Roles'
}

export interface WakeType {
  day: 'day'
  twilight: 'twilight'
  dusk: 'dusk'
  night: 'night'
}

export interface ExpansionType {
  werewolf: 'onuw'
  daybreak: 'onud'
  vampire: 'onuv'
  alien: 'onua'
  supervillains: 'onus'
  bonusroles: 'onub'
}

export interface TeamType {
  village: 'village'
  hero: 'hero'
  own: 'own'
  werewolf: 'werewolf'
  vampire: 'vampire'
  alien: 'alien'
  villain: 'villain'
}
