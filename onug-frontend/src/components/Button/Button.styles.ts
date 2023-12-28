import styled from '@emotion/styled'
import { StyledButtonProps } from './Button.types'

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
