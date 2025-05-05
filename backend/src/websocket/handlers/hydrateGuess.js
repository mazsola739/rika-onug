import { HYDRATE_GUESS } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { validateRoom } from '../../validators'
import { broadcast, sendMessage } from '../../utils/connections.utils'

export const hydrateGuess = async (ws, message) => {
  const { room_id, guess } = message
  logTrace(`hydrate-guess requested in ${room_id}`)
  try {
    const { position, id } = guess || {}

    const [validity, gamestate, errors] = await validateRoom(room_id)
    if (!validity) return sendMessage(ws, { type: HYDRATE_GUESS, success: false, errors })

    if (!gamestate.guess_cards) {
      gamestate.guess_cards = [...new Set(gamestate.selected_cards)]
    } else {
      gamestate.guess_cards = [...new Set(gamestate.guess_cards.filter(id => gamestate.selected_cards.includes(id)))]
    }

    Object.keys(gamestate.positions.card_positions).forEach(key => {
      if (!gamestate.positions.card_positions[key].guessed_roles) {
        gamestate.positions.card_positions[key].guessed_roles = []
      }
    })

    if (position && id !== undefined) {
      Object.values(gamestate.positions.card_positions).forEach(card => {
        const index = card.guessed_roles.indexOf(id)
        if (index > -1) {
          card.guessed_roles.splice(index, 1)
        }
      })

      const target = gamestate.positions.card_positions[position]
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

    const guessed_cards = Object.keys(gamestate.positions.card_positions).map(position => ({
      position,
      guessed_roles: gamestate.positions.card_positions[position].guessed_roles
    }))

    await repo[repositoryType].upsertRoomState(gamestate)

    return broadcast(room_id, {
      type: HYDRATE_GUESS,
      success: true,
      guess_cards: gamestate.guess_cards,
      guessed_cards
    })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_GUESS, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
