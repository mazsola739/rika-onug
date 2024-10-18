import { generateRoleInteraction } from "../../sceneUtils"

export const villageidiotInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    answer_options: ['left', 'right'],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_direction'],
    uniqueInformations: { answer_options: ['left', 'right'] },
  })
}
