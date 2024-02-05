import '@emotion/react'

import { ThemeObject } from 'types'

declare module '@emotion/react' {
  export interface Theme extends ThemeObject {
    color: {
      primary: string
      secondary: string
      background: string
      border: string
      primaryText: string
    }
  }
}
