import { Card } from "./Card"
import { Player } from "./Player"

export interface Room {
    id: string
    players: Player[] 
    maxPlayers: number //frontend
    selectedCards: Card[]
  }
  