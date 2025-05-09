import { TablePlayerCard } from 'types'

export interface PlayerCardProps {
  cardSize?: number
  tokenSize?: number
  card?: TablePlayerCard
  ownCard?: boolean
}

export interface StyledPlayerCardProps {
  ownCard?: boolean
}

export interface GuessTokensProps {
  width?: number
  ownCard?: boolean 
}
