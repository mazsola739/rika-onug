import { v4 as uuidv4 } from 'uuid'
import { Card } from '../model/Card'
import {  Room } from '../model/Room'

const rooms: Room[] = []
const cards: Card[] = []

export const createRoom = (selectedCardIds: number[]): Room => {
  const id = uuidv4()
  const maxPlayers = selectedCardIds.length //TODO not from length
  const selectedCards = cards.filter((card) => selectedCardIds.includes(card.id))
  const room: Room = {
    id,
    players: [],
    maxPlayers,
    selectedCards,
  }
  rooms.push(room)
  return room
}
