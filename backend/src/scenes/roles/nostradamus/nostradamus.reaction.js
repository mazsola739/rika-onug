export const nostradamusReaction = (gamestate, title) => {
  /*   const tokens = getAllPlayerTokens(gamestate.players)   */
  const team = gamestate.roles.nostradamus.team
  const nostradamusTeam = !team ? 'nostradamus_team_villager_text' : `nostradamus_team_${team}_text`
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]

  /*   
tokens.forEach((token) => { gamestate.players[token].action_finished = false
createAndSendSceneMessage(gamestate, token, title, action, narration)}) */

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
