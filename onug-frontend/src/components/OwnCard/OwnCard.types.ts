import { CardJson, Player, TokenJson } from 'types'

export interface OwnCardProps {
  card: CardJson
  mark: TokenJson
  artifact: TokenJson
  player: Player
}
