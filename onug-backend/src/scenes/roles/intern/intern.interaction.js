import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getMadScientistPlayerNumberByRoleIds } from './intern.utils'

export const internInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const madscientist = getMadScientistPlayerNumberByRoleIds(newGamestate.players)
  const playerCard = newGamestate.players[token]?.card

  if (madscientist.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    madscientist,
  }

  const messageIdentifiers = formatPlayerIdentifier(madscientist)

  return generateRoleInteraction(newGamestate, token, {
    private_message: [madscientist.length === 0 ? 'interaction_mad_now' : 'interaction_mad', ...messageIdentifiers],
    uniqueInformations: { mad: madscientist },
  })
}
