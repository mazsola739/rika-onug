const ripple_random = [
  "random_ripple_1minute", //vote time only 1 minute - //!timer for vote set to 60 sec
  "random_ripple_repeat", //repeat the night with random roles - //!random night actions in order will repeat
  "random_ripple_repeat1p", //repeat the night actions 1 person open eyes - //!random night actions in order will repeat - eye icon
  "random_ripple_insomniac", //selected players may check own cards - //!player can check
  "random_ripple_nospeak", //selected players may be silent until after the vote - //! no action needed, mute icon
  "random_ripple_faceaway", //selected players must turn away from table - //! blind icon
  "random_ripple_troublemaker", //selected player may swap cards between given players - //!player can select
  "random_ripple_steal", //selected player may steal card from given options - //!player can select
  "random_ripple_witch", //may view center card, the must to give to give options - //!player can select
  "random_ripple_view1", //may view 1 card from give options - //!player can select
  "random_ripple_view2", //may view 2 cards  from give options - //!player can select
  "random_ripple_reveal", //may flip card from given positions - //!player can select
  "random_ripple_dualview", //may view secretly or together (random) a card from given options - //!if together need vote?
  "random_ripple_twovote", //2 vote can be place at end - //!allow to vote 2x - same placed vote?
  "random_ripple_shuffle", //2 players get random shuffle and gets new card - //!only narration. look new card?
  "random_ripple_drunk", //player must to exchange hes card with given - //!no action needed we change it on backend
  "random_ripple_voteapp", //players suggested to may vote to app, so every1 will survive - //! extra vote button
  "random_ripple_repeatrole", //random roles will called again - //! all player who has original id
  "random_ripple_iamalien", //player can only repeat im alien - //! UFO icon
]

export const ripple_narration = () => []; //TODO

/* const repeatrole = [
{ name: 'role_aliens', isExist: areAnyCardSelectedById(deck, [42, 43, 47, 53, 54, 74]), specialCondition: () => !alienStore.isNewAlienOrHelper },
{ name: 'role_alphawolf', isExist: isCardSelectedById(this.deck, 17) },
{ name: 'role_apprenticeseer', isExist: isCardSelectedById(this.deck, 18) },
{ name: 'body_snatcher', isExist: isCardSelectedById(this.deck, 74) },
{ name: 'role_diseased', isExist: isCardSelectedById(this.deck, 7) },
{ name: 'role_drunk', isExist: isCardSelectedById(this.deck, 2) },
{ name: 'role_exposer', isExist: isCardSelectedById(this.deck, 46) },
{ name: 'role_gremlin', isExist: isCardSelectedById(this.deck, 33) },
{ name: 'role_insomniac', isExist: isCardSelectedById(this.deck, 4) },
{ name: 'role_marksman', isExist: isCardSelectedById(this.deck, 35) },
{ name: 'role_masons', isExist: areAllCardsSelectedById(this.deck, [5, 6]) },
{ name: 'role_mysticwolf' isExist: isCardSelectedById(this.deck, 22) },
{ name: 'role_nostradamus', isExist: isCardSelectedById(this.deck, 80) },
{ name: 'role_paranormalinvestigator', isExist: isCardSelectedById(this.deck, 23) },
{ name: 'role_pickpocket', isExist: isCardSelectedById(this.deck, 36) },
{ name: 'role_psychic', isExist: isCardSelectedById(this.deck, 51) },
{ name: 'role_revealer', isExist: isCardSelectedById(this.deck, 24) },
{ name: 'role_robber', isExist: isCardSelectedById(this.deck, 8) },
{ name: 'role_rascal', isExist: isCardSelectedById(this.deck, 52) },
{ name: 'role_seer', isExist: isCardSelectedById(this.deck, 9) },
{ name: 'role_thing', isExist: isCardSelectedById(this.deck, 85) },
{ name: 'role_troublemaker', isExist: isCardSelectedById(this.deck, 11) },
{ name: 'role_villageidiot', isExist: isCardSelectedById(this.deck, 26) },
{ name: 'role_werewolves', isExist: areAnyCardSelectedById(this.deck, [15, 16, 17, 22, 21]) },
{ name: 'role_witch', isExist: isCardSelectedById(this.deck, 27) },
]

const roleText = getRandomRoleDisplayName(repeatrole) */
