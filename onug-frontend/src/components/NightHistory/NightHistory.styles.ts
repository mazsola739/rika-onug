import styled from '@emotion/styled'

export const StyledNightHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem; /* Width of vertical scrollbar */
    height: 0.5rem; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 0.625rem; /* Rounded corners for the scrollbar thumb */
  }

  /* For Firefox */
  .scrollable {
    scrollbar-width: thin; /* Use 'thin' for thin scrollbar */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Thumb color and track color */
  }
`

export const Narration = styled.div`
  display: flex;
  gap: 0.3125rem;
  align-items: center;
`

export const NarrationImage = styled.img`
  width: 4.375rem;
`

export const NarrationText = styled.span`
  font-size: 0.875rem;
`
