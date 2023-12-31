export const ripple: Record<string, string> = {
  ripple_intro_text: 'There has been a ripple in the space-time continuum!',
}

export const random_ripple_1minute: Record<string, string> = {
  ripple_1minute_text: 'You will only have one minute before you have to vote.',
}

export const random_ripple_repeat: Record<string, string> = {
  ripple_repeat_text:
    "You've entered a time loop and must repeat the entire night.",
  ripple_repeat_2_text: 'Some roles may not wake up during the time loop.',
}

export const random_ripple_repeat1p: Record<string, string> = {
  //1 p awake rest night
  ripple_repeat_text:
    "You've entered a time loop and must repeat the entire night.",
  ripple_repeat_2_text: 'Some roles may not wake up during the time loop.',
  ripple_openeyes_text: 'Keep your eyes open from this point forward.',
}

export const random_ripple_insomniac: Record<string, string> = {
  //can check own card odd even up to 3 players
  ripple_insomniac_text: 'You may secretly view your own card.',
}

export const random_ripple_nospeak: Record<string, string> = {
  //up to 3 players odd even everyone cant speak
  ripple_nospeak_text: 'You may not speak until after the vote.',
}

export const random_ripple_faceaway: Record<string, string> = {
  //up to 3 players odd even everyone must face aways
  ripple_faceaway_text:
    'You must face away from the table until after the vote.',
}

export const random_ripple_troublemaker: Record<string, string> = {
  //1 player telling between whos
  ripple_troublemaker_text: 'You may exchange cards between',
  ripple_troublemaker_end_text: 'Do not look at either card.',
}

export const random_ripple_steal: Record<string, string> = {
  //1 player  between whos player who -> anyone, up to 3 player, odd even
  ripple_robber_text: 'You may steal a card from',
  ripple_robber_end_text:
    'If you do, look at your new card. Do not wake up if that role is called.',
}

export const random_ripple_witch: Record<string, string> = {
  //1p 1 center card,
  ripple_witch_text:
    'You may view one center card. If you do, you must give it to',
}

export const random_ripple_view1: Record<string, string> = {
  //1p from any odd, even, up to3, the center any player
  ripple_view1_text: 'You may view one card from',
}

export const random_ripple_view2: Record<string, string> = {
  //1p 2cards any odd, even player up to 3
  ripple_view2_text: 'You may view two cards from',
}

export const random_ripple_reveal: Record<string, string> = {
  //1p neigbor on ur left, right, yourself
  ripple_revealer_text: 'You may turn over one card from',
  ripple_revealer_end_text:
    'If that card is on the Villager team, leave it face up. Otherwise, turn it back over, face down.',
}

export const random_ripple_dualview: Record<string, string> = {
  //2p  center any even any odd any player
  ripple_dualseer_text: 'together, you may view one card from',
  ripple_view2_text: 'You may view two cards from',
}

export const random_ripple_twovote: Record<string, string> = {
  //everyone, even players, odd players,
  ripple_doublevote_text:
    'When it is time to vote, use two hands to point, with each hand counting as one vote.',
}

export const random_ripple_shuffle: Record<string, string> = {
  //1p
  ripple_dualshuffle1_text: 'show your cards to each other, then give both to',
  ripple_dualshuffle2_text: 'shuffle both cards face down. Give one to',
  ripple_dualshuffle3_text: 'and place the other in front of yourself.',
}

export const random_ripple_drunk: Record<string, string> = {
  //1p
  ripple_drunk_text: 'You must exchange your card with a card from',
  ripple_drunk_end_text: 'but you may not look at either card.',
}

export const random_ripple_voteapp: Record<string, string> = {
  ripple_app_text:
    'When it is time to vote, you may vote for the app instead of a player. If the app receives the most votes, no one is killed.',
}

export const random_ripple_repeatrole: Record<string, string> = {
  //1 active player random
  ripple_repeatrole_text:
    'you get to repeat your night action. Whatever you did when you woke up before, do it again, right now',
}

export const random_ripple_iamalien: Record<string, string> = {
  //everyone, odd players, even players.

  ripple_iamalien_text:
    'From now until the vote, you may only say this phrase: "I am an alien."',
}
