import { WEREWOLVES, ALIEN_IDS, VAMPIRE_IDS, SUPER_VILLAIN_IDS } from '../constants'
import { cardsJson } from '../data'
import { logTrace } from '../log'
import { getRandomItemFromArray } from '../utils'
import { random_ripple_dualview, ripple_random, rippleAllKeys, rippleAnyKeys, rippleCenterAnyKeys, rippleNeighborKeys } from './roles'
import { pickRandomUpToThreePlayers, pickRandomOnePlayer, pickRandomTwoPlayers } from './sceneUtils'

export const rippleHandler = (gamestate, room_id) => {
  logTrace(`rippleHandler in room [${room_id}]`)

  gamestate.ripple = {
    force: false,
    ripple_action: '',
    narration: [],
    '1p': [],
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

  narration.push('ripple_intro')

  const getRandomSceneNumber = selectedCards => {
    const result = []
    const filteredArray = selectedCards.filter(card => card !== 50)

    if (filteredArray.length === 0) return result

    const randomIndex = Math.floor(Math.random() * filteredArray.length)
    result.push(filteredArray[randomIndex])

    return result
  }

  const getRandomSceneNumbers = selectedCards => {
    const result = []
    selectedCards.forEach(card => {
      if (card !== 50 && Math.random() < 0.5) {
        result.push(card)
      }
    })
    return result
  }

  const getSceneByCardId = newSelectedCards => {
    return newSelectedCards.map(cardId => {
      const role = cardsJson.find(card => card.id === cardId).role

      if (WEREWOLVES.includes(cardId)) {
        return 'WEREWOLVES'
      } else if (ALIEN_IDS.includes(cardId)) {
        return 'ALIENS'
      } else if (VAMPIRE_IDS.includes(cardId)) {
        return 'VAMPIRES'
      } else if (SUPER_VILLAIN_IDS.includes(cardId)) {
        return 'SUPER_VILLAINS'
      } else {
        return role
      }
    })
  }

  const rippleActions = {
    random_ripple_1minute: () => narration.push('ripple_1minute'),
    random_ripple_repeat: () => {
      const newSelectedCards = getRandomSceneNumbers(selectedCards)
      gamestate.ripple.roles = newSelectedCards
      narration.push('ripple_repeat', 'ripple_repeat_2')
    },
    random_ripple_repeat1p: () => narration.push('ripple_repeat', 'ripple_repeat_2', identifiers.onePlayer, 'ripple_openeyes'),
    random_ripple_insomniac: () => narration.push(identifiers.all, 'ripple_insomniac'),
    random_ripple_nospeak: () => narration.push(identifiers.all, 'ripple_nospeak'),
    random_ripple_faceaway: () => narration.push(identifiers.all, 'ripple_faceaway'),
    random_ripple_troublemaker: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(identifiers.onePlayer, 'ripple_troublemaker', twoPlayers[0], 'conjunction_and', twoPlayers[1], 'ripple_troublemaker_end')
    },
    random_ripple_steal: () => narration.push(identifiers.onePlayer, 'ripple_robber', identifiers.any, 'ripple_robber_end'),
    random_ripple_witch: () => narration.push(identifiers.onePlayer, 'ripple_witch', identifiers.any),
    random_ripple_view1: () => narration.push(identifiers.onePlayer, 'ripple_view1', identifiers.any),
    random_ripple_view2: () => narration.push(identifiers.onePlayer, 'ripple_view2', identifiers.any),
    random_ripple_reveal: () => narration.push(identifiers.onePlayer, 'ripple_revealer', identifiers.neighbor, 'ripple_revealer_end'),
    random_ripple_dualview: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(twoPlayers[0], 'conjunction_and', twoPlayers[1], identifiers.dualView, identifiers.center)
    },
    random_ripple_twovote: () => narration.push(identifiers.all, 'ripple_doublevote'),
    random_ripple_shuffle: () => {
      const twoPlayers = identifiers.twoPlayers
      narration.push(twoPlayers[0], 'conjunction_and', twoPlayers[1], 'ripple_dualshuffle1', twoPlayers[0])
      narration.push(twoPlayers[0], 'ripple_dualshuffle2', twoPlayers[1], 'ripple_dualshuffle3')
    },
    random_ripple_drunk: () => narration.push(identifiers.onePlayer, 'ripple_drunk', identifiers.any, 'ripple_drunk_end'),
    random_ripple_voteapp: () => narration.push('ripple_app'),
    random_ripple_repeatrole: () => {
      const newSelectedCard = getRandomSceneNumber(selectedCards)
      const role = getSceneByCardId(newSelectedCard)
      narration.push(role[0], 'ripple_repeatrole')
      gamestate.ripple.roles = [newSelectedCard]
    },
    random_ripple_iamalien: () => narration.push(identifiers.all, 'ripple_iamalien')
  }

  if (rippleActions[randomRipple]) {
    rippleActions[randomRipple]()
  }

  gamestate.ripple.narration = narration

  return gamestate
}
