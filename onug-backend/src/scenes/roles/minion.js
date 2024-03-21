//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const minion = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_minion_kickoff_text'
      : 'minion_kickoff_text',
    'minion_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 7 || (card.player_role_id === 7 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = minion_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
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
