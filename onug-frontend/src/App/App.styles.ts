import styled from '@emotion/styled'

export const StyledApp = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/backgrounds/cards.png');
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      hsla(190, 100%, 50%, 1) 0%,
      hsla(240, 86%, 25%, 1) 100%
    );
    opacity: 0.7;
  }
`

export const ConnectionStatusIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
`
