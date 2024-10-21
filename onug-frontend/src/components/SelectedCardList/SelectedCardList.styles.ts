import styled from '@emotion/styled'

export const StyledSelectedCardList = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  overflow-y: hidden;
  overflow-x: auto;

    /* height */
  ::-webkit-scrollbar {
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white;
    max-width: 50px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: grey;
  }
`
