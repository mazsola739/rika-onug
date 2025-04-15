import { VoteType } from 'types'

export interface MessageBoxProps {
  cards?: Record<string, string>[]
  marks?: Record<string, string>[]
}

export interface MessageTokensProps {
  players?: Record<string, string>[]
}

export interface MessageBoxAnswerProps {
  answer_options: string[]
}

export interface VoteResultProps {
  votes: VoteType
}

export interface SelectableProps {
  selectableCards?: Record<string, string>[]
  selectableMarks?: Record<string, string>[]
  selected: Record<string, string>[]
}

export interface LookProps {
  roles: string[]
  players?: Record<string, string>[]
}
