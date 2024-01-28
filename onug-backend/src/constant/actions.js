//TODO easteregg
//todo joke

exports.identifier_player  = [
  "identifier_player1_text",
  "identifier_player2_text",
  "identifier_player3_text",
  "identifier_player4_text",
  "identifier_player5_text",
  "identifier_player6_text",
  "identifier_player7_text",
  "identifier_player8_text",
  "identifier_player9_text",
  "identifier_player10_text",
  "identifier_player11_text",
  "identifier_player12_text",
]

exports.aliens = "aliens_kickoff_text" //show aline cards
exports.random_aliens = [
  "aliens_view_text", //alienAnyKeys - selected - show it  - update known if own selected
  "aliens_allview_text", //alienAnyKeys random selected - selected - may show - update known & actual if own selected & viewed
  "aliens_stare_text", //alien cards - no update
  "aliens_left_text", //swap card from right side alien - show new alien card secretly - update aliens known & actual card
  "aliens_right_text", //swap card from left side alien - show new alien card secretly - update aliens known & actual card
  "aliens_show_text", //actual character cards show public - update alines known & actual card
  "aliens_timer_text", //vote time halfing - no update
  "aliens_newalien_text", //alienAllKeys random selected - show to this player alien cards - update known & actual selected card team
  "aliens_alienhelper_text", //alienAllKeys  random selected - show to this player alien cards - update player known & actual new team alien helper
]
exports.alienAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "activePlayers", //up to 3 random players example: identifier_player1_text with 'or'
]
exports.alienAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
]


//TODO rename consts
exports.apprenticeassassin = "apprenticeassassin_alone_text" //doppelganger! may any player mark swap with Mark of the Assassin - update selected player actual mark
exports.assassin_apprenticeassassin = "apprenticeassassin_kickoff_text" //doppelganger! show assassin or may any player mark swap with Mark of the Assassin - update selected player actual mark

exports.apprenticeseer = "apprenticeseer_kickoff_text" //may select 1 center card - show selected card - no update expect if it was own known

exports.apprenticetanner = "apprenticetanner_kickoff_text" //doppelganger! show Tanner and Doppelganger-Tanner - no update

//TODO check
exports.assassin = "assassin_kickoff_text" //doppelganger! any player mark swap with Mark of the Assassin - update selected player actual mark

exports.auraseer = "auraseer_kickoff_text" //doppelganger! show selected player thumb -  no update
exports.auraseer_mark = "auraseer_mark_kickoff_text" //doppelganger! show selected player thumbs - no update

exports.beholder_seer = "beholder_seer_kickoff_text" //doppelganger! show seer thumb, may choose seer card, show selected card - no update expect if it was own known
exports.beholder_apprenticeseer = "beholder_apprenticeseer_kickoff_text" //doppelganger! show apprentice seer thumb, may choose apprentice seer card, show selected card - no update expect if it was own known
exports.beholder_seer_apprenticeseer = "beholder_seer_apprenticeseer_kickoff_text" //doppelganger! show seer and apprentice seer thumb, may choose apprentice seer and seer cards, show selected cards - no update expect if it was own known

exports.random_blob_kickoff_text = [ //randomize text, show selected card in focus? - update selected players actual team
  "blob_1pleft_text",
  "blob_1pright_text",
  "blob_eachside_text",
  "blob_2pleft_text",
  "blob_2pright_text",
  "blob_3pleft_text",
  "blob_3pright_text",
  "blob_4pleft_text",
  "blob_4pright_text",
  "blob_2eachside_text",
] 
exports.blob = ["blob_is_end_text", "blob_are_end_text"]

exports.bodysnatcher = ["bodysnatcher_kickoff_text", "bodysnatcher_end_text"] //doppelganger!
exports.random_bodysnatcher = [
  "bodysnatcher_steal_text", //bodysnatcherKeys - select card, swap and show selected,  - update known & actual card team
  "bodysnatcher_center_text", //select center card swap and show,  - update known & actual card team
]
exports.bodysnatcherKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_bothneighbors_text",
]

exports.copycat = "copycat_kickoff_text" //select center card - update player known & actual role and team

exports.cow = "cow_kickoff_text" //doppelganger! show cow fist sending tap message to cow - no update

exports.cupid = "cupid_kickoff_text" //select any 2 players swap marks to mark of love - update players actual mark and (known if selected is own)

