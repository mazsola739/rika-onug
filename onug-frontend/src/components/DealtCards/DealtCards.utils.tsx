import { GameCard } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  CenterCardContainer,
} from './DealtCards.styles'
import { PositionProperties } from 'types'

const renderPlayerCards = (playerCards: PositionProperties[]) => {
  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map(({ position, id, ready }, index) => (
          <GameCard
            key={index}
            isCenter={false}
            id={id}
            position={position}
            ready={ready}
          />
        ))}
      </PlayersCards>
    </CardContainer>
  )
}

const renderCenterCard = (centerCards: PositionProperties[]) => {
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card &&
      card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <GameCard id={card.id} position={card.position} isCenter={true} />
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
                  <GameCard
                    key={index}
                    id={card.id}
                    position={card.position}
                    isCenter={true}
                  />
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

export const dealtCardsUtils = {
  renderPlayerCards,
  renderCenterCard,
}
