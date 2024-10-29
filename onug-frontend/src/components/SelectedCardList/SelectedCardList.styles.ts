import styled from '@emotion/styled'

export const StyledSelectedCardList = styled.div`
  display: flex;
  gap: 3px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-direction: row;

  overflow-x: auto;
  overflow-y: hidden; 

  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    height: 8px; /* Height of horizontal scrollbar */
    width: 8px; /* Width of vertical scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;

`