exports.curator = "curator_kickoff_text" //doppelganger!may select any player place random artifact - update player's info artifact true (from this point check every player's known artifact if wakes up)

exports.detector = "detector_kickoff_text" //may look 2 center, or any other 1 player card - no update expect if it was own known

exports.diseased = "diseased_kickoff_text" //select any neighbor, swap mark to disease - update selected player actual mark

/* Doppelgänger instant night actions: Sentinel 25, Alpha Wolf 17, Mystic Wolf 22, Seer 9, Apprentice Seer 18, P.I. 23, Robber 8, 
Witch 27, Troublemaker 11, Village Idiot 26, Drunk 2, Diseased 32, Cupid 31, Instigator 34, Thing 85, Annoying Lad 55, Detector 56,
Role Retriever 66, Voodoo Lou 70 or Switcheroo 68. */
exports.doppelganger = [
  "doppelganger_kickoff_text",
  "doppelganger_verbose_intro_text",
  "doppelganger_verbose_or_text",
  "doppelganger_verbose_outro_text",
]
exports.doppelganger_thecount = "doppelganger_thecount_kickoff_text" //id: 39 után
exports.doppelganger_renfield = "doppelganger_renfield_kickoff_text" //id: 38 egyszerre
exports.doppelganger_priest = "doppelganger_priest_kickoff_text" //id: 37  if no [28, 29, 31, 32, 34, 38, 39, 40, 41], then no need to
exports.doppelganger_assassin = "doppelganger_assassin_kickoff_text" //id: 29 után
exports.doppelganger_apprenticeassassin_assassin = "doppelganger_apprenticeassassin_assassin_kickoff_text" //id: 28 & 29 után
exports.doppelganger_apprenticeassassin = "doppelganger_apprenticeassassin_kickoff_text" //id: 28 után
exports.doppelganger_cow = "doppelganger_cow_kickoff_text" //id: 45 egyszerre
exports.doppelganger_leader = "doppelganger_leader_kickoff_text" //id: 48 egyszerre
exports.doppelganger_leader_zerbgroob = "doppelganger_leader_zerbgroob_text" //id: 48 egyszerre
exports.doppelganger_bodysnatcher = "doppelganger_bodysnatcher_kickoff_text" //id: 74 után
exports.doppelganger_evilometer = "doppelganger_evilometer_kickoff_text" //id 58 egyszerre
exports.doppelganger_minion = "doppelganger_minion_kickoff_text" //id: 7 egyszerre
exports.doppelganger_apprenticetanner = "doppelganger_apprenticetanner_kickoff_text" //id: 71 egyszerre
exports.doppelganger_intern_madscientist = "doppelganger_intern_madscientist_kickoff_text" //id 62 egyszerre
exports.doppelganger_intern = "doppelganger_intern_kickoff_text" //id 62 & 63 egyszerre
exports.doppelganger_marksman = "doppelganger_marksman_kickoff_text" //id: 35 egyszerre
exports.doppelganger_psychic = "doppelganger_psychic_kickoff_text" //id: 51 után
exports.doppelganger_pickpocket = "doppelganger_pickpocket_kickoff_text" //id: 36 után
exports.doppelganger_auraseer = "doppelganger_auraseer_kickoff_text" //id: 72 egyszerre
exports.doppelganger_auraseer_marks = "doppelganger_auraseer_marks_kickoff_text" //id: 72 & marks egyszerre
exports.doppelganger_gremlin = "doppelganger_gremlin_kickoff_text" //id: 33 után
exports.doppelganger_groobzerb = "doppelganger_groobzerb_kickoff_text" //id: 47 vagy 54 egyszerre
exports.doppelganger_rascal = "doppelganger_rascal_kickoff_text" //id: 52 után
exports.doppelganger_insomniac = "doppelganger_insomniac_kickoff_text" //id: 4 egyszerre
exports.doppelganger_selfawarenessgirl = "doppelganger_selfawarenessgirl_kickoff_text" //id 67 egyszerre
exports.doppelganger_squire = "doppelganger_squire_kickoff_text" //id: 83 egyszerre
exports.doppelganger_beholder_seer = "doppelganger_beholder_seer_kickoff_text" //id: 9 egyszerre
exports.doppelganger_beholder_apprenticeseer = "doppelganger_beholder_apprenticeseer_kickoff_text" //id: 18 egyszerre
exports.doppelganger_beholder_seer_apprenticeseer = "doppelganger_beholder_seer_apprenticeseer_kickoff_text" //id: 9 & 18 egyszerre
exports.doppelganger_revealer = "doppelganger_revealer_kickoff_text" //id: 24 után
exports.doppelganger_exposer = "doppelganger_exposer_kickoff_text" //id: 46 után
exports.doppelganger_flipper = "doppelganger_flipper_kickoff_text" //id 59 után
exports.doppelganger_empath = "doppelganger_empath_kickoff_text" //id: 77 után
exports.doppelganger_curator = "doppelganger_curator_kickoff_text" //id: 20 után
exports.doppelganger_mortician = "doppelganger_mortician_kickoff_text" //id: 49 után
exports.doppelganger_familyman = "doppelganger_familyman_kickoff_text" //id 78 egyszerre

