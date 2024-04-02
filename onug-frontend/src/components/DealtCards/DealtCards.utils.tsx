import { DealtCard } from 'components'
import { CardContainer, PlayersCards, CardTitle, CenterCards, CenterCardContainer } from './DealtCards.styles'
import { PlayerPositionProperties, CenterPositionProperties } from 'types'

export const renderPlayerCards = (playerCards: PlayerPositionProperties[]) => {
  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map(({ position, id, ready }, index) => (
          <DealtCard key={index} isCenter={false} id={id} position={position} ready={ready} />
        ))}
      </PlayersCards>
    </CardContainer>
  )
}

export const renderCenterCard = (centerCards: CenterPositionProperties[]) => {
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card && card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <DealtCard id={card.id} position={card.position} isCenter={true} />
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
                  <DealtCard key={index} id={card.id} position={card.position} isCenter={true} />
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
