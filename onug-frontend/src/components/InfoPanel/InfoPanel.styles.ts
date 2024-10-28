import styled from '@emotion/styled'

export const StyledInfoPanel = styled.div`
overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: grey;
  }
`
