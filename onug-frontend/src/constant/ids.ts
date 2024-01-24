export const action_card_ids: number[] = [
  1, 2, 4, 5, 6, 7, 7, 8, 9, 10, 11, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65,
  66, 67, 68, 69, 70, 71, 72, 73, 74, 77, 78, 80, 83, 85,
]

export const doppelgangerInstantActionsIds: number[] = [
  2, 8, 9, 11, 17, 18, 22, 23, 25, 26, 27, 31, 32, 34, 55, 56, 66, 68, 70, 85,
]

export const hasMarkIds: number[] = [28, 29, 31, 32, 34, 37, 38, 39, 40, 41]

export const alienTeam: number[] = [42, 43, 47, 54, 74]
export const wolfTeam: number[] = [7, 15, 16, 17, 21, 22, 83]
export const vampireTeam: number[] = [38, 39, 40, 41]
export const assassinTeam: number[] = [29]
export const tannerTeam: number[] = [10, 71]
export const syntheticTeam: number[] = [53]
export const blobTeam: number[] = [44]
export const morticianTeam: number[] = [49]
export const apprenticeassassinTeam: number[] = [28]
export const doppelgangerTeam: number[] = [1]

export const wolfIds: number[] = [15, 16, 17, 21, 22]
export const wolfIdsToCheck: number[] = [15, 16, 21, 22]
export const alienIds: number[] = [42, 43, 47, 53, 54, 74]
export const vampireIds: number[] = [39, 40, 41]
export const supervillainIds: number[] = [57, 60, 65, 69]
export const supervillainIdsToCheck: number[] = [57, 60, 65]
export const assassinIds: number[] = [28, 29]

export const alphaWolfId = 15
export const temptressId = 60

export const teamsById = {
  werewolfTeam: [7, 15, 16, 17, 21, 22, 83],
  vampireTeam: [38, 39, 40, 41],
  alienTeam: [42, 43, 47, 53, 54, 74],
  groobTeam: [47],
  zerbTeam: [54],
  villainTeam: [57, 60, 65, 69],
  villagerTeam: [
    50, 30, 1, 32, 31, 34, 37, 25, 45, 48, 5, 6, 85, 9, 18, 23, 35, 80, 51, 8,
    27, 36, 11, 26, 72, 33, 52, 2, 4, 73, 24, 46, 77, 20, 12, 13, 14, 3, 19, 81,
    75,
  ],
  heroTeam: [64, 58, 55, 56, 66, 70, 68, 67, 59, 61, 79, 82, 76, 84, 86],
  syntheticTeam: [53],
  tannerTeam: [10, 71],
  assassinTeam: [29],
  apprenticeassassinTeam: [28],
  blobTeam: [44, 'part of blob'], //second team
  morticianTeam: [49],
  nostradamusTeam: [80],
  madTeam: [62, 63],
  familyTeam: [78], //second team
  traitorTeam: ['mark_of_traitor', 'dagger_of_the_traitor'], //team is traitor of the player's team, example: if player is alien, hes new team alien traitor
  loverTeam: ['mark_of_love', 'mark_of_love'],
  diseasedTeam: ['mark_of_disease'],
  alienHelperTeam: ['alien helper'],
}
