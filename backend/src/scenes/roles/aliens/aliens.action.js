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

  let messageInstruction = ''
  let messagePositions = []

  if (alienKey[0] === 'identifier_any') {
    messageInstruction = 'action_may_one_any'
    messagePositions = getPlayerNumbersByGivenConditions(gamestate, 'allPlayersWithoutShield')
  } else if (['identifier_anyeven', 'identifier_anyodd'].includes(alienKey[0])) {
    const evenOrOdd = alienKey[0].includes('even') ? 'even' : 'odd'
    messagePositions = getPlayerNumbersByGivenConditions(gamestate, `${evenOrOdd}WithoutShield`)
    messageInstruction = `action_may_one_any_${evenOrOdd}`
  } else if (alienKey[0] === 'identifier_everyone') {
    messagePositions = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
    messageInstruction = 'action_must_one_any_non_alien'
  } else if (['identifier_oddplayers', 'identifier_evenplayers'].includes(alienKey[0])) {
    const evenOrOdd = alienKey[0].includes('even') ? 'Even' : 'Odd'
    messagePositions = getPlayerNumbersByGivenConditions(gamestate, `nonAlien${evenOrOdd}`)
    messageInstruction = `action_must_one_any_non_alien_${evenOrOdd}`
  } else {
    messagePositions = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_player', 'player_'))
    messageInstruction = 'action_must_one_non_alien_from'
  }

  const possibleIdentifier = formatPlayerIdentifier(messagePositions)
  let selectable_cards = []
  let showCards = []
  let vote = false
  const obligatory = ['aliens_left', 'aliens_right', 'aliens_show', 'aliens_newalien', 'aliens_alienhelper'].includes(randomAlienInstruction)
  let scene_end = true

  switch (randomAlienInstruction) {
    case 'aliens_view': // 'Each alien may secretly view a card from: '
    case 'aliens_allview': // 'All aliens together may view a card from: '
      vote = randomAlienInstruction !== 'aliens_view'
      if (messagePositions.left === 0) {
        privateMessage.push('action_no_selectable_player')
      } else {
        selectable_cards = messagePositions
        privateMessage.push(messageInstruction, ...possibleIdentifier)
        scene_end = false
      }
      break
      //TODO save to the player history the position where moved?
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
    case 'aliens_timer': { // 'You have shortened the game timer by one half.'
      const voter_time = gamestate.vote_timer === 300000 ? 150000 : gamestate.vote_timer //TODO need better solution later when timer not just 5 min
      gamestate.vote_timer = voter_time
      privateMessage.push('action_timer')
      break
    }
    case 'aliens_newalien': // 'Tap one of the fists to turn that player into an alien from: '
    case 'aliens_alienhelper': // "Tap one of the fists to turn that player into alien team, but isn't an alien from: "
      vote = true
      if (messagePositions.left === 0) {
        privateMessage.push('action_no_selectable_player')
      } else if (messagePositions.left === 1) {
        gamestate.players[token].player_history[title].selectable_cards = selectable_cards
        aliensResponse(gamestate, token, selectable_cards, title)
      } else {
        selectable_cards = messagePositions
        privateMessage.push(messageInstruction, ...possibleIdentifier)
      }
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
