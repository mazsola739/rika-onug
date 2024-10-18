import { IDS, SCENE } from '../../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'

export const getMadScientistPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 63) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const intern = (gamestate, title, hasDoppelganger, hasMadScientist) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_intern_kickoff_text'
      : 'intern_kickoff_text',
    hasMadScientist ? 'intern_kickoff2_text' : 'intern_kickoff_alone_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 62 || (card.player_role_id === 62 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = internInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

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
    icon: 'mad',
    uniqueInformations: { mad: madscientist },
  })
}