exports.drpeeker = "drpeeker_kickoff_text" //egyszerre többi gonosszal! may view any other player - send message about the actions to super villains

exports.drunk = "drunk_kickoff_text" //swap your card with any other player - update actual cards

exports.empath = "empath_kickoff_text" //doppelganger! - show vote result - no update
exports.empathAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
  "activePlayers", //up to 3 random players example: identifier_player1_text with 'and'
]
exports.random_empath = [
  "empath_action1_text",
  "empath_action2_text",
  "empath_action3_text",
  "empath_action4_text",
  "empath_action5_text",
  "empath_action6_text",
  "empath_action7_text",
  "empath_action8_text",
  "empath_action9_text",
  "empath_action10_text",
  "empath_action11_text",
  "empath_action12_text",
  "empath_action13_text",
  "empath_action14_text",
]

//TODO EVERYONE texts
exports.everyone = [
  "everyone_epic_intro_text", //at lease 2 type evil team: werewolves, aliens, vampires, super villains
  "everyone_card_text", //show players card - update known informations
  "everyone_vote_text",
  "everyone_mark_text", //show players mark - update known informations
  "everyone_artifact_text", //show to the player(s) their artifact(s)
]

exports.evilometer = "evilometer_kickoff_text" //doppelganger! show her evilometer card and send message to her - no update

exports.exposer = "exposer_kickoff_text" //doppelganger! select center cards, dont hide (only from this moment to the next players when their turn comes) - no update expect if it was own known
exports.random_exposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]

exports.familyman_kickoff = [ //doppelganger! random selected players, show focus, update players actual team
  "familyman_1pleft_text",
  "familyman_1pright_text",
  "familyman_eachside_text",
  "familyman_2pleft_text",
  "familyman_2pright_text",
  "familyman_3pleft_text",
  "familyman_3pright_text",
  "familyman_4pleft_text",
  "familyman_4pright_text",
  "familyman_2eachside_text",
]
exports.familyman_close = ["familyman_is_end_text", "familyman_are_end_text"]

exports.flipper = "flipper_kickoff_text" //doppelganger! may choose any other player card, show and dont hide - update known player card

exports.gremlin = "gremlin_kickoff_text" //doppelganger! may switch cards OR marks any 2 players - update players actual info

exports.groobzerb = "groobzerb_kickoff_text" //doppelganger! - update team, if both see eachother

exports.insomniac = "insomniac_kickoff_text" //doppelganger! show own card - update known and actual card if need

exports.instigator = "instigator_kickoff_text" //choose any player mark swap with traitor - update players actual mark, and known if own

exports.intern = "intern_kickoff_alone_text" //doppelganger! - no update
exports.intern_madscientist = "intern_kickoff_text" //doppelganger! - no update

exports.leader = "leader_kickoff_text" //doppelganger! show aline cards - no update
exports.leader_zerbgroob = "leader_zerbgroob_text" //doppelganger! show zerb and groob cards - no update

exports.lovers = "lovers_kickoff_text" //show lovers - no update

