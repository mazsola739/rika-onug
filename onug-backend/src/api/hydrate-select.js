const { repository } = require('../repository')
const { logTrace } = require('../log')

const { readGameState } = repository

exports.hydrateSelect = async (req, res) => {
  const { body } = req
  logTrace(`Hydrate-select endpoint triggered with request body: ${JSON.stringify(body)}`)

  let { room_id } = body

  const gameState = await readGameState(room_id)

  return res.send({
    gameState
  })
}
