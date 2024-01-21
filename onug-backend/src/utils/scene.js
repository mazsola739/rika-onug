const actions = require("../constant/actions")
const { SIMPLE } = require("../constant/actionTimeType")
const { logTrace } = require("../log")
const { getCardById } = require("./card")

exports.buildSceneForCardId = (card_id, options = {}) =>{
    const { sceneTextKey } = options
    const roleName = getCardById(card_id).display_name.toLowerCase()
    const sceneDynamically = sceneTextKey || `${roleName}_wake_text` // TODO not just wake texts
    const scene = actions[roleName][sceneDynamically]
    logTrace(`building scene for cardid.
    card_id: [${card_id}],
    options: [${JSON.stringify(options, null, 4)}]
    roleName: [${roleName}]
    sceneDynamically: [${sceneDynamically}]
    scene: [${scene}]`)

    return {
      scene,
      actionTimeType: SIMPLE,
    }
  }