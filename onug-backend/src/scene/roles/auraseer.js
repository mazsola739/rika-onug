import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const auraseer = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_auraseer_kickoff_text"
      : "auraseer_kickoff_text",
    hasMarks ? "auraseer_marks_and_cards_text" : "auraseer_cards_text",
  ] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 72) {
    newGameState.players[token].scene_role_interaction.interaction = auraseer_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const auraseer_interaction = (gameState, token) => {return {}}
export const auraseer_response =  (gameState, token, selected_positions) => {return {}}

/*AURA SEER moved viewed Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot,  Cupid, Any Vampire, Count,  Pickpocket, Priest, Diseased,  
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */