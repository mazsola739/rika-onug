import styled from '@emotion/styled'

export const StyledSelectedCardList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px; /* Width of vertical scrollbar */
    height: 8px; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }

  /* For Firefox */
  .scrollable {
    scrollbar-width: thin; /* Use 'thin' for thin scrollbar */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Thumb color and track color */
  }
`
