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

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'alienWithoutShield', gamestate.positions.shielded_cards)
  const aliensWithoutShieldIdentifiers = formatPlayerIdentifier(aliensWithoutShield)

  let possiblePositions = []
  const evenOrOdd = alienKey[0].includes('even') ? 'Even' : 'Odd'

  switch (alienKey[0]) {
    case 'identifier_any':
      possiblePositions = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards)
      break
    case 'identifier_anyeven':
    case 'identifier_anyodd':
      possiblePositions = getPlayerNumbersByGivenConditions(gamestate.players, `nonAlienWithoutShield${evenOrOdd}`, gamestate.positions.shielded_cards)
      break
    case 'identifier_everyone':
      possiblePositions = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
      break
    case 'identifier_oddplayers':
    case 'identifier_evenplayers':
      possiblePositions = getPlayerNumbersByGivenConditions(gamestate.players, `nonAlien${evenOrOdd}`)
      break
    default:
      possiblePositions = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_player', 'player_'))
  }
  const possibleIdentifier = formatPlayerIdentifier(possiblePositions)

  let selectable_cards = []
  let selectable_card_limit = { player: 0, center: 0 }
  let showCards = []

  switch (randomAlienInstruction) {
    case 'aliens_view': // 'Each alien may secretly view a card from: '
    case 'aliens_allview': // 'All aliens together may view a card from: '
      //TODO if only 1 selectable or null
      selectable_cards = possiblePositions
      privateMessage.push(...possibleIdentifier)
      break
    case 'aliens_left': // 'Give your card to the alien on your left.'
    case 'aliens_right': // 'Give your card to the alien on your right.'
      if (gamestate.players[token].shield) {
        privateMessage.push('action_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        moveCards(gamestate, token, direction, aliensWithoutShield)
        privateMessage.push('action_moved_yours', ...formatPlayerIdentifier([neighbor]))
      }
      break
    case 'aliens_show': // 'Show your alien card to the other aliens.'
      showCards = sawCards(gamestate, aliensWithoutShield, token)
      if (gamestate.players[token].shield) {
        privateMessage.push('action_shielded')
      }
      privateMessage.push('action_saw_card', ...aliensWithoutShieldIdentifiers)
      break
    case 'aliens_timer': // 'You have shortened the game timer by one half.'
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      break
    case 'aliens_newalien': // 'Tap one of the fists to turn that player into an alien from: '
    case 'aliens_alienhelper': // "Tap one of the fists to turn that player into alien team, but isn't an alien from: "
      //TODO if only 1 selectable or null
      selectable_cards = possiblePositions
      privateMessage.push(...possibleIdentifier)
      break
  }

  const obligatory = ['aliens_left', 'aliens_right', 'aliens_show', 'aliens_newalien', 'aliens_alienhelper'].includes(randomAlienInstruction)

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation: { aliens, cow },
    obligatory,
    scene_end: !obligatory
  })
}
