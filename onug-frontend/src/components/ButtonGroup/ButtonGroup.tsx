import { observer } from 'mobx-react-lite'
import { StyledButtonGroup } from './ButtonGroup.styles'
import { ButtonGroupProps } from './ButtonGroup.types'

export const ButtonGroup: React.FC<ButtonGroupProps> = observer(({ children }) => <StyledButtonGroup>{children}</StyledButtonGroup>)
