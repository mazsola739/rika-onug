import { HYDRATE_GUESS } from '../constants'
import { upsertRoomState } from '../repository'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const hydrateGuess = async (ws, message) => {
  const { room_id, guess } = message
  const { position, id } = guess || {}

  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
  if (!roomIdValid) {
    return ws.send(JSON.stringify({ type: HYDRATE_GUESS, success: false, errors }))
  }

  const newGamestate = { ...gamestate }

  if (!newGamestate.guess_cards) {
    newGamestate.guess_cards = [...new Set(newGamestate.selected_cards)]
  } else {
    newGamestate.guess_cards = [...new Set(newGamestate.guess_cards.filter(id => newGamestate.selected_cards.includes(id)))]
  }

  Object.keys(newGamestate.card_positions).forEach((key) => {
    if (!newGamestate.card_positions[key].guessed_roles) {
      newGamestate.card_positions[key].guessed_roles = []
    }
  })

  if (position && id !== undefined) {
    Object.keys(newGamestate.card_positions).forEach((key) => {
      const roleIndex = newGamestate.card_positions[key].guessed_roles.indexOf(id)
      if (roleIndex > -1) {
        newGamestate.card_positions[key].guessed_roles.splice(roleIndex, 1)
      }
    })

    const target = newGamestate.card_positions[position]

    if (target && target.guessed_roles) {
      const roleIndex = target.guessed_roles.indexOf(id)

      if (roleIndex > -1) {
        target.guessed_roles.splice(roleIndex, 1)
        if (!newGamestate.guess_cards.includes(id)) {
          newGamestate.guess_cards.push(id)
        }
      } else {
        target.guessed_roles.push(id)
        newGamestate.guess_cards = newGamestate.guess_cards.filter(token => token !== id)
      }
    }
  }

  const guessed_cards = Object.keys(newGamestate.card_positions).map(
    (position) => ({
      position,
      guessed_roles: newGamestate.card_positions[position].guessed_roles,
    })
  )

  await upsertRoomState(newGamestate)

  return broadcast(room_id, {
    type: HYDRATE_GUESS,
    success: true,
    guess_cards: newGamestate.guess_cards,
    guessed_cards,
  })
}
