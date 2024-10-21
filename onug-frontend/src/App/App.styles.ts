import styled from '@emotion/styled'

export const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  background-image: radial-gradient(ellipse at top, #9a9a9aBF, #000000E6),
    url('/assets/backgrounds/wood.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const ConnectionStatus = styled.div`
  bottom: 5px;
  position: absolute;
  right: 5px;
`
