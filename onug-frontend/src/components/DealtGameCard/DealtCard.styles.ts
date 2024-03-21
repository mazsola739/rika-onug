import styled from '@emotion/styled'
import { StyledDealtCardProps } from './DealtCard.types'

export const StyledDealtCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CardBack = styled.div<StyledDealtCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;

  height: 110px;
  justify-content: center;
  width: 80px;
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  color: red;
  gap: 2px;
`
