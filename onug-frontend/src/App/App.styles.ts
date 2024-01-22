import styled from '@emotion/styled'

export const StyledApp = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/backgrounds/cards.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: relative;
  text-align: center;

  &::before {
    content: '';
    background: radial-gradient(
      circle,
      hsla(190, 100%, 50%, 1) 0%,
      hsla(240, 86%, 25%, 1) 100%
    );
    height: 100%;
    left: 0;
    opacity: 0.7;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export const ConnectionStatusIcon = styled.img`
  bottom: 5px;
  position: absolute;
  right: 5px;
  width: 20px;
`
