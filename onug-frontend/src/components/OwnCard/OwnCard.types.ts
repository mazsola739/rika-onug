import { CardJson, PlayerType, TokenJson } from 'types'

export interface OwnCardProps {
  title: string
  card: CardJson
  mark: TokenJson
  artifact?: TokenJson
  player: PlayerType
}
