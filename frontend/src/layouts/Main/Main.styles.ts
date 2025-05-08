import styled from '@emotion/styled'

export const StyledMain = styled.main`
  /* Box Model */
  overflow-x: hidden;
  overflow-y: auto;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;

  /* Visuals */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
`
