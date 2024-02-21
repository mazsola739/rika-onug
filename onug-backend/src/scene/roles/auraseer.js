export const auraseer = (hasDoppelganger, hasMarks) => [
  hasDoppelganger
    ? "doppelganger_auraseer_kickoff_text"
    : "auraseer_kickoff_text",
  hasMarks ? "auraseer_marks_and_cards_text" : "auraseer_cards_text",
]

/* if (conditions.hasAuraSeerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.auraseer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */


//? INFO: Aura Seer - All players that have viewed or moved a card or mark stick up their thumbs for her to see (list of roles in FAQ)
export const auraseer_interaction = (gameState, tokens, title) => {}

export const auraseer_response =  (gameState, token, selected_positions, title) => {}

/*AURA SEER moved viewed Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot,  Cupid, Any Vampire, Count,  Pickpocket, Priest, Diseased,  
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */