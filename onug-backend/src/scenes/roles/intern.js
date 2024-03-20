//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getMadScientistPlayerNumberByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const intern = (gameState, title, hasDoppelganger, hasMadScientist) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_intern_kickoff_text'
      : 'intern_kickoff_text',
    hasMadScientist ? 'intern_kickoff2_text' : 'intern_kickoff_alone_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 62 || (newGameState.players[token].card.player_role_id === 62 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 62 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = intern_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const intern_interaction = (gameState, token, title) => {
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
    scene_title: title,
    madscientist: madscientistPlayerNumbers,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [
      madscientistPlayerNumbers.length === 0
        ? 'interaction_mad_now'
        : 'interaction_mad',
    ],
    icon: 'mad',
    uniqInformations: { madscientist: madscientistPlayerNumbers },
  })
}
