import { logTrace } from '../log'
import { getRandomItemFromArray } from '../utils'
import { random_ripple_dualview, ripple_random, rippleAllKeys, rippleAnyKeys, rippleCenterAnyKeys, rippleNeighborKeys } from './roles'
import { pickRandomUpToThreePlayers, pickRandomOnePlayer, pickRandomTwoPlayers, getRandomSceneNumbers, getRandomSceneNumber, getSceneByCardId } from './sceneUtils'

export const rippleHandler = (gamestate, room_id) => {
  logTrace(`rippleHandler in room [${room_id}]`)

  gamestate.ripple = {
    force: false,
    ripple_action: '',
    narration: [],
    '1p': '',
    '2p': [],
    all_identifier: [],
    any_identifier: [],
    neighbor_identifier: [],
    center_identifier: [],
    dual_view: [],
    roles: []
  }

  const totalPlayers = gamestate.total_players
  const selectedCards = gamestate.selected_cards
  const narration = []
  const randomRipple = getRandomItemFromArray(ripple_random)

  if (randomRipple === 'random_ripple_none') {
    return gamestate
  } else {
    gamestate.ripple.force = true
    gamestate.ripple.ripple_action = randomRipple
  }

  const identifiers = {
    all: getRandomItemFromArray(rippleAllKeys) === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and') : [getRandomItemFromArray(rippleAllKeys)],
    any: getRandomItemFromArray(rippleAnyKeys) === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_or') : [getRandomItemFromArray(rippleAnyKeys)],
    onePlayer: pickRandomOnePlayer(totalPlayers),
    twoPlayers: pickRandomTwoPlayers(totalPlayers),
    neighbor: getRandomItemFromArray(rippleNeighborKeys),
    center: getRandomItemFromArray(rippleCenterAnyKeys),
    dualView: getRandomItemFromArray(random_ripple_dualview)
  }

  gamestate.ripple = {
    ...gamestate.ripple,
    narration: [],
    '1p': identifiers.onePlayer,
    '2p': identifiers.twoPlayers,
    all_identifier: identifiers.all,
    any_identifier: identifiers.any,
    neighbor_identifier: identifiers.neighbor,
    center_identifier: identifiers.center,
    dual_view: identifiers.dualView,
    roles: []
  }

  narration.push('ripple_intro_text')

  const rippleActions = {
    random_ripple_1minute: () => narration.push('ripple_1minute_text'),
    random_ripple_repeat: () => {
      const newSelectedCards = getRandomSceneNumbers(selectedCards)
      gamestate.ripple.roles = newSelectedCards
      narration.push('ripple_repeat_text', 'ripple_repeat_2_text')
    },
    random_ripple_repeat1p: () => narration.push('ripple_repeat_text', 'ripple_repeat_2_text', identifiers.onePlayer, 'ripple_openeyes_text'),
    random_ripple_insomniac: () => narration.push(identifiers.all, 'ripple_insomniac_text'),
    random_ripple_nospeak: () => narration.push(identifiers.all, 'ripple_nospeak_text'),
    random_ripple_faceaway: () => narration.push(identifiers.all, 'ripple_faceaway_text'),
    random_ripple_troublemaker: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(identifiers.onePlayer, 'ripple_troublemaker_text', twoPlayers[0], 'conjunction_and', twoPlayers[1], 'ripple_troublemaker_end_text')
    },
    random_ripple_steal: () => narration.push(identifiers.onePlayer, 'ripple_robber_text', identifiers.any, 'ripple_robber_end_text'),
    random_ripple_witch: () => narration.push(identifiers.onePlayer, 'ripple_witch_text', identifiers.any),
    random_ripple_view1: () => narration.push(identifiers.onePlayer, 'ripple_view1_text', identifiers.any),
    random_ripple_view2: () => narration.push(identifiers.onePlayer, 'ripple_view2_text', identifiers.any),
    random_ripple_reveal: () => narration.push(identifiers.onePlayer, 'ripple_revealer_text', identifiers.neighbor, 'ripple_revealer_end_text'),
    random_ripple_dualview: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(twoPlayers[0], 'conjunction_and', twoPlayers[1], identifiers.dualView, identifiers.center)
    },
    random_ripple_twovote: () => narration.push(identifiers.all, 'ripple_doublevote_text'),
    random_ripple_shuffle: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(twoPlayers[0], 'conjunction_and', twoPlayers[1], 'ripple_dualshuffle1_text', twoPlayers[0])
      narration.push(twoPlayers[0], 'ripple_dualshuffle2_text', twoPlayers[1], 'ripple_dualshuffle3_text')
    },
    random_ripple_drunk: () => narration.push(identifiers.onePlayer, 'ripple_drunk_text', identifiers.any, 'ripple_drunk_end_text'),
    random_ripple_voteapp: () => narration.push('ripple_app_text'),
    random_ripple_repeatrole: () => {
      const newSelectedCard = getRandomSceneNumber(selectedCards)
      const role = getSceneByCardId(newSelectedCard)
      narration.push(role[0], 'ripple_repeatrole_text')
      gamestate.ripple.roles = [newSelectedCard]
    },
    random_ripple_iamalien: () => narration.push(identifiers.all, 'ripple_iamalien_text')
  }

  if (rippleActions[randomRipple]) {
    rippleActions[randomRipple]()
  }

  gamestate.ripple.narration = narration

  return gamestate
}
