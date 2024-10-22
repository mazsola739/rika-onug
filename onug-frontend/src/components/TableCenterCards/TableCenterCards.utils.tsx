import { deckStore } from 'store'
import { TableCard } from '../TableCard/TableCard'
import { CardContainer, CardTitle, TableCenterCards, CenterCardContainer } from './TableCenterCards.styles'

export const renderCenterCard = () => {
  const { hasAlphawolf, hasTemptress } = deckStore

  const renderCard = (position: string, title: string) => {
    return (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <TableCenterCards>
            <TableCard id={0} position={position} isCenter={true} />
          </TableCenterCards>
        </CardContainer>
    )
  }

  return (
    <CenterCardContainer>
      {hasAlphawolf && renderCard('center_wolf', 'Wolf')}
      <CardContainer>
        <CardTitle>Center</CardTitle>
        <TableCenterCards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => <TableCard key={index} id={0} position={position} isCenter={true} />
          )}
        </TableCenterCards>
      </CardContainer>
      {hasTemptress && renderCard('center_villain', 'Villain')}
    </CenterCardContainer>
  )
}
