import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const auraseerAction = (gamestate, token, title) => {
  const auraseer = getPlayerNumbersByGivenConditions(gamestate, 'cardOrMarkActionTrue')

  const messageIdentifiers = formatPlayerIdentifier(auraseer)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_card_or_mark_action', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { auraseer },
    scene_end: true
  })
}

/* AURA SEER: moved or viewed card - Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, Troublemaker, Village Idiot, Cupid, Any Vampire, Count, Pickpocket, Priest, Diseased, Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */
