import { VoteType } from 'types'

export interface MessageBoxProps {
  cards?: Record<string, string>[]
  marks?: Record<string, string>[]
}

export interface MessagePlayersProps {
  players?: Record<string, string>[]
}

export interface ResultTableCellProps {
  isFixedWidth?: boolean
  isMaxWidth?: boolean
  isFixedHeight?: boolean
}
