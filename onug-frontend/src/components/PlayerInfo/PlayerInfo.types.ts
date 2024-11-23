import { CardJson, PlayerType, TokenJson } from 'types'

export interface PlayerInfoProps {
  card_name: string
  mark?: string
  artifact?: string
  player: PlayerType
}
