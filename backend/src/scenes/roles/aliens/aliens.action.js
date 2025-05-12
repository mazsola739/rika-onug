import { hasCow } from '../../conditions'
import { getPlayerNumbersByGivenConditions, formatPlayerIdentifier, generateRoleAction, sawCards, getNeighborByPosition, moveCards } from '../../sceneUtils'
import { aliensResponse } from './aliens.response'

export const aliensAction = (gamestate, token, title) => {
  const aliens = getPlayerNumbersByGivenConditions(gamestate, 'alien')
  const cow = hasCow ? getPlayerNumbersByGivenConditions(gamestate, 'cow') : []
  const alienIdentifiers = formatPlayerIdentifier(aliens)
  const cowIdentifiers = formatPlayerIdentifier(cow)
  const cowMessage = [hasCow ? 'action_no_cow' : 'action_cow', ...cowIdentifiers, 'POINT']
  const privateMessage = aliens.length === 1 ? ['action_no_aliens', ...cowMessage] : ['action_aliens', ...alienIdentifiers, 'POINT', ...cowMessage]

  const { instruction: randomAlienInstruction, key: alienKey } = gamestate.roles.aliens
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate, 'alienWithoutShield')
  const aliensWithoutShieldIdentifiers = formatPlayerIdentifier(aliensWithoutShield)

  let possiblePositions = []

  if (alienKey[0] === 'identifier_any') {
    possiblePositions = getPlayerNumbersByGivenConditions(gamestate, 'allPlayersWithoutShield')
  } else if (['identifier_anyeven', 'identifier_anyodd'].includes(alienKey[0])) {
    const evenOrOdd = alienKey[0].includes('even') ? 'even' : 'odd'
    possiblePositions = getPlayerNumbersByGivenConditions(gamestate, `${evenOrOdd}WithoutShield`)
  } else if (alienKey[0] === 'identifier_everyone') {
    possiblePositions = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
  } else if (['identifier_oddplayers', 'identifier_evenplayers'].includes(alienKey[0])) {
    const evenOrOdd = alienKey[0].includes('even') ? 'Even' : 'Odd'
    possiblePositions = getPlayerNumbersByGivenConditions(gamestate, `nonAlien${evenOrOdd}`)
  } else {
    possiblePositions = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_player', 'player_'))
  }

  const possibleIdentifier = formatPlayerIdentifier(possiblePositions)
  let selectable_cards = []
  let showCards = []
  let vote = false
  const obligatory = ['aliens_left', 'aliens_right', 'aliens_show', 'aliens_newalien', 'aliens_alienhelper'].includes(randomAlienInstruction)
  let scene_end = !obligatory

  switch (randomAlienInstruction) {
    case 'aliens_view': // 'Each alien may secretly view a card from: '
    case 'aliens_allview': // 'All aliens together may view a card from: '
    case 'aliens_newalien': // 'Tap one of the fists to turn that player into an alien from: '
    case 'aliens_alienhelper': // "Tap one of the fists to turn that player into alien team, but isn't an alien from: "
      if (possiblePositions.left === 0) {
        privateMessage.push('action_no_selectable_player')
        scene_end = true
      } else if (possiblePositions.left === 1) {
        gamestate.players[token].player_history[title].selectable_cards = selectable_cards
        aliensResponse(gamestate, token, selectable_cards, title)
      } else {
        selectable_cards = possiblePositions
        privateMessage.push(...possibleIdentifier)
      }
      vote = randomAlienInstruction !== 'aliens_view'
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
        scene_end = true
      }
      privateMessage.push('action_saw_card', ...aliensWithoutShieldIdentifiers)
      break
    case 'aliens_timer': // 'You have shortened the game timer by one half.'
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      break
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit: { player: 1, center: 0 } },
    uniqueInformation: { aliens, cow, vote },
    obligatory,
    scene_end
  })
}
