import { getPlayerNumbersWithCardOrMarkActionTrue } from '..'
import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'

export const auraseerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const playersWithCardOrMarkActionTrue = getPlayerNumbersWithCardOrMarkActionTrue(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    auraseer: playersWithCardOrMarkActionTrue,
    scene_end: true,
  }

  const messageIdentifiers = formatPlayerIdentifier(playersWithCardOrMarkActionTrue)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_card_or_mark_action', ...messageIdentifiers],
    uniqueInformations: { auraseer: playersWithCardOrMarkActionTrue },
    scene_end: true,
  })
}

/*AURA SEER: moved viewed - Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot, Cupid, Any Vampire, Count, Pickpocket, Priest, Diseased, 
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */
