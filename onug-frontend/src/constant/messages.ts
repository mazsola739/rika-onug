export * from './buttons'
export * from './narrations/identifier'
export * from './role'

export const FYI_TBD='FYI: TBD!!! ' 

//TODO better messages
//messages
export const message_tapped = 'You got tapped by your neighbor'
export const no_night_action = 'No such a night action, sorry'
export const no_selectable_option = 'No selectable option, sorry'

export const really_want = 'Is that you really want?'
export const the_end = 'The end is near...'
export const ripple_start = 'Get ready for best night of your life!'
export const action_open_you_eyes = 'You can open your eyes for the rest of the night'
export const action_watch_or_skip = 'You can watch or skip the scene'
export const action_no_active_player = 'No active player in the scene'

export const action_oracle_question = 'MessageBoxAnswer the question'
export const action_oracle_answer = 'Your answer:'
export const action_stay_oracle = 'Stay oracle'

//TEAM
export const action_oracle_team = 'You are in oracle team'
export const action_alien_team = 'You are in alien team'
export const action_werewolf_team = 'You are in werewolf team'
export const action_vampire_team = 'You are in vampire team'

//ROLE
export const action_alien_role = 'You are alien'

//any other player
export const action_may_one_any_other = 'You may choose any other player'
export const action_may_two_any_other = 'You may choose any two other player'
export const action_must_one_any_other = 'You must choose any other player'

//any player
export const action_may_one_any = 'You may choose any player (including yourself)'
export const action_may_two_any = 'You may choose any two player (including yourself)'
export const action_must_one_any = 'You must choose any player (including yourself)'
export const action_must_two_any = 'You must choose any two players (including yourself)'
export const action_must_three_any = 'You must choose any three players (including yourself)'

//neighbor
export const action_must_one_neighbor = 'You must choose any player of your neighbors'
export const action_may_oneneighbor = 'You may choose any player of your neighbors'
export const action_may_leftneighbor = 'You may choose your left neighbors'
export const action_may_rightneighbor = 'You may choose your right neighbors'
export const action_may_bothneighbors = 'You may choose both your neighbors'

//any specific player
export const action_werewolves = 'Look for Werewolves'
export const action_dreamwolf = 'and dreamwolf'
export const action_no_werewolves = 'No Werewolves'
export const action_no_dreamwolf = 'no dreamwolf'
export const action_vampires = 'Look for Vampires'
export const action_no_vampires = 'No Vampires'
export const action_aliens = 'Look for Aliens'
export const action_no_aliens = 'No Aliens'
export const action_zerbgroob = 'Look for Zerb and Groob'
export const action_zerb = 'Look for Zerb'
export const action_no_zerb = 'No Zerb player'
export const action_groob = 'Look for Groob'
export const action_no_groob = 'No Groob player'
export const action_no_zerbgroob = 'No Zerb player nor Groob player, sorry'
export const action_groobzerb = 'Look for Groob and Zerb'
export const action_villains = 'Look for Super Villains'
export const action_no_villains = 'No Super Villains'
export const action_tanner = 'Look for Tanner'
export const action_no_tanner = 'No Tanner player'
export const action_assassin = 'Look for Assassin'
export const action_no_assassin = 'No Assassin player'
export const action_apprenticeassassin = 'Look for Apprentice Assassin'
export const action_no_apprenticeassassin = 'No Apprentice Assassin player'
export const action_mad = 'Look for Mad Scientist'
export const action_no_mad = 'No Mad Scientist player'
export const action_masons = 'Look for Masons'
export const action_no_masons = 'No Mason player'
export const action_seers = 'Look for Seer(s)'
export const action_card_or_mark_action = 'Look for other players who have performed a card or mark action'
export const action_mark_of_lover = 'Look for your love interest'
export const action_no_mark_of_lover = 'None loves you'
export const action_part_of_blob = 'Look for part of blob'
export const action_part_of_family = 'Look for part of family'
export const action_own_card = 'Look for your own card'
export const action_own_mark = 'Look for your own mark'
export const action_selected_card = 'Look for selected card'

//TODO better idea?
export const action_seer_end = 'two center'

export const action_must_one_any_non_werewolf = 'You must choose any other non-werewolf player'
export const action_must_one_any_non_vampire = 'You must choose any other non-vampire player'
export const action_must_one_any_non_villain = 'You must choose any other non-villain player'
export const action_must_one_any_non_alien = 'You must choose any other non-alien player'

export const action_no_selectable_player = 'You cannot choose any player based on these criteria'

export const action_may_direction = 'You may choose a direction to move other players cards'
export const action_may_look = 'You may look at the cards'
export const action_may_look_yourself = 'You may look at your cards'

//center card
export const action_may_one_center = 'You may choose one center card'
export const action_may_two_center = 'You may choose two center card'
export const action_must_one_center = 'You must choose one center card'
export const action_must_two_center = 'You must choose two center cards'
export const action_must_three_center = 'You must choose three center cards'

//responses
//villager
export const action_villager = 'You are villager'
//nothing
export const action_nothing = 'You chose to do nothing'
//timer
export const action_timer = 'The voting time halved'
//shielded
export const action_shielded = 'You are unable to do your action, you have shield'
//new role,
export const action_you_are_that_role = 'You are now this role:'
//intern
export const action_mad_now = 'You are Mad Scientist now'
//apprenticetanner
export const action_tanner_now = 'You are Tanner now'
//sentinel
export const action_placed_shield = 'You placed a shield front of'
//curator
export const action_placed_artifact = 'You placed an artifact front of'
//flipped card
export const action_flipped_card = 'You flipped card from:'
//saw card
export const action_saw_card = 'You saw card from:'
export const action_saw_own_card = 'You saw your own card'
//saw mark
export const action_saw_mark = 'You saw mark from:'
export const action_saw_own_mark = 'You saw your own mark'
//swapped card
export const action_swapped_cards = 'You swapped cards between:'
//swapped mark
export const action_swapped_marks = 'You swapped marks between:'
//tapped
export const action_tap = 'You tapped:'
export const action_no_tap = "You don't have such type of neighbor."
export const action_got_tapped_by_villain = 'You got tapped by your super villain neighbor'
export const action_got_tapped_by_alien = 'You got tapped by your alien neighbor'
//turned
export const action_turned_alienhelper = 'You turned to helper of aliens:'
export const action_turned_newalien = 'You turned to alien:'
//moved
export const action_moved = 'You moved cards to'
export const action_moved_yours = 'You moved your card to'

//vote
export const action_voted_together = 'The team decided, team and '

//mark_of_vampire
export const action_mark_of_vampire = 'You placed Mark of Vampire front of'
//mark_of_fear
export const action_mark_of_fear = 'You placed Mark of Fear front of'
//mark_of_bat
export const action_mark_of_bat = 'You placed Mark of Bat front yourself'
//mark_of_disease
export const action_mark_of_disease = 'You placed Mark of Disease front of'
//mark_of_love
export const action_mark_of_love = 'You placed Mark of Love front of'
//mark_of_traitor
export const action_mark_of_traitor = 'You placed Mark of the Traitor front of'
//mark_of_clarity
export const action_mark_of_clarity = 'You placed Mark of Clarity front of yourself and'
//mark_of_assassin
export const action_mark_of_assassin = 'You placed Mark of Assassin front of'
