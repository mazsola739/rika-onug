import { observer } from 'mobx-react-lite'
import { NavListItemProps } from "./Nav.types"
import { ListItem } from './Nav.styles'

export const NavListItem: React.FC<NavListItemProps> = observer(
  ({ anchor }) => {
    
    return (
      <ListItem anchor={anchor}><a href={`#${anchor}`} >{anchor}</a></ListItem>
    )
  }
)
