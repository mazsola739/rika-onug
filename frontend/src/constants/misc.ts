import { ExpansionType, ExpansionsType, TeamNameType, TeamNames as TeamNamesTypes, TeamType, TeamsType, WakeType } from 'types'

export const STAGES = {
  LOBBY: 'LOBBY',
  ROOM: 'ROOM',
  TABLE: 'TABLE',
  GAME: 'GAME',
  COUNCIL: 'COUNCIL',
  VERDICT: 'VERDICT'
}

export const TEAMS: TeamsType = {
  village: 0,
  hero: 1,
  own: 2,
  werewolf: 3,
  vampire: 4,
  alien: 5,
  villain: 6
}

export const EXPANSIONS: ExpansionsType = {
  werewolf: 'Werewolf',
  daybreak: 'Daybreak',
  vampire: 'Vampire',
  alien: 'Alien',
  supervillains: 'Super Villains',
  bonusroles: 'Bonus Roles'
}

export const EXPANSION: ExpansionType = {
  werewolf: 'Werewolf',
  daybreak: 'Daybreak',
  vampire: 'Vampire',
  alien: 'Alien',
  supervillains: 'Super Villains',
  bonusroles: 'Bonus Roles'
}

export const TEAM_NAMES: TeamNamesTypes = {
  werewolf: 'Werewolf',
  vampire: 'Vampire',
  alien: 'Alien',
  villain: 'Villain',
  villager: 'Villager',
  hero: 'Heroes',
  synthetic: 'Synthetic',
  tanner: 'Tanner',
  assassin: 'Assassin',
  apprenticeassassin: 'Apprentice Assassin',
  blob: 'Blob',
  mortician: 'Mortician',
  nostradamus: 'Nostradamus',
  mad: 'Mad',
  family: 'Family',
  traitor: 'Traitor'
}

export const WAKE: WakeType = {
  day: 'day',
  twilight: 'twilight',
  dusk: 'dusk',
  night: 'night'
}

export const TEAM: TeamType = {
  village: 'village',
  hero: 'hero',
  own: 'own',
  werewolf: 'werewolf',
  vampire: 'vampire',
  alien: 'alien',
  villain: 'villain'
}

//TODO teamnames
export const TEAMNAME: TeamNameType = {
  village: 'The Townfolk',
  hero: 'The Bravehearts',
  own: 'The Inner Circle',
  werewolf: 'The Pack',
  vampire: 'The Coven',
  alien: 'The Cosmic Collective',
  villain: "The Rogue's Gallery"
}

export const roomNames = [
  { room_id: '', room_name: '' },
  { room_id: 'archives', room_name: 'Archives' },
  { room_id: 'armory', room_name: 'Armory' },
  { room_id: 'bottomless_pit', room_name: 'Bottomless Pit' },
  { room_id: 'dungeon', room_name: 'Dungeon' },
  { room_id: 'dynamite_room', room_name: 'Dynamite Room' },
  { room_id: 'great_hall', room_name: 'Great Hall' },
  { room_id: 'guest_bedroom', room_name: 'Guest Bedroom' },
  { room_id: 'kitchen', room_name: 'Kitchen' },
  { room_id: 'laboratory', room_name: 'Laboratory' },
  { room_id: 'observatory', room_name: 'Observatory' },
  { room_id: 'panic_room', room_name: 'Panic Room' },
  { room_id: 'parlor', room_name: 'Parlor' },
  { room_id: 'secret_passage', room_name: 'Secret Passage' },
  { room_id: 'sitting_room', room_name: 'Sitting Room' },
  { room_id: 'staff_quarters', room_name: 'Staff Quarters' },
  { room_id: 'study', room_name: 'Study' },
  { room_id: 'venus_grotto', room_name: 'Venus Grotto' },
  { room_id: 'workshop', room_name: 'Workshop' }
]