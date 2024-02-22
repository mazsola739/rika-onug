import { getAllPlayerTokens } from "../utils"

const random_madscientist_intro = [
  "madscientist_intro_1_text",
  "madscientist_intro_2_text",
  "madscientist_intro_3_text",
  "madscientist_intro_4_text",
  "madscientist_intro_5_text",
  "madscientist_intro_6_text",
  "madscientist_intro_7_text",
  "madscientist_intro_8_text",
  "madscientist_intro_9_text",
  "madscientist_intro_10_text",
  "madscientist_intro_11_text",
  "madscientist_intro_12_text",
  "madscientist_intro_13_text",
  "madscientist_intro_14_text",
]
const random_madscientist_therefore = [
  "madscientist_therefore_1_text",
  "madscientist_therefore_2_text",
  "madscientist_therefore_3_text",
  "madscientist_therefore_4_text",
  "madscientist_therefore_5_text",
]
const random_madscientist_result = [
  "madscientist_result_1_text",
  "madscientist_result_2_text",
  "madscientist_result_3_text",
  "madscientist_result_4_text",
  "madscientist_result_5_text",
  "madscientist_result_6_text",
  "madscientist_result_7_text",
  "madscientist_result_8_text",
  "madscientist_result_9_text",
  "madscientist_result_10_text",
  "madscientist_result_11_text",
]
const random_madscientist_transition = [
  "madscientist_transition_1_text",
  "madscientist_transition_2_text",
  "madscientist_transition_3_text",
  "madscientist_transition_4_text",
  "madscientist_transition_5_text",
  "madscientist_transition_6_text",
  "madscientist_transition_7_text",
  "madscientist_transition_8_text",
  "madscientist_transition_9_text",
  "madscientist_transition_10_text",
  "madscientist_transition_11_text",
  "madscientist_transition_12_text",
  "madscientist_transition_13_text",
  "madscientist_transition_14_text",
  "madscientist_transition_15_text",
  "madscientist_transition_16_text",
  "madscientist_transition_17_text",
  "madscientist_transition_18_text",
  "madscientist_transition_19_text",
  "madscientist_transition_20_text",
  "madscientist_transition_21_text",
]

export const madscientist = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    "madscientist_kickoff_text",
    getRandomItemFromArray(random_madscientist_intro),
    getRandomItemFromArray(random_madscientist_therefore),
    getRandomItemFromArray(random_madscientist_result),
    getRandomItemFromArray(random_madscientist_transition),
    "madscientist_close_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration
  })

  return newGameState
}
