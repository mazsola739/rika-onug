import { observer } from 'mobx-react-lite'
import { StyledFooterButtons } from './FooterButtons.styles'
import { FooterButtonsProps } from './FooterButtons.types'

export const FooterButtons: React.FC<FooterButtonsProps> = observer(({ children }) => <StyledFooterButtons>{children}</StyledFooterButtons>)
