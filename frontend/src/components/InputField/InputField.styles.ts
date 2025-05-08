import styled from '@emotion/styled'

export const StyledInputField = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Typography */
  font-size: 14px;
`

export const Input = styled.input`
  /* Box Model */
  padding: 10px;
  border-radius: 4px;

  /* Typography */
  font-size: 14px;
  color: #333;

  /* Visuals */
  filter: drop-shadow(3px 3px 3px black);
`
