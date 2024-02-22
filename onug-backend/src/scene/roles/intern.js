//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getMadScientistPlayerNumberByRoleIds,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const intern = (gameState, title, hasDoppelganger, hasMadScientist) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_intern_kickoff_text'
      : 'intern_kickoff_text',
    hasMadScientist ? 'intern_kickoff2_text' : 'intern_kickoff_alone_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 62) {
      interaction = intern_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const intern_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(
    newGameState.players
  )
  const playerCard = newGameState.players[token]?.card

  if (madscientistPlayerNumbers.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    madscientist: madscientistPlayerNumbers,
  }

  return generateRoleInteraction(newGameState, {
    private_message: [
      madscientistPlayerNumbers.length === 0
        ? 'interaction_mad_now'
        : 'interaction_mad',
    ],
    icon: 'mad',
    uniqInformations: { madscientist: madscientistPlayerNumbers },
  })
}
