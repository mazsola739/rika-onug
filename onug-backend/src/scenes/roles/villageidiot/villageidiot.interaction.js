import { generateRoleInteraction } from '../../sceneUtils'

export const villageidiotInteraction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: ['left', 'right']
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_may_direction'],
    uniqueInformations: { answer_options: ['left', 'right'] }
  })
}
