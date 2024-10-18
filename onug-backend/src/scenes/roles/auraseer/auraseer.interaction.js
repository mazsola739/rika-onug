import { generateRoleInteraction } from "../../generateRoleInteraction"
import { formatPlayerIdentifier } from "../../sceneUtils"
import { getPlayerNumbersWithCardOrMarkActionTrue } from "./auraseer.utils"

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
