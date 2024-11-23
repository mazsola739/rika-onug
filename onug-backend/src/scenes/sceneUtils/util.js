import { ALL_ALIEN, ALL_SUPER_VILLAIN, ALL_VAMPIRE, ALL_WEREWOLF, MASONS } from '../../constants'
//TODO finish
const filters = {
  alien: player => ALL_ALIEN.includes(player.card.player_role_id),
  alienNoShield: player => ALL_ALIEN.includes(player.card.player_role_id) && !player.card?.shield,
  nonAlienNoShield: player => !ALL_ALIEN.includes(player.card.player_role_id) && !player.card?.shield,

  nonWerewolfNoShield: player => !ALL_WEREWOLF.includes(player.card.player_role_id) && !player.card?.shield,
  werewolfAndDreamwolfNoShield: player => ALL_WEREWOLF.includes(player.card.player_role_id) && !player.card?.shield,
  werewolf: player => ALL_WEREWOLF.includes(player.card.player_role_id),
  dreamWolf: player => player.card.player_role_id === 21 && player.card.player_mark !== 'mark_of_fear',

  assassin: player => player.card.player_role_id === 29,
  tanner: player => player.card.player_role_id === 10,
  apprenticeAssassin: player => player.card.player_role_id === 28,
  cardOrMarkActionTrue: player => player.card_or_mark_action === true,
  anySeer: player => player.card.player_role_id === 9 || player.card.player_role_id === 18,
  madScientist: player => player.card.player_role_id === 63,
  lovers: player => player.card.player_mark === 'mark_of_love',
  mason: player => MASONS.includes(player.card.player_role_id),
  vampireByMark: player => player.player_mark === 'mark_of_vampire',

  nonVillainNoShield: player => !ALL_SUPER_VILLAIN.includes(player.card.player_role_id) && !player.card?.shield,

  seerNoShield: player => (player.card.player_role_id === 9 || player.card.player_role_id === 18) && !player.card?.shield,
  groob: player => player.card.player_role_id === 47,
  vampire: player => ALL_VAMPIRE.includes(player.card.player_role_id),
  villain: player => ALL_SUPER_VILLAIN.includes(player.card.player_role_id),
  zerb: player => player.card.player_role_id === 54
}

export const getPlayerNumbersByFilter = (players, filter) => {
  const condition = filters[filter]

  const result = []
  for (const token in players) {
    const player = players[token]
    if (condition(player)) {
      result.push(player.player_number)
    }
  }
  return result
}
