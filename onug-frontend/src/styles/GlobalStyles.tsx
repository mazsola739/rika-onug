import { Global, css } from '@emotion/react'

import {
  fontFamily,
  fontSize20Pixel,
  nero,
  netflixWhite,
  nightRider,
  watermelon,
} from './variables'

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(
        330deg,
        ${watermelon} -8%,
        ${nightRider} 50%,
        ${netflixWhite + '00'} 70%
      ),
      ${nero};
    background-repeat: no-repeat;
    color: ${netflixWhite};
    font-family: ${fontFamily};
    font-size: ${fontSize20Pixel}px;
    margin: 0;
  }
`

export const GlobalStyles = () => <Global styles={globalStyles} />
