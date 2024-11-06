import {
  getRandomItemFromArray,
  pickRandomUpToThreePlayers,
} from '../../sceneUtils'
import {
  random_ripple_dualview,
  ripple_random,
  ripple_sure_repeat,
  rippleAllKeys,
  rippleAnyKeys,
  rippleCenterAnyKeys,
  rippleNeighborKeys,
} from './ripple.constants'
import {
  pickRandomOnePlayer,
  pickRandomTwoPlayers,
  pickRandomTwoPlayersArray,
} from './ripple.utils'

export const ripple = (oracleMadeSureRipple, totalPlayers) => {
  const result = []

  const randomRipple = oracleMadeSureRipple
    ? getRandomItemFromArray(ripple_sure_repeat)
    : getRandomItemFromArray(ripple_random)

  const randomRippleAllKey = getRandomItemFromArray(rippleAllKeys)
  const randomRippleAnyKey = getRandomItemFromArray(rippleAnyKeys)

  const random1PlayerIdentifier = pickRandomOnePlayer(totalPlayers)
  const random2PlayersIdentifier = pickRandomTwoPlayers(totalPlayers)
  const randomRippleAllIdentifier =
    randomRippleAllKey === 'activePlayers'
      ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
      : randomRippleAllKey
  const randomRippleAnyIdentifier =
    randomRippleAnyKey === 'activePlayers'
      ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_or')
      : randomRippleAnyKey
  const randomRippleNeighborIdentifier =
    getRandomItemFromArray(rippleNeighborKeys)
  const randomRippleCenterAnyIdentifier =
    getRandomItemFromArray(rippleCenterAnyKeys)

  const randomDualview = getRandomItemFromArray(random_ripple_dualview)
  const randomShuffle2Players = pickRandomTwoPlayersArray(
    random2PlayersIdentifier
  )

  if (randomRipple === 'random_ripple_none') {
    //TODO in this case jump to the next scene?
    return result
  } else {
    result.push('ripple_intro_text')

    switch (randomRipple) {
      case 'random_ripple_1minute':
        result.push('ripple_1minute_text')
        break

      case 'random_ripple_repeat':
        result.push('ripple_repeat_text', 'ripple_repeat_2_text')

        break

      case 'random_ripple_repeat1p':
        result.push(
          'ripple_repeat_text',
          'ripple_repeat_2_text',
          random1PlayerIdentifier,
          'ripple_openeyes_text'
        )

        break

      case 'random_ripple_insomniac':
        result.push(randomRippleAllIdentifier, 'ripple_insomniac_text')

        break

      case 'random_ripple_nospeak':
        result.push(randomRippleAllIdentifier, 'ripple_nospeak_text')

        break

      case 'random_ripple_faceaway':
        result.push(randomRippleAllIdentifier, 'ripple_faceaway_text')

        break

      case 'random_ripple_troublemaker':
        result.push(
          random1PlayerIdentifier,
          'ripple_troublemaker_text',
          random2PlayersIdentifier,
          'ripple_troublemaker_end_text'
        )

        break

      case 'random_ripple_steal':
        result.push(
          random1PlayerIdentifier,
          'ripple_robber_text',
          randomRippleAnyIdentifier,
          'ripple_robber_end_text'
        )

        break

      case 'random_ripple_witch':
        result.push(
          random1PlayerIdentifier,
          'ripple_witch_text',
          randomRippleAnyIdentifier
        )

        break

      case 'random_ripple_view1':
        result.push(
          random1PlayerIdentifier,
          'ripple_view1_text',
          randomRippleAnyIdentifier
        )

        break

      case 'random_ripple_view2':
        result.push(
          random1PlayerIdentifier,
          'ripple_view2_text',
          randomRippleAnyIdentifier
        )

        break

      case 'random_ripple_reveal':
        result.push(
          random1PlayerIdentifier,
          'ripple_revealer_text',
          randomRippleNeighborIdentifier,
          'ripple_revealer_end_text'
        )

        break

      case 'random_ripple_dualview':
        result.push(
          random2PlayersIdentifier,
          randomDualview,
          randomRippleCenterAnyIdentifier
        )

        break

      case 'random_ripple_twovote':
        result.push(randomRippleAllIdentifier, 'ripple_doublevote_text')

        break

      case 'random_ripple_shuffle': //TODO just we shuffle in backend
        result.push(
          randomShuffle2Players[0],
          'conjunction_and',
          randomShuffle2Players[1],
          'ripple_doublevote_text',
          randomShuffle2Players[0]
        )
        result.push(
          randomShuffle2Players[0],
          'ripple_dualshuffle2_text',
          randomShuffle2Players[1],
          'ripple_dualshuffle3_text'
        )

        break

      case 'random_ripple_drunk':
        result.push(
          random1PlayerIdentifier,
          'ripple_drunk_text',
          randomRippleAnyIdentifier,
          'ripple_drunk_end_text'
        )

        break

      case 'random_ripple_voteapp':
        result.push('ripple_app_text')

        break

      case 'random_ripple_repeatrole': //TODO night actions roles
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
        result.push(roleText, 'ripple_repeatrole_text') */

        result.push('ripple_repeatrole_text')

        break

      case 'random_ripple_iamalien':
        result.push(randomRippleAllIdentifier, 'ripple_iamalien_text')

        break

      default:
        break
    }
  }

  return result
}

/* 
const ripple_random = [
  'random_ripple_1minute', //vote time only 1 minute - //!timer for vote set to 60 sec
  'random_ripple_repeat', //repeat the night with random roles - //!random night actions in order will repeat
  'random_ripple_repeat1p', //repeat the night actions 1 person open eyes - //!random night actions in order will repeat -
  'random_ripple_insomniac', //selected players may check own cards - //!player can check
  'random_ripple_nospeak', //selected players may be silent until after the vote - //! no action needed, 
  'random_ripple_faceaway', //selected players must turn away from table - //!
  'random_ripple_troublemaker', //selected player may swap cards between given players - //!player can select
  'random_ripple_steal', //selected player may steal card from given options - //!player can select
  'random_ripple_witch', //may view center card, the must to give to give options - //!player can select
  'random_ripple_view1', //may view 1 card from give options - //!player can select
  'random_ripple_view2', //may view 2 cards  from give options - //!player can select
  'random_ripple_reveal', //may flip card from given positions - //!player can select
  'random_ripple_dualview', //may view secretly or together (random) a card from given options - //!if together need vote?
  'random_ripple_twovote', //2 vote can be place at end - //!allow to vote 2x - same placed vote?
  'random_ripple_shuffle', //2 players get random shuffle and gets new card - //!only narration. look new card?
  'random_ripple_drunk', //player must to exchange hes card with given - //!no action needed we change it on backend
  'random_ripple_voteapp', //players suggested to may vote to app, so every1 will survive - //! extra vote button
  'random_ripple_repeatrole', //random roles will called again - //! all player who has original id
  'random_ripple_iamalien', //player can only repeat im alien - //! 
]

export const ripple = (gamestate, title) => [] //TODO

const repeatrole = [
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
