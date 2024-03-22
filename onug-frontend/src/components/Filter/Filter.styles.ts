import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

export const StyledFilter = styled.div`
  position: sticky;
  top: 0;
  height: 100%;
`

export const StyledFilterButton = styled.div<FilterButtonProps>`
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
    isSelected ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0.4)'};
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  height: 50px;
  justify-content: center;
  margin: auto;
  opacity: ${({ isSelected }) => (isSelected ? '0.8' : '0.5')};
  display: flex;
  width: 130px;
  transition: 0.75s;

  &:hover:not(:disabled) {
    transition: 0.75s;
    opacity: 1;
  }
`

export const StyledFilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 8px 10px;
`
