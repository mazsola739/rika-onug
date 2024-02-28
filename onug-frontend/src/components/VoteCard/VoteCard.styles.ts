import styled from '@emotion/styled'
import { StyledCardProps, StyledMarkProps, StyledArtifactProps } from './VoteCard.types'


export const StyledVoteCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`

export const CardBack = styled.div<StyledCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.cardBackgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border: ${(props) =>
    props.selectable_cards
      ? props.isSelectedCard
        ? '3px solid yellow'
        : '3px solid green'
      : '3px solid white'};

  border-radius: 6px;
  height: 90px;
  justify-content: center;
  width: 90px;
`

export const MarkBack = styled.div<StyledMarkProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.markBackgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 50%;
  height: 50px;
  justify-content: center;
  width: 50px;
`

export const ArtifactBack = styled.div<StyledArtifactProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.artifactBackgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 50%;
  height: 50px;
  justify-content: center;
  width: 50px;
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  color: red;
  gap: 2px;
  min-height: 25px;
`
