export type IconType =
  | 'closed'
  | 'closing'
  | 'connecting'
  | 'open'
  | 'uninstantiated'
  | 'alien'
  | 'artifact'
  | 'assassin'
  | 'blob'
  | 'cow'
  | 'dreamwolf'
  | 'family'
  | 'fang'
  | 'interaction'
  | 'lover'
  | 'mason'
  | 'mortician'
  | 'secret'
  | 'seer'
  | 'select'
  | 'shield'
  | 'spinner'
  | 'supervillain'
  | 'tanner'
  | 'vampire'
  | 'werewolf'

export type FontWeight = 200 | 300 | 400 | 500 | 600 | 700 | 900

export interface ThemeColors {
  primary: string
  footer: string
  primaryBackground: string
  secondaryBackground: string
  border: string
  primaryText: string
  netflix: string
  secondary: string
}

export interface ThemeAgnosticStyles {
  shape: {
    borderRadius: string
  }
  shadows: {
    shadow: string
  }
  typography: {
    fontFamily: string
    fontWeight300: FontWeight
    fontWeight400: FontWeight
    fontWeight500: FontWeight
    fontWeight600: FontWeight
    fontWeight900: FontWeight
    fontSize12: string
    fontSize14: string
    fontSize16: string
    fontSize18: string
    fontSize20: string
    fontSize24: string
    fontSize40: string
  }
}

export interface ThemeObject extends ThemeAgnosticStyles {
  colors: ThemeColors
}

export type Themed<T> = T & { theme: ThemeObject }
export type Styled<T> = T & {
  as?: React.ElementType<unknown>
}