exports.madscientist = ["madscientist_kickoff_text", "madscientist_close_text"] //no update
exports.random_madscientist_intro = [
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
exports.random_madscientist_therefore = [
  "madscientist_therefore_1_text",
  "madscientist_therefore_2_text",
  "madscientist_therefore_3_text",
  "madscientist_therefore_4_text",
  "madscientist_therefore_5_text",
]
exports.random_madscientist_result = [
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
exports.random_madscientist_transition = [
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

exports.marksman = "marksman_kickoff_text" //doppelganger! may select a mark and may select a card from another player (cant be same player)  - no update expect if own known

exports.masons = "masons_kickoff_text" //look for other masons - no update

exports.minion = "minion_kickoff_text" //doppelganger! show wolf cards - no update

exports.mirrorman = "mirrorman_kickoff_text" //select center card - update player known & actual role and team

exports.mortician = "mortician_kickoff_text" //doppelganger! show 1 or 2 neighbor cards - no update
exports.random_mortician = ["mortician_1card_text", "mortician_2cards_text"]

exports.mysticwolf = "mysticwolf_kickoff_text" //select another player, show selected card - no update

exports.nostradamus = [ //start look up to 3 cards, if card team non-villager or non-hero stop view, if 3rd still villager or hero, tell to everyone new team
  "nostradamus_kickoff_text",
  "nostradamus_teamstart_text",
  "nostradamus_team_alien_text",
  "nostradamus_team_werewolf_text",
  "nostradamus_team_vampire_text",
  "nostradamus_team_villain_text",
  "nostradamus_team_villager_text",
  "nostradamus_team_hero_text",
  "nostradamus_team_assassin_text",
  "nostradamus_team_apprenticeassassin_text",
  "nostradamus_team_tanner_text",
  "nostradamus_team_synthetic_text",
  "nostradamus_team_blob_text",
  "nostradamus_team_family_text",
  "nostradamus_team_mortician_text",
  "nostradamus_team_mad_text",
  "nostradamus_team_doppelganger_text",
]

exports.oracle = "oracle_kickoff_text"
exports.random_oracle = [
  "random_oracle_aliens", //yes no question - update if alien team
  "random_oracle_werewolf", //yes no question - update if werewolf team
  "random_oracle_vampire", //yes no question - update if vampire team
  "random_oracle_alienexchange", //yes no, if yes: make sure aliens get card exchange action! (swap now?), if no make sure they not gets exchange action - no update
  "random_oracle_exchange", //yes no, if yes select center card and swap, - update known and actual card
  "random_oracle_center", //YES NO, if yes select up to 3 cards from center, show - no update
  "random_oracle_ripple", //yes no, make sure ripple or not from answer - no update
  "random_oracle_evenodd", //tell everyone if oracle even or odd number
  "random_oracle_playernum", //choose player number, and show the selected player
  "random_oracle_number" //guess number
]
exports.random_oracle_aliens = [
  "oracle_alienteam_text",
  "oracle_alienteam_yes_text",
  "oracle_alienteam_yes2_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
]
exports.random_oracle_werewolf = [
  "oracle_werewolfteam_text",
  "oracle_werewolfteam_yes_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
  "random_oracle_evenodd",
  "random_oracle_playernum",
  "random_oracle_number",
]
exports.random_oracle_vampire = [
  "oracle_vampireteam_text",
  "oracle_vampireteam_yes_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
]
exports.random_oracle_alienexchange = [
  "oracle_alienexchange_text",
  "oracle_alienexchange_yes_text",
  "oracle_alienexchange_no_text",
]
exports.random_oracle_exchange = [
  "oracle_centerexchange_text",
  "oracle_teamswitch_no_text",
  "oracle_centerexchange_yes_text",
  "oracle_centerexchange_yes2_text",
]
exports.random_oracle_center = [
  "oracle_viewcenter_text",
  "oracle_ripple_no_text",
  "oracle_view_yes1_text",
  "oracle_view_yes2_text",
  "oracle_view_yes3_text",
]
exports.random_oracle_ripple = [
  "oracle_ripple_text",
  "oracle_ripple_yes_text",
  "oracle_ripple_no_text",
]
exports.random_oracle_evenodd = [
  "oracle_evenodd_text",
  "oracle_evenodd_odd_text",
  "oracle_evenodd_even_text",
]
exports.random_oracle_playernum = [
  "oracle_viewplayer_text",
  "oracle_viewplayer_result_text",
  "oracle_viewplayer_result2_text",
]
exports.random_oracle_number = [
  "oracle_guessnumber_text",
  "oracle_guessnumber_success_text",
  "oracle_guessnumber_failure_text",
]

exports.paranormalinvestigator = "paranormalinvestigator_kickoff_text" //may view up to 2 another players card, if non-villager or non-hero stop - update known card role, actual card role

exports.pickpocket = "pickpocket_kickoff_text" // may select another player, swap own mark with selected, show new mark - update known and actual player info

exports.priest = "priest_kickoff_text" //if no [28, 29, 31, 32, 34, 38, 39, 40, 41], then no need to start doppelganger! swap hes mark to mark of clarity, may choose another player to swap mark of clarity - update actual player information and own known

exports.psychic = "psychic_kickoff_text" //doppelganger! select 1 or 2 cards even or odd players - no update expect if it was own known
exports.random_psychic = ["psychic_view1_text", "psychic_view2_text"]
exports.psychicKeys = ["identifier_anyeven_text", "identifier_anyodd_text"]

exports.rapscallion = "rapscallion_kickoff_text" //egyszerre többi gonosszal! choose center card, show selected card - no update expect if it was own known

exports.rascal = [ //doppelganger!
  "rascal_kickoff_text",
  "rascal_witchend_text",
  "rascal_drunkend_text",
  "rascal_robberend_text",
]
exports.random_rascal = [
  "rascal_idiot_text", //may village idiot action
  "rascal_troublemaker_text", //rascalAnyTwoKeys may pick 2 players suggested by game - update selected players actual cards
  "rascal_witch_text", //rascalAnyOneKeys may view card suggested position - update expect if own know
  "rascal_drunk_text", //rascalAnyOneKeys must change card - update selected and own actual cards
  "rascal_robber_text", //rascalAnyOneKeys may swap card with suggested players, show new card - update own known and actual, and selected player actual
]
exports.rascalAnyOneKeys = [
  'identifier_higher_text',
  'identifier_lower_text',
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_oneneighbor_text',
  'identifier_center_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
]
exports.rascalAnyTwoKeys = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
]

exports.renfield = "renfield_kickoff_text" //doppelganger! show vampires, show mark of vampire, swap own mark with mark of bat - update known and actual player info

exports.revealer = "revealer_kickoff_text" //doppelganger! select any other player card, flip, flip it back if its non-villager (from this moment dont hide from players whos doin thier action) - update board card

exports.ripple = "ripple_intro_text"
exports.ripple_random = [
  "random_ripple_1minute", //vote time only 1 minute
  "random_ripple_repeat", //repeat the night with 1 person see everything
  "random_ripple_repeat1p", //repeat the night action for 1 player
  "random_ripple_insomniac", //selected players 
  "random_ripple_nospeak",
  "random_ripple_faceaway",
  "random_ripple_troublemaker",
  "random_ripple_steal",
  "random_ripple_witch",
  "random_ripple_view1",
  "random_ripple_view2",
  "random_ripple_reveal",
  "random_ripple_dualview",
  "random_ripple_twovote",
  "random_ripple_shuffle",
  "random_ripple_drunk",
  "random_ripple_voteapp",
  "random_ripple_repeatrole",
  "random_ripple_iamalien",
]
exports.random_ripple_1minute = "ripple_1minute_text"
exports.random_ripple_repeat = ["ripple_repeat_text", "ripple_repeat_2_text"]
exports.random_ripple_repeat1p = [
  "ripple_repeat_text",
  "ripple_repeat_2_text",
  "ripple_openeyes_text",
]
exports.random_ripple_insomniac = "ripple_insomniac_text"
exports.random_ripple_nospeak = "ripple_nospeak_text"
exports.random_ripple_faceaway = "ripple_faceaway_text"
exports.random_ripple_troublemaker = [
  "ripple_troublemaker_text",
  "ripple_troublemaker_end_text",
]
exports.random_ripple_steal = ["ripple_robber_text", "ripple_robber_end_text"]
exports.random_ripple_witch = "ripple_witch_text"
exports.random_ripple_view1 = "ripple_view1_text"
exports.random_ripple_view2 = "ripple_view2_text"
exports.random_ripple_reveal = [
  "ripple_revealer_text",
  "ripple_revealer_end_text",
]
exports.random_ripple_dualview = ["ripple_dualseer_text", "ripple_view2_text"]
exports.random_ripple_twovote = "ripple_doublevote_text"
exports.random_ripple_shuffle = [
  "ripple_dualshuffle1_text",
  "ripple_dualshuffle2_text",
  "ripple_dualshuffle3_text",
]
exports.random_ripple_drunk = ["ripple_drunk_text", "ripple_drunk_end_text"]
exports.random_ripple_voteapp = "ripple_app_text"
exports.random_ripple_repeatrole = "ripple_repeatrole_text"
exports.random_ripple_iamalien = "ripple_iamalien_text"
exports.rippleAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
exports.rippleAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]
exports.rippleNeighborKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]
exports.rippleCenterAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_center_text',
]

