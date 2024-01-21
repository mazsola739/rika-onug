const { SIMPLE, DOUBLE } = require("../constant/actionTimeType")
const {
  doppelganger,
  werewolves,
  minion,
  masons,
  seer,
  robber,
  troublemaker,
  drunk,
  insomniac,
} = require("../constant/actions")
const { logTrace } = require("../log")

const generateScenes = (selected_cards) => {
  logTrace(`generate scenes for selected cards: [${selected_cards}]`)
  sceneWithActionTimes = []
  cardIdToPlayerToken = {}
  
  if (selected_cards.includes(1)) {
    // doppleganger
    sceneWithActionTimes.push({
      scene: doppelganger.doppelganger_wake_text,
      actionTimeType: DOUBLE,
    })
  }
  if (selected_cards.includes(1) && selected_cards.includes(7)) {
    // doppleganger + minion
    sceneWithActionTimes.push({
      scene: doppelganger.doppelganger_minion_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(15) || selected_cards.includes(16)) {
    // at least one werevolf is in selected cards
    sceneWithActionTimes.push({
      scene: werewolves.werewolves_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(7)) {
    // minion
    sceneWithActionTimes.push({
      scene: minion.minion_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (
    (selected_cards.includes(5) && selected_cards.includes(6)) ||
    ((selected_cards.includes(5) || selected_cards.includes(6)) &&
      selected_cards.includes(1))
  ) {
    // two mason (possible, with doppleganger)
    sceneWithActionTimes.push({
      scene: masons.mason_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(9)) {
    // seer
    sceneWithActionTimes.push({
      scene: seer.seer_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(8)) {
    // robber
    sceneWithActionTimes.push({
      scene: robber.robber_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(11)) {
    // troublemaker
    sceneWithActionTimes.push({
      scene: troublemaker.troublemaker_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(2)) {
    // drunk
    sceneWithActionTimes.push({
      scene: drunk.drunk_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  if (selected_cards.includes(4)) {
    // insomniac
    sceneWithActionTimes.push({
      scene: insomniac.insomniac_wake_text,
      actionTimeType: SIMPLE,
    })
  }
  sceneWithActionTimes.push({
    scene: "Time is up. Everyone, 3, 2, 1... VOTE!",
    actionTimeType: SIMPLE,
  })

  logTrace(`sceneWithActionTimes: [${JSON.stringify(sceneWithActionTimes)}]`)
  return sceneWithActionTimes
}

exports.sceneBuilder = (gameState) => {
    logTrace(`insomniac: [${JSON.stringify(insomniac)}]`)
    logTrace(`doppelganger: [${JSON.stringify(doppelganger)}]`)
    logTrace(`werewolves: [${JSON.stringify(werewolves)}]`)
  const scenes = generateScenes(gameState.selected_cards)
  
  // TODO move out to interactionSceneBuilder
  Object.entries(gameState.players).forEach(([token, player]) => {
    cardIdToPlayerToken[player.card_id] = token
  })

  gameState.scenes = scenes
  return gameState
}
