import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumbersWithCardOrMarkActionTrue, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_auraseer_kickoff_text'
      : 'auraseer_kickoff_text',
    hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 72 || (card.player_role_id === 72 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = auraseerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const auraseerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const playersWithCardOrMarkActionTrue = getPlayerNumbersWithCardOrMarkActionTrue(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    auraseer: playersWithCardOrMarkActionTrue
  }

  const messageIdentifiers = formatPlayerIdentifier(playersWithCardOrMarkActionTrue)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_card_or_mark_action', ...messageIdentifiers],
    icon: 'interaction',
    uniqueInformations: { auraseer: playersWithCardOrMarkActionTrue }
  })
}

/*AURA SEER moved viewed Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot, Cupid, Any Vampire, Count, Pickpocket, Priest, Diseased, 
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */
