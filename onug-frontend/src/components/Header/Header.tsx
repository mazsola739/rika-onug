import { FooterProps } from 'components/Footer/Footer.types'
import { observer } from 'mobx-react-lite'
import { StyledHeader } from './Header.styles'

export const Header: React.FC<FooterProps> = observer(({ children }) => <StyledHeader>{children}</StyledHeader>)
