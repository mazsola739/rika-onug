import { observer } from 'mobx-react-lite'
import { StyledInfoPanel } from './InfoPanel.styles'
import { InfoPanelProps } from './InfoPanel.types'

export const InfoPanel: React.FC<InfoPanelProps> = observer(({ children }) => <StyledInfoPanel>{children}</StyledInfoPanel>)
