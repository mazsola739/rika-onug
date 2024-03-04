//@ts-check
import { SCENE, werewolvesAndDreamWolfIds } from '../../constant'
import { getAllPlayerTokens, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const minion = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_minion_kickoff_text'
      : 'minion_kickoff_text',
    'minion_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 7 || (newGameState.players[token].card.player_role_id === 7 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 7 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = minion_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const minion_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    werewolves: werewolves,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_werewolves'],
    icon: 'werewolf',
    uniqInformations: { werewolves: werewolves },
  })
}
