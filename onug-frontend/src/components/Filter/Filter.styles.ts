import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilterButton = styled.button<FilterButtonProps>`
  ${({ expansion }) => `
    background-image: url(${`/assets/backgrounds/game_${expansion}.png`});
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
  `}
  color: white;
  border: ${({ isSelected }) => (isSelected ? '' : '2px solid white')};
  opacity: ${({ isSelected }) => (isSelected ? '0.6' : '1')};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Josefin Sans', sans-serif;
  padding: 10px;
  width: 120px;
  height: 50px;
`

export const StyledFilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  height: 55%;
  position: fixed;
`
