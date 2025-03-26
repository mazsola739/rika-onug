import { ALIEN_IDS, SUPER_VILLAINS, VAMPIRE_IDS, MASONS, WEREVOLVES_WITHOUT_DREAMWOLF, WEREWOLVES } from '../../constants'

//TODO finish
const filters = {
  //no role
  playerWithoutShield: (player, shieldedCards) => !shieldedCards.includes(player.player_number), //do i need
  player: player => player.player_number, //do i need

  //werwolves
  nonWerewolfWithoutShield: (player, shieldedCards) => !WEREWOLVES.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  werewolfAndDreamwolf: player => WEREWOLVES.includes(player.card.player_role_id),
  werewolfAndDreamwolfWithoutShield: (player, shieldedCards) => WEREWOLVES.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  werewolf: player => WEREVOLVES_WITHOUT_DREAMWOLF.includes(player.card.player_role_id),
  dreamwolf: player => player.card.player_role_id === 21 && player.card.player_mark !== 'mark_of_fear',

  //vampires
  vampireByMark: player => player.player_mark === 'mark_of_vampire',
  vampire: player => VAMPIRE_IDS.includes(player.card.player_role_id),
  nonVampire: player => !VAMPIRE_IDS.includes(player.card.player_role_id) && player.player_mark !== 'mark_of_vampire',

  //aliens
  alien: player => ALIEN_IDS.includes(player.card.player_role_id),
  alienWithoutShield: (player, shieldedCards) => ALIEN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  nonAlienWithoutShield: (player, shieldedCards) => !ALIEN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  zerb: player => player.card.player_role_id === 54,
  groob: player => player.card.player_role_id === 47,

  //villains
  nonVillainWithoutShield: (player, shieldedCards) => !SUPER_VILLAINS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  villain: player => SUPER_VILLAINS.includes(player.card.player_role_id),

  //witness
  witness: player => player.card.eyes_open,

  //masons
  mason: player => MASONS.includes(player.card.player_role_id),

  //lovers
  lover: player => player.card.player_mark === 'mark_of_love',

  //assassin
  assassin: player => player.card.player_role_id === 29,
  apprenticeAssassin: player => player.card.player_role_id === 28,

  //tanner
  tanner: player => player.card.player_role_id === 10,

  //cow
  cow: player => player.card.player_role_id === 45,

  //seer
  anySeer: player => player.card.player_role_id === 9 || player.card.player_role_id === 18,
  anySeerWithoutShield: (player, shieldedCards) => (player.card.player_role_id === 9 || player.card.player_role_id === 18) && !shieldedCards.includes(player.player_number),

  //mad
  madscientist: player => player.card.player_role_id === 63,

  //mark or card action done
  cardOrMarkActionTrue: player => player.card_or_mark_action === true
}

export const getPlayerNumbersByGivenConditions = (players, filter, shieldedCards = []) => {
  const condition = filters[filter]

  const result = []
  for (const token in players) {
    const player = players[token]
    if (condition(player, shieldedCards)) {
      result.push(player.player_number)
    }
  }
  return result
}

export const getSelectableOtherPlayerNumbersWithNoShield = (players, token) => {
  const result = []
  //!shieldedCards.includes(player.player_number)
  Object.keys(players).forEach(playerToken => {
    if (playerToken !== token && players[playerToken].shield !== true) {
      result.push(players[playerToken].player_number)
    }
  })

  return result
}

export const getAnyEvenOrOddPlayerNumbers = (players, evenOrOdd) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    const playerNumberValue = parseInt(player.player_number.replace('player_', ''), 10)

    if ((evenOrOdd === 'even' && playerNumberValue % 2 === 0) || (evenOrOdd === 'odd' && playerNumberValue % 2 !== 0)) {
      result.push(player.player_number)
    }
  }

  return result
}

export const empathVotersPlayerNumbers = (totalPlayers, evenOdd = '') => {
  const result = []

  totalPlayers = Math.min(Math.max(1, totalPlayers), 12)

  let start = 1
  let step = 1
  if (evenOdd === 'even') {
    start = 2
    step = 2
  } else if (evenOdd === 'odd') {
    start = 1
    step = 2
  }

  for (let i = start; i <= totalPlayers; i += step) {
    result.push(`player_${i}`)
  }

  return result
}
