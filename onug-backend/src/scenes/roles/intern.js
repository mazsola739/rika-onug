//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getMadScientistPlayerNumberByRoleIds, getSceneEndTime } from '../../utils'
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
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 62 || (card.player_role_id === 62 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = intern_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const intern_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const madscientist = getMadScientistPlayerNumberByRoleIds(
    newGameState.players
  )
  const playerCard = newGameState.players[token]?.card

  if (madscientist.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    madscientist,
  }

  const messageIdentifiers = formatPlayerIdentifier(madscientist)

  return generateRoleInteraction(newGameState, token, {
    private_message: [madscientist.length === 0 ? 'interaction_mad_now' : 'interaction_mad', ...messageIdentifiers],
    icon: 'mad',
    uniqInformations: { madscientist },
  })
}
