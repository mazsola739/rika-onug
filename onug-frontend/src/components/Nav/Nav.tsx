import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { NavButtons, StyledNav, TeamsTitle } from './Nav.styles'
import { NavProps } from './Nav.types'
import { NavButton } from './NavButton'

export const Nav: React.FC<NavProps> = observer(({ anchorList }) => {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)

  //TODO fix it, right now not refreshing the anchor isactive status
  useEffect(() => {
    const sections = anchorList.map(anchor => document.getElementById(anchor)).filter(Boolean)
    const navLinks = document.querySelectorAll('.navbar .nav-container button')

    const updateActiveSection = () => {
      let activeSectionId: string | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()

        const distanceFromTop = rect.top

        if (distanceFromTop >= 0 && distanceFromTop < closestDistance) {
          closestDistance = distanceFromTop
          activeSectionId = section.id
        }
      })

      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.classList.contains(activeSectionId || '')) {
          link.classList.add('active')
        }
      })

      setActiveAnchor(activeSectionId)
    }

    window.addEventListener('scroll', updateActiveSection)
    window.addEventListener('resize', updateActiveSection)

    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [anchorList])

  return (
    <StyledNav className="navbar">
      <TeamsTitle>TEAMS</TeamsTitle>
      <NavButtons className="nav-container">
        {anchorList.map((anchor, index) => (
          <NavButton key={index} anchor={anchor} isActive={activeAnchor === anchor} />
        ))}
      </NavButtons>
    </StyledNav>
  )
})
