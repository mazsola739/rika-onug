const { SIMPLE } = require("../constant/actionTimeType")
const { logTrace } = require("../log")
const { buildSceneForCardId, includesAny, includesAll, masonsInPlay } = require("../utils")

const generateScenes = (selected_cards) => {
  logTrace(`generate scenes for selected cards: [${selected_cards}]`)
  sceneWithActionTimes = []
  cardIdToPlayerToken = {}
  
  // doppleganger
  if (selected_cards.includes(1))                    sceneWithActionTimes.push(buildSceneForCardId(1))
  // doppleganger + minion 
  //TODO check wolf ids
  if (includesAll(selected_cards, [1, 7]))           sceneWithActionTimes.push(buildSceneForCardId(1, {sceneTextKey: 'doppelganger_minion_text'}))
  // at least one werevolf is in selected cards
  if (includesAny(selected_cards, [15, 16]))         sceneWithActionTimes.push(buildSceneForCardId(15))
  // minion
  // TODO check wolf ids
  if (selected_cards.includes(7))                    sceneWithActionTimes.push(buildSceneForCardId(7))
  // two mason (possible, with doppleganger)
  if (masonsInPlay(selected_cards))                  sceneWithActionTimes.push(buildSceneForCardId(5))
  // seer
  if (selected_cards.includes(9))                    sceneWithActionTimes.push(buildSceneForCardId(9))
  // robber
  if (selected_cards.includes(8))                    sceneWithActionTimes.push(buildSceneForCardId(8))
  // troublemaker
  if (selected_cards.includes(11))                   sceneWithActionTimes.push(buildSceneForCardId(11))
  // drunk
  if (selected_cards.includes(2))                    sceneWithActionTimes.push(buildSceneForCardId(2))
  // insomniac
  if (selected_cards.includes(4))                    sceneWithActionTimes.push(buildSceneForCardId(4))

  sceneWithActionTimes.push({
    scene: "Time is up. Everyone, 3, 2, 1... VOTE!",
    actionTimeType: SIMPLE,
  })

  logTrace(`sceneWithActionTimes: [${JSON.stringify(sceneWithActionTimes)}]`)
  return sceneWithActionTimes
}

exports.sceneBuilder = (gameState) => {
  const scenes = generateScenes(gameState.selected_cards)
  logTrace(`generated scenes: ${JSON.stringify(scenes, null, 4)}`)

  gameState.scenes = scenes
  return gameState
}
