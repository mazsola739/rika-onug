import React from 'react'
import { StyledMenuButton } from './MenuButton.styles'
import { MenuButtonProps } from './MenuButton.types'
import { observer } from 'mobx-react-lite'

export const MenuButton: React.FC<MenuButtonProps> = observer(({ bgColor, bgImg, isSelected = false, onClick }) => <StyledMenuButton bgColor={bgColor} bgImg={bgImg} isSelected={isSelected} onClick={onClick} />)
