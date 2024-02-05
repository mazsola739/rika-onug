import { Global, css } from '@emotion/react'
//TODO all themes & global styles
const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-image: radial-gradient(
        circle,
        hsla(190, 100%, 50%, 0.7) 0%,
        hsla(240, 86%, 25%, 0.7) 100%
      ),
      url('/assets/backgrounds/cards.png');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 14px;
    margin: 0;
  }
`

export const GlobalStyles = () => <Global styles={globalStyles} />
