import styled from '@emotion/styled'

export const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  background-image: radial-gradient(
      circle,
      hsla(190, 100%, 50%, 0.7) 0%,
      hsla(240, 86%, 25%, 0.7) 100%
    ),
    url('/assets/backgrounds/cards.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const ConnectionStatus = styled.div`
  bottom: 5px;
  position: absolute;
  right: 5px;
`
