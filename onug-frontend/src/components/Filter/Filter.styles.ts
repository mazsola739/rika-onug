import styled from '@emotion/styled'
import { FilterButtonProps } from './Filter.types'

const desktopStyles = `
  font-size: 16px;
  font-family: 'Josefin Sans', sans-serif;
  padding: 10px;
  width: 120px;
  height: 50px;
`

const mobileStyles = `
  font-size: 10px;
  padding: 5px;
  width: 100px;
  height: 40px;
`

export const StyledFilterButton = styled.button<FilterButtonProps>`
  ${({ expansion }) => `
    background-image: url(${require(
      `../../assets/backgrounds/game_${expansion}.png`
    )});
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
  `}
  color: white;
  border: ${({ isSelected }) => (isSelected ? '' : '2px solid white')};
  opacity: ${({ isSelected }) => (isSelected ? '0.6' : '1')};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: none;

  @media (min-width: 768px) {
    ${desktopStyles}
  }

  @media (max-width: 767px) {
    ${mobileStyles}
  }
`

export const StyledFilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
`

export const StyledFilter = styled.div`
  background-color: transparent;
  width: 100%;
`
