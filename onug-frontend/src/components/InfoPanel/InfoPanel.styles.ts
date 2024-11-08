import styled from '@emotion/styled'

export const StyledInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid #969290;
  border-radius: 10px 0 0 10px;
  padding: 5px;
  gap: 10px;
`

//SUSPICION
export const StyledSuspicion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  border-bottom: 2px solid #969290;
  padding: 10px;
`

export const SelectedTitle = styled.h4`
  padding: 0;
  margin: 0;
  color: white;
  text-align: center;
`

export const StyledReadyStatus = styled.div`
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
`

export const NarrationImage = styled.img`
  width: 70px;
`

export const StyledCouncilNarration = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

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

export const StyledSelectedCards = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: row;
  flex-wrap: wrap;
`

export const MessageBoxCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CardPosition = styled.span`
  font-size: 10px;
  font-weight: lighter;
  padding: 5px 0;
  margin: 0;
  color: white;
`

export const StyledInfo = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 5px;
  min-height: 90px;
  border-bottom: 2px solid #969290;
  padding: 5px 0;
  grid-template-columns: 80px 300px;
  grid-template-rows: 20px 60px;
  grid-template-areas:
    'avatar character'
    'avatar rule';

  img {
    grid-area: avatar;
  }
  h4 {
    grid-area: character;
  }
  p {
    grid-area: rule;
  }
`

export const Avatar = styled.img`
  width: 80px;
  border: 1px solid yellow;
`

export const Character = styled.h4`
  grid-area: title;
  color: yellow;
  padding: 0;
  margin: 0;
  text-align: left;
`

export const Rule = styled.span`
  color: white;
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: left;
`

export const StyledPlayerNames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;

  color: white;
  font-size: 14px;

  border-bottom: 2px solid #969290;
  padding-bottom: 5px;
`

export const Names = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  align-items: center;
  min-width: 388px;
`

export const Players = styled.h3`
  grid-area: title;
  color: yellow;
  padding: 10px 0;
  margin: 0;
  text-align: center;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const PlayerName = styled.span`
  text-align: center;
`