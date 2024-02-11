const actions = require("../constant/actions")
const { logTrace } = require("../log")
const { getCardById } = require("./card")

exports.buildSceneForCardId = ({ card_ids, scene_title, sceneTextKey }) => {
  const roleName = getCardById(card_ids[0]).display_name.toLowerCase()
  const sceneDynamically = sceneTextKey || `${roleName}_wake_text` // TODO not just wake texts
  const scene = actions[roleName][sceneDynamically]
  logTrace(`building scene for card id.
    card_id: [${card_ids}],
    scene_title: [${scene_title}]
    roleName: [${roleName}]
    sceneDynamically: [${sceneDynamically}]
    scene: [${scene}]`)

  return {
    scene,
    scene_title: scene_title,
    scene_card_ids: card_ids,
  }
}
