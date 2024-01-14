const { validateRoom } = require('../validator')
const { repository } = require('../repository')
const { determineTotalPlayers, selectCard, deselectCard } = require('../utils')
const { logTrace, logInfo, logDebug } = require('../log')

const { upsertRoomState } = repository

exports.updateSelect = async (req, res) => {
  logTrace(`update-select endpoint triggered with request body: ${JSON.stringify(req.body)}`)
  logInfo(`UPDATE-SELECT TOKEN cookie: ${JSON.stringify(req.cookies.token)}`)

  logDebug(`update-select endpoint triggered with request body: ${JSON.stringify(req.body)}`)

  const { body } = req
  const { room_id, update } = body
  const { action, card_id } = update

  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return res.send(errors)

  const totalPlayers = determineTotalPlayers(
    gameState.selected_cards.length,
    gameState.selected_cards
  )

  if (totalPlayers > 12) {
    return res.send({
      message: 'Cannot have more than 12 players.',
    })
  }

  const newGameState = { ...gameState }

  if (action === 'CARD_SELECT') {
    newGameState.selected_cards = selectCard(
      newGameState.selected_cards,
      card_id
    )
  } else if (action === 'CARD_DESELECT') {
    newGameState.selected_cards = deselectCard(
      newGameState.selected_cards,
      card_id
    )
  } 

  upsertRoomState(newGameState)

  return res.send({
    success: true,
    message: `Successfully updated`,
  })
}
