import { CardPosition, Player } from 'types'

export interface ReadyListProps {
  players: Player[]
}

export interface ReadyType {
  ready: boolean
}

export interface MessageBoxProps {
  cards?: Record<string, string>[]
  marks?: Record<string, string>[]
}

export interface AnswersProps {
  answer_options: string[]
}

export interface VoteResultProps {
  votes: Record<CardPosition, CardPosition[]>
}

export interface SelectableProps {
  selectableCards?: Record<string, string>[]
  selectableMarks?: Record<string, string>[]
  selected: Record<string, string>[]
}

export interface LookProps {
  roles: string[]
  cards?: Record<string, string>[]
  marks?: Record<string, string>[]
}
