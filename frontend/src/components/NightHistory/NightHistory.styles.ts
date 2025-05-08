import styled from '@emotion/styled'

export const StyledNightHistory = styled.div`
  /* Box Model */
  overflow-x: hidden;
  overflow-y: auto;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Visuals */
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
  /* Flexbox/Grid */
  display: flex;
  gap: 5px;
  align-items: center;
`

export const NarrationImage = styled.img`
  /* Box Model */
  width: 50px;
`

export const NarrationText = styled.span`
  /* Typography */
  font-size: 12px;
`
