import { deckStore } from 'store'
import { TableCard } from '../TableCard/TableCard'
import { CardContainer, CardTitle, CenterCards, CenterCardContainer } from './CenterCards.styles'

export const renderCenterCard = () => {
  const { hasAlphawolf, hasTemptress } = deckStore

  const renderCard = (position: string, title: string) => {
    return (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <TableCard id={0} position={position} isCenter={true} />
          </CenterCards>
        </CardContainer>
    )
  }

  return (
    <CenterCardContainer>
      {hasAlphawolf && renderCard('center_wolf', 'Wolf')}
      <CardContainer>
        <CardTitle>Center</CardTitle>
        <CenterCards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => <TableCard key={index} id={0} position={position} isCenter={true} />
          )}
        </CenterCards>
      </CardContainer>
      {hasTemptress && renderCard('center_villain', 'Villain')}
    </CenterCardContainer>
  )
}
