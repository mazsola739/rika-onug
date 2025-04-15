import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const auraseerAction = (gamestate, token, title) => {
  const playersWithCardOrMarkActionTrue = getPlayerNumbersByGivenConditions(gamestate.players, 'cardOrMarkActionTrue')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    auraseer: playersWithCardOrMarkActionTrue,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(playersWithCardOrMarkActionTrue)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_card_or_mark_action', ...messageIdentifiers],
    uniqueInformation: { auraseer: playersWithCardOrMarkActionTrue },
    scene_end: true
  })
}

/*AURA SEER: moved or viewed card - Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, Troublemaker, Village Idiot, Cupid, Any Vampire, Count, Pickpocket, Priest, Diseased, Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */
