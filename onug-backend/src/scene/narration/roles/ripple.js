const { getRandomItemFromArray, pickRandomTwoPlayersArray, pickRandomTwoPlayers, pickRandomUpToThreePlayers, pickRandomOnePlayer } = require("../utils");

const ripple_sure_repeat = ["random_ripple_repeat", "random_ripple_repeat1p"];
const ripple_random = [
  "random_ripple_none",
  "random_ripple_1minute",
  "random_ripple_repeat",
  "random_ripple_repeat1p",
  "random_ripple_insomniac",
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
];
const random_ripple_dualview = ["ripple_dualseer_text", "ripple_view2_text"];

const rippleAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "activePlayers",
];
const rippleAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
  "activePlayers",
];
const rippleNeighborKeys = [
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_oneneighbor_text",
  "identifier_yourself_text",
];
const rippleCenterAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_center_text",
];

exports.ripple = (oracleMadeSureRipple, totalPlayers) => {
  const result = [];

  const randomRipple = oracleMadeSureRipple ? getRandomItemFromArray(ripple_sure_repeat) : getRandomItemFromArray(ripple_random);

  const randomRippleAllKey = getRandomItemFromArray(rippleAllKeys);
  const randomRippleAnyKey = getRandomItemFromArray(rippleAnyKeys);

  const random1PlayerIdentifier = pickRandomOnePlayer(totalPlayers);
  const random2PlayersIdentifier = pickRandomTwoPlayers(totalPlayers);
  const randomRippleAllIdentifier = randomRippleAllKey === "activePlayers" ? pickRandomUpToThreePlayers(totalPlayers, "conjunction_and") : randomRippleAllKey
  const randomRippleAnyIdentifier = randomRippleAnyKey === "activePlayers" ? pickRandomUpToThreePlayers(totalPlayers, "conjunction_or") : randomRippleAnyKey
  const randomRippleNeighborIdentifier = getRandomItemFromArray(rippleNeighborKeys);
  const randomRippleCenterAnyIdentifier = getRandomItemFromArray(rippleCenterAnyKeys);

  const randomDualview = getRandomItemFromArray(random_ripple_dualview)
  const randomShuffle2Players = pickRandomTwoPlayersArray(random2PlayersIdentifier)

  if (randomRipple === "random_ripple_none") { //TODO in this case jump to the next scene?
    return result;
  } else {
    result.push("ripple_intro_text");

    switch (randomRipple) {
      case "random_ripple_1minute":
        result.push("ripple_1minute_text");
        break;

      case "random_ripple_repeat":
        result.push("ripple_repeat_text", "ripple_repeat_2_text");

        break;

      case "random_ripple_repeat1p":
        result.push("ripple_repeat_text", "ripple_repeat_2_text", random1PlayerIdentifier, "ripple_openeyes_text")

        break;

      case "random_ripple_insomniac":
        result.push(randomRippleAllIdentifier, "ripple_insomniac_text");

        break;

      case "random_ripple_nospeak":
        result.push(randomRippleAllIdentifier, "ripple_nospeak_text");

        break;

      case "random_ripple_faceaway":
        result.push(randomRippleAllIdentifier, "ripple_faceaway_text");

        break;

      case "random_ripple_troublemaker":
        result.push(random1PlayerIdentifier, "ripple_troublemaker_text", random2PlayersIdentifier, "ripple_troublemaker_end_text");

        break;

      case "random_ripple_steal":
        result.push(random1PlayerIdentifier, "ripple_robber_text", randomRippleAnyIdentifier, "ripple_robber_end_text");

        break;

      case "random_ripple_witch":
        result.push(random1PlayerIdentifier, "ripple_witch_text", randomRippleAnyIdentifier);

        break;

      case "random_ripple_view1":
        result.push(random1PlayerIdentifier, "ripple_view1_text", randomRippleAnyIdentifier);

        break;

      case "random_ripple_view2":
        result.push(random1PlayerIdentifier, "ripple_view2_text", randomRippleAnyIdentifier);

        break;

      case "random_ripple_reveal":
        result.push(random1PlayerIdentifier, "ripple_revealer_text", randomRippleNeighborIdentifier, "ripple_revealer_end_text");

        break;

      case "random_ripple_dualview":
        result.push(random2PlayersIdentifier, randomDualview, randomRippleCenterAnyIdentifier);

        break;

      case "random_ripple_twovote":

        result.push(randomRippleAllIdentifier, "ripple_doublevote_text");

        break;

      case "random_ripple_shuffle":  //TODO just narration, we shuffle in backend
        result.push(randomShuffle2Players[0], "conjunction_and", randomShuffle2Players[1], "ripple_doublevote_text", randomShuffle2Players[0]);
        result.push(randomShuffle2Players[0], "ripple_dualshuffle2_text", randomShuffle2Players[1], "ripple_dualshuffle3_text");

        break;

      case "random_ripple_drunk":
        result.push(random1PlayerIdentifier, "ripple_drunk_text", randomRippleAnyIdentifier, "ripple_drunk_end_text");

        break;

      case "random_ripple_voteapp":
        result.push("ripple_app_text");

        break;

      case "random_ripple_repeatrole": //TODO night actions roles
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

        const roleText = getRandomRoleDisplayName(repeatrole)
        result.push(roleText, "ripple_repeatrole_text"); */

        result.push("ripple_repeatrole_text");

        break;

      case "random_ripple_iamalien":
        result.push(randomRippleAllIdentifier, "ripple_iamalien_text");

        break;

      default:
        break;
    }
  }

  return result;
};




