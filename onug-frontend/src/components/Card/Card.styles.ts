import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  position: relative;

  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90px;
  height: 90px;
  overflow: hidden;

  ${({ isSelected }) =>
    isSelected
      ? `
      border: 3px solid yellow;
      background-color: rgba(0, 0, 0, 0.3);
      `
      : `
      border: 3px solid transparent;
      background-color: transparent;
      `}
`

export const CardImage = styled.img<{ isSelected?: boolean }>`
  width: 90px;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')};
  z-index: 1;
`

export const CardName = styled.span<StyledCardProps>`
  position: absolute;
  text-align: center;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  color: white;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.4')};
  font-size: 10px;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
  padding: 0 5px;
  z-index: 2;
`
