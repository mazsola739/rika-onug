import { observer } from 'mobx-react-lite'
import { LabelProps } from './Label.types'
import { StyledLabel } from './Label.styles'

export const Label: React.ComponentType<LabelProps> = observer(({ children }) => (
  <StyledLabel>
    {children}
  </StyledLabel>
))

