import React from 'react'
import { StyledMenuButton } from './MenuButton.styles'
import { MenuButtonProps } from './MenuButton.types'

export const MenuButton: React.FC<MenuButtonProps> = ({ bgColor, bgImg, isSelected = false, onClick }) => (
  <StyledMenuButton bgColor={bgColor} bgImg={bgImg} isSelected={isSelected} onClick={onClick} />
)
