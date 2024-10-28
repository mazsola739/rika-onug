import styled from '@emotion/styled'

export const StyledMain = styled.main`
display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* For Firefox */
.scrollable {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
`
