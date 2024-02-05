import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'

import { GlobalStyles } from 'styles'

import { theme } from './ThemeProvider.constants'

export const ThemeProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </EmotionThemeProvider>
  )
}
