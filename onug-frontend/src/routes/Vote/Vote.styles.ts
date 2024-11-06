import styled from '@emotion/styled'

export const StyledVote = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 170px calc(100vw - 740px) 170px 400px;
  grid-template-rows: 80px 130px calc(100vh - 290px) 80px;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 2 / 1 / 4 / 2;
  }
  & > div:nth-of-type(2) {
    grid-area: 2 / 2 / 3 / 3;
  }
  & > div:nth-of-type(3) {
    grid-area: 2 / 3 / 4 / 4;
  }
  & > div:nth-of-type(4) {
    grid-area: 1 / 4 / 5 / 5;
  }
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 1 / 4 / 4;
  }
`

export const GameArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const Voted = styled.div`
  min-width: 320px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
`

export const VoteCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

//INFOPANEL
export const ReadyStatus = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

export const ReadyTitle = styled.h3`
  grid-area: title;
  color: yellow;
  padding: 0;
  margin: 0;
  padding: 0 0 10px 0;
  text-align: center;
`

export const NarrationText = styled.span`
  color: white;
  font-size: 14px;
`

export const Narration = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

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

export const NarrationImage = styled.img`
  width: 70px;
`