exports.robber = "robber_kickoff_text" //may select another player, swap card, view own card - update own actual and known card, selected actual card

exports.roleretriever = "roleretriever_kickoff_text" //may select another player, swap card, view own card - update own actual and known card, selected actual card

exports.seer = "seer_kickoff_text" //may select another player card or 2 center card, show selected card(s) - no update expect if own known

exports.selfawarenessgirl = "selfawarenessgirl_kickoff_text" //doppelganger! show own card - update known and actual card if need

exports.sentinel = "sentinel_kickoff_text" //may place shield on any other player - from this point check known card shield if player wakes up, and disable this player's card from any view or move action

exports.squire = "squire_kickoff_text" //doppelganger! show werewolves cards, may view the selected wolf cards - no update, expect of own known

exports.supervillains = "supervillains_kickoff_text"  //show known supervillains cards - no update

exports.switcheroo = "switcheroo_kickoff_text" //may select 2 another players - update selected actual cards

exports.temptress = "temptress_kickoff_text" //egyszerre többi gonosszal! select villain center card, select any non villain card , swap. - upade selected actual cards

exports.thecount = "thecount_kickoff_text" // select any non-vampire player place mark of fear - update selected player actual info (make sure if its at a player he cant do action from mark-check point)

exports.thing = "thing_kickoff_text" //left or right neigbor player sending message to selected player - no update

