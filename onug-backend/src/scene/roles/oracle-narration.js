//TODO save which interaction!

const { getRandomItemFromArray } = require("../utils")

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

exports.oracle_question_narration  = () => [
  "oracle_kickoff_text", 
  getRandomItemFromArray(random_oracle_question),
]

exports.oracle_reaction = (question, answer) => {
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
