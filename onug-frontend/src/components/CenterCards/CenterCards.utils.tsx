import { TableCard } from '../TableCard/TableCard'
import { CardContainer, CardTitle, CenterCards, CenterCardContainer } from './CenterCards.styles'
import { CenterPositionProperties } from 'types'

export const renderCenterCard = (centerCards: CenterPositionProperties[]) => {
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card && card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <TableCard id={card.id} position={card.position} isCenter={true} />
          </CenterCards>
        </CardContainer>
      )
    )
  }

  return (
    <CenterCardContainer>
      {renderCard('center_wolf', 'Wolf')}
      <CardContainer>
        <CardTitle>Center</CardTitle>
        <CenterCards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => {
              const card = centerCards.find((c) => c.position === position)
              return (
                card &&
                card.id !== null && (
                  <TableCard key={index} id={card.id} position={card.position} isCenter={true} />
                )
              )
            }
          )}
        </CenterCards>
      </CardContainer>
      {renderCard('center_villain', 'Villain')}
    </CenterCardContainer>
  )
}
