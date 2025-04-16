import { observer } from 'mobx-react-lite'
import { StyledHeader } from './Header.styles'
import { HeaderProps } from './Header.types'

export const Header: React.ComponentType<HeaderProps> = observer(({ children }) => <StyledHeader>{children}</StyledHeader>)
