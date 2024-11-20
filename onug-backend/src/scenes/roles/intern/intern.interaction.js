import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
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

  return generateRoleInteraction(gamestate, token, {
    private_message: [madscientist.length === 0 ? 'interaction_mad_now' : 'interaction_mad', ...messageIdentifiers],
    uniqueInformations: { madscientist },
    scene_end: true
  })
}
