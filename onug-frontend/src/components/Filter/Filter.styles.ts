import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilterButton = styled.button<FilterButtonProps>`
  background-image: ${({ expansion }) =>
    `url(/assets/backgrounds/game_${expansion}.png)`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  border: ${({ isSelected }) => (isSelected ? '' : '2px solid white')};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  height: 50px;
  opacity: ${({ isSelected }) => (isSelected ? '0.6' : '1')};
  padding: 10px;
  width: 120px;
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
