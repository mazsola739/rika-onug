import { observer } from 'mobx-react-lite'
import { StyledButtonGroup } from './ButtonGroup.styles'
import { ButtonGroupProps } from './ButtonGroup.types'

export const ButtonGroup: React.ComponentType<ButtonGroupProps> = observer(({ children }) => <StyledButtonGroup>{children}</StyledButtonGroup>)
