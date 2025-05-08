import styled from '@emotion/styled'

export const StyledApp = styled.div`
  /* Positioning */
  position: relative;

  /* Box Model */
  width: 100vw;
  height: 100vh;

  /* Visuals */
  background-image: radial-gradient(ellipse at top, #9a9a9abf, #000000e6), url('/assets/backgrounds/wood.webp');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const ConnectionStatus = styled.div`
  /* Positioning */
  position: absolute;
  bottom: 5px;
  left: 5px;
`
