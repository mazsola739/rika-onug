import { observer } from 'mobx-react-lite'
import { StyledCenterCards } from './CenterCards.styles'
import { renderCenterCard } from './CenterCards.utils'

export const CenterCards: React.FC = observer(() => <StyledCenterCards>{renderCenterCard()}</StyledCenterCards>)