import styled from '@emotion/styled'

export const StyledNightHistory = styled.div`
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
`

export const Narration = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

export const NarrationImage = styled.img`
  width: 50px;
`

export const NarrationText = styled.span`
  font-size: 12px;
`
