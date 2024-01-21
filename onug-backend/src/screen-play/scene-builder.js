const { SIMPLE } = require("../constant/actionTimeType")
const { logTrace } = require("../log")
const { buildSceneForCardId, includesAny, includesAll, masonsInPlay, werewolvesInPlay } = require("../utils")

const generateScenes = (selected_cards) => {
  logTrace(`generate scenes for selected cards: [${selected_cards}]`)
  const sceneWithActionTimes = []

  sceneWithActionTimes.push({
    scene: "The night starts...",
    actionTimeType: SIMPLE,
    scene_name: 'night_starts',
  })

  if (selected_cards.includes(1))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [1],      scene_name: 'doppleganger'}))
  //TODO check wolf ids
  if (includesAll(selected_cards, [1, 7]))   sceneWithActionTimes.push(buildSceneForCardId({card_ids: [1],      scene_name: 'doppleganger+minion', sceneTextKey: 'doppelganger_minion_text'}))
  if (werewolvesInPlay(selected_cards))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [15, 16], scene_name: 'werewolf'}))
  // TODO check wolf ids
  if (selected_cards.includes(7))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [7],      scene_name: 'minion'}))
  if (masonsInPlay(selected_cards))                        sceneWithActionTimes.push(buildSceneForCardId({card_ids: [5, 6],   scene_name: 'mason'}))
  if (selected_cards.includes(9))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [9],      scene_name: 'seer'}))
  if (selected_cards.includes(8))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [8],      scene_name: 'robber'}))
  if (selected_cards.includes(11))                   sceneWithActionTimes.push(buildSceneForCardId({card_ids: [11],     scene_name: 'troublemaker'}))
  if (selected_cards.includes(2))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [2],      scene_name: 'drunk'}))
  if (selected_cards.includes(4))                    sceneWithActionTimes.push(buildSceneForCardId({card_ids: [4],      scene_name: 'insomniac'}))

  sceneWithActionTimes.push({
    scene: "Time is up. Everyone, 3, 2, 1... VOTE!",
    actionTimeType: SIMPLE,
    scene_name: 'vote',
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
