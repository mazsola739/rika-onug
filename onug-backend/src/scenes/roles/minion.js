import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getSceneEndTime, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const minion = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_minion_kickoff_text'
      : 'minion_kickoff_text',
    'minion_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 7 || (card.player_role_id === 7 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = minion_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const minion_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'minion'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    werewolves,
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_werewolves', ...messageIdentifiers],
    icon: 'werewolf',
    uniqueInformations: { werewolves },
  })
}
