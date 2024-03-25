//@ts-check
import { SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getLoversPlayerNumbersByMark } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const lovers = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['lovers_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGameState.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = lover_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const lover_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const lovers = getLoversPlayerNumbersByMark(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    lovers,
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_lover', ...messageIdentifiers],
    icon: 'lover',
    uniqInformations: { lovers },
  })
}
