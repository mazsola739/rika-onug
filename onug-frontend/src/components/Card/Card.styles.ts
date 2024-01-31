import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  align-items: center;
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
  border: ${({ isSelected }) =>
    isSelected ? '2px solid yellow' : '2px solid transparent'};
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  width: 90px;
`

export const CardImage = styled.img<{ isSelected?: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')};
  width: 90px;
  z-index: 1;
`

export const CardName = styled.span<StyledCardProps>`
  background-color: transparent;
  color: #bfefff;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  left: 50%;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.4')};
  padding: 0 5px;
  position: absolute;
  text-align: center;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
