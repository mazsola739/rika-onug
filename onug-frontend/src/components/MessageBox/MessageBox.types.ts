import { Player } from 'types'

export interface ReadyListProps {
  players: Player[]
}

export interface ReadyType {
  ready: boolean
}

export interface MessageBoxCardsProps {
  cards: Record<string, string>[]
}

export interface SelectableProps {
  selectable: Record<string, string>[]
  selected: Record<string, string>[]
}
