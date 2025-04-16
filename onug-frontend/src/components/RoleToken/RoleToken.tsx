import React from 'react'
import { StyledRoleToken } from './RoleToken.styles'
import { RoleTokenProps } from './RoleToken.types'
import { useRoleTokens } from './useRoleToken'
import { observer } from 'mobx-react-lite'

export const RoleToken: React.ComponentType<RoleTokenProps> = observer(({ token, size = 35 }) => {
  const { handleGuessClick, getBackgroundImage } = useRoleTokens(token)

  return <StyledRoleToken src={`/assets/cards/${token.image}.webp`} alt={token.image} bgImg={getBackgroundImage()} isSelected={false} size={size} onClick={handleGuessClick} />
})
