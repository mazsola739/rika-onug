import styled from '@emotion/styled'

export const StyledPlayerInfoList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;

  overflow-x: hidden;
  overflow-y: auto;

  & > * {
    flex-basis: 165px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  ::-webkit-scrollbar {
    width: 8px; /* Width of vertical scrollbar */
    height: 8px; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }
`
