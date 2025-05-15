import { ALIEN_IDS, SUPER_VILLAIN_IDS, VAMPIRE_IDS, MASONS, WEREVOLVES_WITHOUT_DREAMWOLF, WEREWOLVES } from '../../constants'

//TODO REFACTOR MAYBE ONLY GAMSTATE NEED?
const filters = {
  //current player
  currentPlayer: (player, shieldedCards, token, playerToken) => playerToken === token,

  //other players
  otherPlayers: (player, shieldedCards, token, playerToken) => playerToken !== token,
  otherPlayersWithoutShield: (player, shieldedCards, token, playerToken) => playerToken !== token  && !shieldedCards.includes(player.player_number),

  //all players
  allPlayers: () => true,
  allPlayersWithoutShield: (player, shieldedCards) => !shieldedCards.includes(player.player_number),

  //even or odd players
  even: player => parseInt(player.player_number.replace('player_', ''), 10) % 2 === 0,
  odd: player => parseInt(player.player_number.replace('player_', ''), 10) % 2 !== 0,
  evenWithoutShield: (player, shieldedCards) => !shieldedCards.includes(player.player_number) && parseInt(player.player_number.replace('player_', ''), 10) % 2 === 0,
  oddWithoutShield: (player, shieldedCards) => !shieldedCards.includes(player.player_number) && parseInt(player.player_number.replace('player_', ''), 10) % 2 !== 0,

  //werewolves
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
  nonAlienEven: player => !ALIEN_IDS.includes(player.card.player_role_id) && parseInt(player.player_number.replace('player_', ''), 10) % 2 === 0,
  nonAlienOdd: player => !ALIEN_IDS.includes(player.card.player_role_id) && parseInt(player.player_number.replace('player_', ''), 10) % 2 !== 0,
  nonAlienWithoutShield: (player, shieldedCards) => !ALIEN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  nonAlienWithoutShieldEven: (player, shieldedCards) =>
    !ALIEN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number) && parseInt(player.player_number.replace('player_', ''), 10) % 2 === 0,
  nonAlienWithoutShieldOdd: (player, shieldedCards) =>
    !ALIEN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number) && parseInt(player.player_number.replace('player_', ''), 10) % 2 !== 0,
  zerb: player => player.card.player_role_id === 54,
  groob: player => player.card.player_role_id === 47,

  //villains
  nonVillainWithoutShield: (player, shieldedCards) => !SUPER_VILLAIN_IDS.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number),
  villain: player => SUPER_VILLAIN_IDS.includes(player.card.player_role_id),

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

  //evilometer
  evilometer: player => player.card.player_role_id === 58,

  //seer
  anySeer: player => player.card.player_role_id === 9 || player.card.player_role_id === 18,
  anySeerWithoutShield: (player, shieldedCards) => (player.card.player_role_id === 9 || player.card.player_role_id === 18) && !shieldedCards.includes(player.player_number),

  //mad
  madscientist: player => player.card.player_role_id === 63,

  //mark or card action done
  cardOrMarkActionTrue: player => player.card_or_mark_action === true,

  //empath
  empath: player => player.card.player_role_id === 77 && player.card.player_original_id !== 1,
  doppelgangerEmpath: player => player.card.player_role_id === 77 && player.card.player_original_id === 1,
  nonEmpath: player => player.card.player_role_id !== 77,
}

export const getPlayerNumbersByGivenConditions = (gamestate, filter, token = null) => {
  const players = gamestate.players
  const shielded_cards = gamestate.positions.shielded_cards
  const condition = filters[filter]

  const result = []
  for (const playerToken in players) {
    const player = players[playerToken]
    if (condition(player, shielded_cards, token, playerToken)) {
      result.push(player.player_number)
    }
  }
  return result
}

export const getPartOfGroupByToken = (players, token, randomInstruction) => {
  const tokens = Object.keys(players)
  const totalPlayers = tokens.length

  const groupHeadsNumber = parseInt(players[token].player_number.split('_')[1], 10)
  const partOfGroup = [`player_${groupHeadsNumber}`]

  const side = randomInstruction.includes('left') ? 'left' : randomInstruction.includes('right') ? 'right' : 'each'
  const amount = randomInstruction.includes('4') ? 4 : randomInstruction.includes('3') ? 3 : randomInstruction.includes('2') ? 2 : 1

  const getPartOfGroupNumber = index => {
    let partOfGroupNumber = groupHeadsNumber + index
    if (partOfGroupNumber <= 0) {
      partOfGroupNumber += totalPlayers
    } else if (partOfGroupNumber > totalPlayers) {
      partOfGroupNumber -= totalPlayers
    }
    return partOfGroupNumber
  }

  if (side === 'each' || side === 'left') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupLeftSideNumber = getPartOfGroupNumber(-i)
      partOfGroup.push(`player_${partOfGroupLeftSideNumber}`)
    }
  }

  if (side === 'each' || side === 'right') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupRightSideNumber = getPartOfGroupNumber(i)
      partOfGroup.push(`player_${partOfGroupRightSideNumber}`)
    }
  }

  return partOfGroup
}
