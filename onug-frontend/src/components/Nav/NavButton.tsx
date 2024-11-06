import { MenuButton } from 'components/MenuButton/MenuButton'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { getBackgroundColor, getBackgroundImage } from './Nav.styles'
import { NavButtonProps } from './Nav.types'

export const NavButton: React.FC<NavButtonProps> = observer(({ anchor, isActive }) => {
  const handleClick = () => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return <MenuButton bgColor={getBackgroundColor(anchor)} bgImg={getBackgroundImage(anchor)} isSelected={isActive} onClick={handleClick} />
})
