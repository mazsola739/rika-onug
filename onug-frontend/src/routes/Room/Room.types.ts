import RoomStore from 'store/RoomStore'

export interface RoomProps {
  roomStore: RoomStore
}

export interface RoomFooterProps {
  room_id: string
  player_name: string
}
