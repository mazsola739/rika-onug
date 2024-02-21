//TODO save which interaction!

import { getRandomItemFromArray } from '../utils'

const random_oracle_question = [
  "oracle_alienteam_text",
  "oracle_werewolfteam_text",
  "oracle_vampireteam_text",
  "oracle_alienexchange_text",
  "oracle_centerexchange_text",
  "oracle_viewcenter_text",
  "oracle_ripple_text",
  "oracle_viewplayer_text",

  "oracle_evenodd_text",
  "oracle_guessnumber_text",
]

const oracle_responses = {
  oracle_alienteam_text: {
    yes: ["oracle_alienteam_yes_text", "oracle_alienteam_yes2_text", "oracle_teamswitch_yes_text"],
    no:  ["oracle_teamswitch_no_text"],
  },
  oracle_werewolfteam_text: {
    yes: ["oracle_werewolfteam_yes_text", "oracle_teamswitch_yes_text"],
    no:  ["oracle_teamswitch_no_text"],
  },
  oracle_vampireteam_text: {
    yes: ["oracle_vampireteam_yes_text", "oracle_teamswitch_yes_text"],
    no:  ["oracle_teamswitch_no_text"],
  },
  oracle_alienexchange_text: {
    yes: ["oracle_alienexchange_yes_text"],
    no:  ["oracle_alienexchange_no_text"],
  },
  oracle_centerexchange_text: {
    yes: ["oracle_centerexchange_yes_text", "oracle_centerexchange_yes2_text"],
    no:  ["oracle_teamswitch_no_text"],
  },
  oracle_viewcenter_text: {
    yes: ["oracle_view_yes1_text", "oracle_view_yes2_text", "oracle_view_yes3_text"],
    no:  ["oracle_ripple_no_text"],
  },
  oracle_ripple_text: {
    yes: ["oracle_ripple_yes_text"],
    no:  ["oracle_ripple_no_text"],
  },
  oracle_viewplayer_text: {
    yes: ["oracle_viewplayer_result_text"],
    no:  ["oracle_viewplayer_result2_text"],
  },
}

/* if (conditions.hasOraclePlayer(newGameState.players)) {   //TODO make sure always have answer if oracle in selected cards
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [50])
  return roles.oracle_question_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

/* if (conditions.hasOracle && oracleAnswerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [50])
  return roles.oracle_reaction_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

export const oracle_question = (gameState) => [
  "oracle_kickoff_text", 
  getRandomItemFromArray(random_oracle_question),
]

export const oracle_reaction = (question, answer) => {
  if (question === "oracle_evenodd_text") {
    if (answer === "even") {
      return ["oracle_evenodd_even_text"]
    } else {
      return ["oracle_evenodd_odd_text"]
    }
  } else if (question === "oracle_guessnumber_text") {
    if (answer === "success") {
      return ["oracle_guessnumber_success_text"]
    } else {
      return ["oracle_guessnumber_failure_text"]
    }
  } else {
    if (answer === "yes") {
      return [getRandomItemFromArray(oracle_responses[question].yes)]
    } else {
      return [getRandomItemFromArray(oracle_responses[question].no)]
    }
  }
}


//? INFO: Oracle - App asks her a question, she enters it on the app, when then reveals what she did to everyone
//! At this moment oracle never see flipped or shielded cards, ripple different
//* No doppelganger
export const oracle_interaction = (gameState, tokens, title) => {}

export const oracle_response = (gameState, token, selected_positions, title) => {}