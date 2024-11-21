import { formatPlayerIdentifier, generateRoleAction } from '../../sceneUtils'
import { getMadScientistPlayerNumberByRoleIds } from './intern.utils'

export const internInteraction = (gamestate, token, title) => {
  const madscientist = getMadScientistPlayerNumberByRoleIds(gamestate.players)
  const playerCard = gamestate.players[token]?.card

  if (madscientist.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    madscientist,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(madscientist)

  return generateRoleAction(gamestate, token, {
    private_message: [madscientist.length === 0 ? 'action_mad_now' : 'action_mad', ...messageIdentifiers],
    uniqueInformations: { madscientist },
    scene_end: true
  })
}
