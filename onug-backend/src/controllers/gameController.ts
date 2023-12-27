import { v4 as uuidv4 } from 'uuid';
import { Card } from '../models/Card';
import {  Room } from '../models/Room';

const rooms: Room[] = [];
const cards: Card[] = [];

export const createRoom = (selectedCardIds: number[]): Room => {
  const id = uuidv4();
  const maxPlayers = selectedCardIds.length;
  const selectedCards = cards.filter((card) => selectedCardIds.includes(card.id));
  const room: Room = {
    id,
    players: [],
    maxPlayers,
    selectedCards,
  };
  rooms.push(room);
  return room;
};
