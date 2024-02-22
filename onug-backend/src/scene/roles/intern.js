import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const intern = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_intern_kickoff_text" : "intern_kickoff_text",
    hasMadScientist ? "intern_kickoff2_text" : "intern_kickoff_alone_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (newGameState.players[token].card.player_original_id === 62) {
      newGameState.players[token].scene_role_interaction.interaction = intern_interaction(newGameState, token)
    }
  })

  return newGameState
}

export const intern_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(newGameState.players)
  const playerCard = newGameState.players[token]?.card

  if (madscientistPlayerNumbers.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    madscientist: madscientistPlayerNumbers,
  }

  return generateRoleInteraction(
    newGameState,
    private_message = [madscientistPlayerNumbers.length === 0 ? "interaction_mad_now" : "interaction_mad"],
    icon = 'mad',
    uniqInformations = { madscientist: madscientistPlayerNumbers, },
  )
}