export interface VoteCardProps {
  id: number
  mark?: string
  position: string
  isCenter: boolean
  selectable_cards?: boolean
  select?: boolean
  shield?: boolean
  artifact?: boolean
}

export interface StyledCardProps {
  cardBackgroundImage: string
  selectable_cards?: boolean
  isSelectedCard?: boolean
}

export interface StyledMarkProps {
  markBackgroundImage: string
}

export interface StyledArtifactProps {
  artifactBackgroundImage: string
}