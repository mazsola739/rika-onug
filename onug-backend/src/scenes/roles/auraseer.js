import { allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumbersWithCardOrMarkActionTrue, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const auraseer = (gameState, title, hasDoppelganger, hasMarks) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_auraseer_kickoff_text'
      : 'auraseer_kickoff_text',
    hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 72 || (card.player_role_id === 72 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = auraseer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const auraseer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const playersWithCardOrMarkActionTrue = getPlayerNumbersWithCardOrMarkActionTrue(newGameState.players)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    auraseer: playersWithCardOrMarkActionTrue
  }

  const messageIdentifiers = formatPlayerIdentifier(playersWithCardOrMarkActionTrue)

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_card_or_mark_action', ...messageIdentifiers],
    icon: 'interaction',
    uniqueInformations: { auraseer: playersWithCardOrMarkActionTrue }
  })
}

/*AURA SEER moved viewed Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot, Cupid, Any Vampire, Count, Pickpocket, Priest, Diseased, 
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */
