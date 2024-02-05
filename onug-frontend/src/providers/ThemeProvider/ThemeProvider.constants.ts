import { variables } from 'styles'
import { ThemeAgnosticStyles, ThemeObject } from 'types'

const shared: ThemeAgnosticStyles = {
  shape: {
    borderRadius: variables.borderRadius,
  },
  shadows: {
    shadow: variables.shadow,
  },
  typography: {
    fontFamily: variables.fontFamily,
    fontWeight300: 300,
    fontWeight400: 400,
    fontWeight500: 500,
    fontWeight600: 600,
    fontWeight900: 900,
    fontSize12: `${variables.fontSize12Pixel}px`,
    fontSize14: `${variables.fontSize14Pixel}px`,
    fontSize16: `${variables.fontSize16Pixel}px`,
    fontSize18: `${variables.fontSize18Pixel}px`,
    fontSize20: `${variables.fontSize20Pixel}px`,
    fontSize24: `${variables.fontSize24Pixel}px`,
    fontSize40: `${variables.fontSize40Pixel}px`,
  },
}

export const theme: ThemeObject = {
  colors: {
    primary: variables.watermelon,
    footer: variables.charcoal,
    primaryBackground: variables.nero,
    secondaryBackground: variables.nightRider,
    border: variables.mortar,
    secondary: variables.gray,
    primaryText: variables.netflixWhite,
    netflix: variables.netflixRed,
  },
  ...shared,
}
