exports.oracle = {
  oracle_wake_text: 'ORACLE, wake up and answer the following question:',
  oracle_close_text: 'ORACLE, close your eyes.',
}

exports.random_oracle: Record<string, Record<string, string>> = {
  random_oracle_aliens: {
    oracle_alienteam_text: 'Would you like to join the Alien team?',

    oracle_alienteam_yes_text:
      'Congratulations, your card is now an alien card.',
    oracle_alienteam_yes2_text:
      "Do you want the Aliens to win? Clearly you do. Now, you only win if the Aliens win - but at least you aren't an Alien.",
    oracle_teamswitch_yes_text:
      'I bet you would, but for now, you are still the Oracle and are on the villager team.',
    oracle_teamswitch_no_text: 'Good for you, stay on the villager team.',
  },

  random_oracle_werewolf: {
    oracle_werewolfteam_text: 'Would you like to join the Werewolf team?',

    oracle_werewolfteam_yes_text:
      'Congratulations, your card is now a werewolf card.',
    oracle_teamswitch_yes_text:
      'I bet you would, but for now, you are still the Oracle and are on the villager team.',
    oracle_teamswitch_no_text: 'Good for you, stay on the villager team.',
  },

  random_oracle_vampire: {
    oracle_vampireteam_text: 'Would you like to join the Vampire team?',

    oracle_vampireteam_yes_text:
      'Congratulations, your card is now a vampire card.',
    oracle_teamswitch_yes_text:
      'I bet you would, but for now, you are still the Oracle and are on the villager team.',
    oracle_teamswitch_no_text: 'Good for you, stay on the villager team.',
  },

  random_oracle_alienexchange: {
    oracle_alienexchange_text:
      'Would you like to force the aliens to exchange cards?',

    oracle_alienexchange_yes_text:
      'When the aliens wake up, they will have to exchange cards.',
    oracle_alienexchange_no_text: 'Okay, the aliens have to keep their cards.',
  },

  random_oracle_exchange: {
    oracle_centerexchange_text:
      'Would you like to exchange your card with one from the center?',

    oracle_teamswitch_no_text: 'Good for you, stay on the villager team.',
    oracle_centerexchange_yes_text:
      'Okay ORACLE, go ahead and exchange your card with one from the center.',
    oracle_centerexchange_yes2_text:
      "What's so bad about being an oracle? Keep your card.",
  },

  random_oracle_center: {
    oracle_viewcenter_text: 'Would you like to view all three center cards?',

    oracle_ripple_no_text: 'Seriously? Why not? Okay, whatever.',
    oracle_view_yes1_text:
      'Three is way too many, you may look at one of them.',
    oracle_view_yes2_text:
      'Three is one too many, you may look at two of them.',
    oracle_view_yes3_text:
      "That's crazy! But go ahead, and look at all three of them.",
  },

  random_oracle_ripple: {
    oracle_ripple_text: 'Would you like to guarantee a Ripple?',

    oracle_ripple_yes_text:
      'Okay, there will be a ripple at the end of the night.',
    oracle_ripple_no_text: 'Seriously? Why not? Okay, whatever.',
  },

  random_oracle_evenodd: {
    oracle_evenodd_text: 'Do you have an even or odd player number?',

    oracle_evenodd_odd_text: 'The Oracle has an odd number.',
    oracle_evenodd_even_text: 'The Oracle has an even number.',
  },

  random_oracle_playernum: {
    oracle_viewplayer_text: 'What player number would you like to view?',
    oracle_viewplayer_result_text:
      'Excellent choice, go ahead and view the card of',
    oracle_viewplayer_result2_text:
      "No no, you can't view THAT card. Instead, view the card of",
  },

  random_oracle_number: {
    oracle_guessnumber_text: 'What number am I thinking of?',

    oracle_guessnumber_success_text:
      'You really are an oracle! Because that was indeed the number I was thinking of. For the rest of the night, you may keep your eyes open.',
    oracle_guessnumber_failure_text:
      "Wrong! You're clearly a terrible oracle. EVERYONE ELSE, your winning conditions have changed. You win if the Oracle dies. ORACLE, you only win if you don't die.",
  },
}
