//@ts-check
import { validateRoom } from '../validator';
import { determineTotalPlayers, toggleCardSelect } from '../utils';
import { upsertRoomState } from '../repository'
import { HYDRATE_ROOM } from '../constant/ws';
import { broadcast } from './connections';

export const updateRoom = async (message) => {
  const { room_id, card_id, token } = message
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })
  const newGameState = { ...gameState }
  let totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)
  // TODO validate if player is admin
  newGameState.selected_cards = toggleCardSelect(
    newGameState.selected_cards,
    card_id,
    totalPlayers
  )

  totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)

  if (totalPlayers > 12) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors: ["Cannot have more than 12 players."] })

  upsertRoomState(newGameState)
  
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: newGameState.selected_cards })
};
