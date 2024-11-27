const { getRandomItemFromArray, pickRandomUpToThreePlayers } = require('./sceneUtils')
const { getRandomSceneNumber } = require('./sceneUtils/getRandomSceneNumber')
const { getRandomSceneNumbers } = require('./sceneUtils/getRandomSceneNumbers')
const { getSceneByCardId } = require('./sceneUtils/getSceneByCardId')
const { pickRandomOnePlayer } = require('./sceneUtils/pickRandomOnePlayer')
const { pickRandomTwoPlayers } = require('./sceneUtils/pickRandomTwoPlayers')
const { pickRandomTwoPlayersArray } = require('./sceneUtils/pickRandomTwoPlayersArray')
const { ripple_sure_repeat, ripple_random, rippleAllKeys, rippleAnyKeys, rippleNeighborKeys, rippleCenterAnyKeys, random_ripple_dualview } = require('./roles/ripple/ripple.constants')

export const rippleHandler = gamestate => {
  const result = []
  const isOracleRipple = gamestate.ripple.force
  const totalPlayers = gamestate.total_players
  const selectedCards = gamestate.selected_cards

  const randomRipple = isOracleRipple ? getRandomItemFromArray(ripple_sure_repeat) : getRandomItemFromArray(ripple_random)

  const identifiers = {
    all: getRandomItemFromArray(rippleAllKeys) === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and') : [getRandomItemFromArray(rippleAllKeys)],
    any: getRandomItemFromArray(rippleAnyKeys) === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_or') : [getRandomItemFromArray(rippleAnyKeys)],
    onePlayer: pickRandomOnePlayer(totalPlayers),
    twoPlayers: pickRandomTwoPlayers(totalPlayers),
    neighbor: getRandomItemFromArray(rippleNeighborKeys),
    center: getRandomItemFromArray(rippleCenterAnyKeys),
    dualView: getRandomItemFromArray(random_ripple_dualview)
  }

  const updateGamestateRipple = (narration, roles = []) => {
    gamestate.ripple = {
      force: isOracleRipple,
      narration,
      '1p': [],
      '2p': [],
      all_identifier: identifiers.all,
      any_identifier: identifiers.any,
      neighbor_identifier: identifiers.neighbor,
      center_identifier: identifiers.center,
      dual_view: identifiers.dualView,
      roles
    }
  }

  if (randomRipple === 'random_ripple_none') {
    return gamestate
  }

  result.push('ripple_intro_text')

  const rippleActions = {
    random_ripple_1minute: () => result.push('ripple_1minute_text'),
    random_ripple_repeat: () => {
      const newSelectedCards = getRandomSceneNumbers(selectedCards)
      updateGamestateRipple(result, newSelectedCards)
      result.push('ripple_repeat_text', 'ripple_repeat_2_text')
    },
    random_ripple_repeat1p: () => result.push('ripple_repeat_text', 'ripple_repeat_2_text', identifiers.onePlayer, 'ripple_openeyes_text'),
    random_ripple_insomniac: () => result.push(identifiers.all, 'ripple_insomniac_text'),
    random_ripple_nospeak: () => result.push(identifiers.all, 'ripple_nospeak_text'),
    random_ripple_faceaway: () => result.push(identifiers.all, 'ripple_faceaway_text'),
    random_ripple_troublemaker: () => result.push(identifiers.onePlayer, 'ripple_troublemaker_text', identifiers.twoPlayers, 'ripple_troublemaker_end_text'),
    random_ripple_steal: () => result.push(identifiers.onePlayer, 'ripple_robber_text', identifiers.any, 'ripple_robber_end_text'),
    random_ripple_witch: () => result.push(identifiers.onePlayer, 'ripple_witch_text', identifiers.any),
    random_ripple_view1: () => result.push(identifiers.onePlayer, 'ripple_view1_text', identifiers.any),
    random_ripple_view2: () => result.push(identifiers.onePlayer, 'ripple_view2_text', identifiers.any),
    random_ripple_reveal: () => result.push(identifiers.onePlayer, 'ripple_revealer_text', identifiers.neighbor, 'ripple_revealer_end_text'),
    random_ripple_dualview: () => result.push(identifiers.twoPlayers, identifiers.dualView, identifiers.center),
    random_ripple_twovote: () => result.push(identifiers.all, 'ripple_doublevote_text'),
    random_ripple_shuffle: () => {
      const [player1, player2] = pickRandomTwoPlayersArray(identifiers.twoPlayers)
      result.push(player1, 'conjunction_and', player2, 'ripple_doublevote_text', player1)
      result.push(player1, 'ripple_dualshuffle2_text', player2, 'ripple_dualshuffle3_text')
    },
    random_ripple_drunk: () => result.push(identifiers.onePlayer, 'ripple_drunk_text', identifiers.any, 'ripple_drunk_end_text'),
    random_ripple_voteapp: () => result.push('ripple_app_text'),
    random_ripple_repeatrole: () => {
      const newSelectedCard = getRandomSceneNumber(selectedCards)
      const role = getSceneByCardId(newSelectedCard)
      updateGamestateRipple(result, [newSelectedCard])
      result.push(role[0], 'ripple_repeatrole_text')
    },
    random_ripple_iamalien: () => result.push(identifiers.all, 'ripple_iamalien_text')
  }

  if (rippleActions[randomRipple]) {
    rippleActions[randomRipple]()
  }

  gamestate.ripple.narration = result
  return gamestate
}
