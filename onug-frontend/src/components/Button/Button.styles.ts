import styled from '@emotion/styled'
import { StyledButtonProps } from './Button.types'

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 500;
  padding: 10px 20px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
