import { observer } from 'mobx-react-lite'
import { StyledTableCenterCards } from './TableCenterCards.styles'
import { renderCenterCard } from './TableCenterCards.utils'

export const TableCenterCards: React.FC = observer(() => <StyledTableCenterCards>{renderCenterCard()}</StyledTableCenterCards>)