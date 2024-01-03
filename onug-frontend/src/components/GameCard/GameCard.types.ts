import { PlayerType } from 'types'

export interface GameCardProps {
  player?: PlayerType
  isCenter: boolean
}

export interface StyledGameCardProps {
  backgroundImage: string
}
