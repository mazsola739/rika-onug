import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilterButton = styled.div<FilterButtonProps>`
  align-items: center;
  align-content: center;
  background-image: ${({ expansion }) =>
    `url(/assets/backgrounds/game_${expansion}.png)`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid transparent' : '1px solid white'};
  color: white;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  height: 50px;
  justify-content: center;
  margin: auto;
  opacity: ${({ isSelected }) => (isSelected ? '0.6' : '1')};
  display: flex;
  width: 118px;
`

export const StyledFilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  height: 55%;
  justify-content: space-between;
  padding: 8px 10px;
  position: fixed;
  top: 120px;
`