exports.troublemaker = "troublemaker_kickoff_text" //may select another 2 player, swap cards, - update selected actual cards

exports.vampires = "vampires_kickoff_text" //show vampire cards, vote for non vampire player who gets mark of vampire - update selected player actual infos

exports.villageidiot = "villageidiot_kickoff_text" //choose direction to move everyone's card - update players actual cards

exports.voodoolou = "voodoolou_kickoff_text" //may choose any center card, swap with any player card - update selected card

exports.werewolves = "werewolves_kickoff_text" //show player wolf cards, may choose any center card, swap with any player card - update selected card
exports.werewolves_dreamwolf = "werewolves_dreamwolf_kickoff_text" //show player wolf cards, dreamwolf thumb, may choose any center card, swap with any player card - update selected card

exports.witch = "witch_kickoff_text" //may choose any center card, swap with any player card - update selected card




exports.easteregg = [
  "easteregg_really_text",

  "easteregg_nobadguys_text_1",
  "easteregg_nobadguys_text_2",
  "easteregg_nobadguys_text_3",
  "easteregg_nobadguys_text_4",
  "easteregg_nobadguys_text_5",
  "easteregg_nobadguys_text_6",
  "easteregg_nobadguys_text_7",
  "easteregg_nobadguys_text_8",
  "easteregg_nobadguys_text_9",
  "easteregg_nobadguys_text_10",

  "easteregg_nogoodguys_text_1",
  "easteregg_nogoodguys_text_2",
  "easteregg_nogoodguys_text_3",
  "easteregg_nogoodguys_text_4",
  "easteregg_nogoodguys_text_5",
  "easteregg_nogoodguys_text_6",
  "easteregg_nogoodguys_text_7",
  "easteregg_nogoodguys_text_8",
  "easteregg_nogoodguys_text_9",
  "easteregg_nogoodguys_text_10"
]
exports.joke = [
  "joke_1_text",
  "joke_2_text",
  "joke_3_text",
  "joke_4_text",
  "joke_5_text",
  "joke_6_text",
  "joke_7_text",
  "joke_8_text",
  "joke_9_text",
  "joke_10_text",
  "joke_11_text",
  "joke_12_text",
  "joke_13_text",
  "joke_14_text",
  "joke_15_text",
  "joke_16_text",
  "joke_17_text",
  "joke_18_text",
  "joke_19_text",
  "joke_20_text",
]
exports.time = [
  "timertext_prefix",
  "timertext_postfix",
  "timerscreen_label_1_text",
  "timerscreen_label_2_text",
  "one_minwar_text",
  "thirty_secwar_text",
]
