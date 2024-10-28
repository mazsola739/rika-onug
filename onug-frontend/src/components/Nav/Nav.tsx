import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { StyledNav, UnorderedLists } from './Nav.styles'
import { NavProps } from './Nav.types'
import { NavListItem } from './NavListItem'

//TODO menubuttons - common component with filter
export const Nav: React.FC<NavProps> = observer(({ anchorList }) => {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveAnchor(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    })

    anchorList.forEach((anchor) => {
      const element = document.getElementById(anchor)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      anchorList.forEach((anchor) => {
        const element = document.getElementById(anchor)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [anchorList])

  return (
    <StyledNav>
      <UnorderedLists>
        {anchorList.map((anchor, index) => (
          <NavListItem key={index} anchor={anchor} isActive={activeAnchor === anchor} />
        ))}
      </UnorderedLists>
    </StyledNav>
  )
})
