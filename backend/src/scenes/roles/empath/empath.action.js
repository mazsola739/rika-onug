import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

//TODO OPEN EYES CLOSE EYES
/*   let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [...randomPlayers.filter(player => player !== 'conjunction_and').map(player => player.replace('identifier_player', 'player_'))]
  } else if (randomKey === 'identifier_oddplayers' || randomKey === 'identifier_evenplayers') {
    const evenOrOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate, evenOrOdd)
  } else if (randomKey === 'identifier_everyone') {
    activePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
  } */

export const empathAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
  const selectable_card_limit = { player: 1, center: 0 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_any'],
    selectableMarks: { selectable_cards, selectable_card_limit },
    obligatory: true
  })
}
