import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilter = styled.div`
  height: 100%;
`

export const StyledFilterButton = styled.div<FilterButtonProps>`
  filter: drop-shadow(3px 3px 3px black);
  align-items: center;
  align-content: center;
  background-image: ${({ expansion }) =>
    `url(/assets/backgrounds/expansion_${expansion.toLocaleLowerCase().replace(' ', '')}.png)`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid white' : '1px solid transparent'};
  color: ${({ isSelected }) =>
    isSelected ? 'rgba(234,239,44, 1)' : 'rgba(255,255,255, 0.4)'};
  text-shadow: ${({ isSelected }) =>
    isSelected ? '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' : ''};
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 20px;
  justify-content: center;
  margin: auto;
  opacity: ${({ isSelected }) => (isSelected ? '0.8' : '0.5')};
  display: flex;
  transition: 0.75s;
  height: 50px;
  width: 100%;

  &:hover:not(:disabled) {
    transition: 0.75s;
    color: white;
    opacity: 1;
  }
`

export const StyledFilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%; 
`
