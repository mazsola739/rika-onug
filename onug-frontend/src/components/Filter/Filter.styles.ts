import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilter = styled.fieldset`
  width: 150px;
  margin: 0;
  border: none;
  padding: 0;
  margin: 10px;
`

export const StyledFilterButton = styled.button<FilterButtonProps>`
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
    isSelected ? 'white' : 'rgba(255,255,255, 0.4)'};
  text-shadow: ${({ isSelected }) =>
    isSelected ? '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' : ''};
  cursor: pointer;
  font-size: 20px;
  justify-content: center;
  margin: 0;
  padding: 0;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  display: flex;
  transition: 0.75s;
  height: 50px;
  width: 140px;

  &:hover:not(:disabled) {
    transition: 0.75s;
    color: rgba(234,239,44, 1);
    opacity: 1;
  }
`

export const FilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%; 
`
