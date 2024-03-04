//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getVampirePlayerNumbersByMark, getVampirePlayerNumbersByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const renfield = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 38 || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 1) || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = renfield_interaction(newGameState, token, title)
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

export const renfield_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const vampires = getVampirePlayerNumbersByRoleIds(newGameState.players)
  const newVampire = getVampirePlayerNumbersByMark(newGameState.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerMark = newGameState.card_positions[currentPlayerNumber].mark

  if (gameState.players[token].card.player_original_id === 1) {
    const batPosition = newGameState.doppelganger_mark_positions.bat
    newGameState.doppelganger_mark_positions.bat = currentPlayerMark
    newGameState.card_positions[currentPlayerNumber].mark = batPosition
  } else {
    const batPosition = newGameState.mark_positions.bat
    newGameState.mark_positions.bat = currentPlayerMark
    newGameState.card_positions[currentPlayerNumber].mark = batPosition
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    vampires, 
    new_vampire: newVampire, 
    mark_of_bat: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_vampires', 'interaction_mark_of_bat'],
    icon: 'bat',
    uniqInformations: { vampires, new_vampire: newVampire, mark_of_bat: [currentPlayerNumber] },
  })
}
