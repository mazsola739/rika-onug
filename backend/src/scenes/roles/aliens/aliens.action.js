import { hasCow } from '../../conditions'
import { getPlayerNumbersByGivenConditions, formatPlayerIdentifier, generateRoleAction, sawCards, getNeighborByPosition, moveCards } from '../../sceneUtils'

export const aliensAction = (gamestate, token, title) => {
  const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')

  const cow = hasCow ? getPlayerNumbersByGivenConditions(gamestate.players, 'cow') : []
  const alienIdentifiers = formatPlayerIdentifier(aliens)

  const cowIdentifiers = formatPlayerIdentifier(cow)
  const cowMessage = [hasCow ? 'action_no_cow' : 'action_cow', ...cowIdentifiers, 'POINT']
  const privateMessage = aliens.length === 1 ? ['action_no_aliens', ...cowMessage] : ['action_aliens', ...alienIdentifiers, 'POINT', ...cowMessage]

  const randomAlienInstruction = gamestate.roles.aliens.instruction
  const alienKey = gamestate.roles.aliens.key

  let selectable_cards = []
  let selectable_card_limit = { player: 0, center: 0 }
  let showCards = []
  let vote = false
  let new_alien = []
  let new_alien_helper = []

  
  const evenOrOdd = alienKey[0].includes('even') ? 'Even' : 'Odd'
  const isEvenOrOdd = alienKey[0].includes('even') || alienKey[0].includes('odd')
  const isAny = alienKey[0].includes('any')
  const isPlayer = alienKey[0].includes('identifier_player')

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'alienWithoutShield', gamestate.positions.shielded_cards)
  const aliensWithoutShieldIdentifiers = formatPlayerIdentifier(aliensWithoutShield)
  
  const anyWihtoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards)
  const anyWihtoutShieldIdentifiers = formatPlayerIdentifier(anyWihtoutShield)
  const evenOrOddPlayers = getPlayerNumbersByGivenConditions(gamestate.players, `nonAlien${evenOrOdd}`)
  const evenOrOddPlayersIdentifiers = formatPlayerIdentifier(evenOrOddPlayers)
  const selectablePlayerNumbers = isPlayer ? alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_player', 'player_')) : []
  const alienKeyIdentifiers = formatPlayerIdentifier(selectablePlayerNumbers)
  const message = isEvenOrOdd ? evenOrOddPlayersIdentifiers : isAny ? anyWihtoutShieldIdentifiers : alienKeyIdentifiers

  const evenOrOddWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, `nonAlienWithoutShield${evenOrOdd}`, gamestate.positions.shielded_cards)
  const evenOrOddWithoutShieldIdentifiers = formatPlayerIdentifier(evenOrOddWithoutShield)
  const anyPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const anyPlayersIdentifiers = formatPlayerIdentifier(anyPlayers)
  const newMessage = isEvenOrOdd ? evenOrOddWithoutShieldIdentifiers : anyPlayersIdentifiers


  switch (randomAlienInstruction) {
    case 'aliens_view': //aliens_view = 'Each alien may secretly view a card from: '
    case 'aliens_allview': //aliens_allview = 'All aliens together may view a card from: '
      selectable_cards = isEvenOrOdd ? evenOrOddPlayers : isAny ? anyWihtoutShield : selectablePlayerNumbers
      privateMessage.push(...message)
      break

    case 'aliens_left': //aliens_left = 'Give your card to the alien on your left.'
    case 'aliens_right': //aliens_right = 'Give your card to the alien on your right.'
      if (gamestate.players[token].shield) {
        privateMessage.push('action_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        moveCards(gamestate, token, direction, aliensWithoutShield)
        privateMessage.push('action_moved_yours', ...formatPlayerIdentifier([neighbor]))
      }
      break
    case 'aliens_show': //aliens_show = 'Show your alien card to the other aliens.'
      showCards = sawCards(gamestate, aliensWithoutShield, token)
      privateMessage.push('action_saw_card', ...aliensWithoutShieldIdentifiers)
      break
    case 'aliens_timer': //aliens_timer = 'You have shortened the game timer by one half.'
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      break
    case 'aliens_newalien': //aliens_newalien = 'Tap one of the fists to turn that player into an alien from: '
    case 'aliens_alienhelper':
      //aliens_alienhelper = "Tap one of the fists to turn that player into alien team, but isn't an alien from: "

      selectable_cards = isEvenOrOdd ? evenOrOddWithoutShield : anyPlayers
      privateMessage.push(...newMessage)
      break
  }

  const obligatory = ['aliens_left', 'aliens_right', 'aliens_show', 'aliens_newalien', 'aliens_alienhelper'].includes(randomAlienInstruction)

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation: { aliens, cow, vote, new_alien, new_alien_helper },
    obligatory,
    scene_end: !obligatory
  })
}
