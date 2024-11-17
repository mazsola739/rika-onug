import { CardJson, Player, TokenJson } from 'types'

export interface OwnCardProps {
  title: string
  card: CardJson
  mark: TokenJson
  artifact?: TokenJson
  player: Player
}
