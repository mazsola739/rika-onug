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
