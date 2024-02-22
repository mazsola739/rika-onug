//@ts-check
import { PLAY_GAME } from '../constant/ws'
import { logTrace } from '../log'
import { validateRoom } from '../validator'
import { upsertRoomState } from '../repository'
import { STAGES } from '../constant/stage'
import { broadcastPlayGame } from './connections' //TODO ???

export const playGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Game started in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: PLAY_GAME, success: false, errors }))

  const player = gameState.players[token]

  const { playerCards, leftCard, middleCard, rightCard, newWolfCard, newVillainCard } = dealCardIds(selectedCards) //todo check

  const newRoomState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    card_positions: {
      center_left: leftCard,
      center_middle: middleCard,
      center_right: rightCard,
      center_wolf: newWolfCard,
      center_villain: newVillainCard,
    },
  }
  const playerTokens = Object.keys(gameState.players)

  playerTokens.forEach((token, index) => {
    newRoomState.players[token] = {
      ...gameState.players[token],
      player_card: playerCards[index],
      player_number: index + 1,
    }
  })

  // TODO validate player
  await upsertRoomState(newRoomState)

  return broadcastPlayGame(newRoomState)
}
