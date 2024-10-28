import { observer } from 'mobx-react-lite'
import { NavListItemProps } from './Nav.types'
import { ListItem } from './Nav.styles'

export const NavListItem: React.FC<NavListItemProps> = observer(
  ({ anchor }) => {
    
    const handleClick = () => {
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return (
      <ListItem anchor={anchor}>
        <button onClick={handleClick}>{anchor}</button>
      </ListItem>
    )
  }
)
