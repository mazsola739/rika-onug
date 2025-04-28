import { HYDRATE_GUESS } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { upsertRoomState } from '../../repository'
import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const hydrateGuess = async (ws, message) => {
  logTrace(`hydrate-guess requested with ${JSON.stringify(message)}`)
  const { room_id, guess } = message
  try {

    const { position, id } = guess || {}

    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
    if (!roomIdValid) {
      return ws.send(JSON.stringify({ type: HYDRATE_GUESS, success: false, errors }))
    }

    if (!gamestate.guess_cards) {
      gamestate.guess_cards = [...new Set(gamestate.selected_cards)]
    } else {
      gamestate.guess_cards = [...new Set(gamestate.guess_cards.filter(id => gamestate.selected_cards.includes(id)))]
    }

    Object.keys(gamestate.card_positions).forEach(key => {
      if (!gamestate.card_positions[key].guessed_roles) {
        gamestate.card_positions[key].guessed_roles = []
      }
    })

    if (position && id !== undefined) {
      Object.values(gamestate.card_positions).forEach(card => {
        const index = card.guessed_roles.indexOf(id)
        if (index > -1) {
          card.guessed_roles.splice(index, 1)
        }
      })

      const target = gamestate.card_positions[position]
      if (target) {
        const roleIndex = target.guessed_roles.indexOf(id)

        if (roleIndex > -1) {
          target.guessed_roles.splice(roleIndex, 1)
          if (!gamestate.guess_cards.includes(id)) {
            gamestate.guess_cards.push(id)
          }
        } else {
          target.guessed_roles.push(id)
          gamestate.guess_cards = gamestate.guess_cards.filter(token => token !== id)
        }
      }
    }

    const guessed_cards = Object.keys(gamestate.card_positions).map(position => ({
      position,
      guessed_roles: gamestate.card_positions[position].guessed_roles
    }))

    await upsertRoomState(gamestate)

    return broadcast(room_id, {
      type: HYDRATE_GUESS,
      success: true,
      guess_cards: gamestate.guess_cards,
      guessed_cards
    })
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_GUESS,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
