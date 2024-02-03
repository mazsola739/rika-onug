import { GameCard } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  CenterCardContainer,
} from './DealtCards.styles'
import { BoardCardType } from 'types'

const renderPlayerCards = (playerCards: BoardCardType[]) => (
  <CardContainer>
    <PlayersCards>
      {playerCards.map(({ position, card }) => (
        <GameCard
          key={position}
          isCenter={false}
          id={card.id}
          position={position}
        />
      ))}
    </PlayersCards>
  </CardContainer>
)

const renderCenterCard = (centerCards: BoardCardType[]) => {
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card &&
      card.card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <GameCard
              id={card.card.id}
              position={card.position}
              isCenter={true}
            />
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
          {['center_left', 'center_middle', 'center_right'].map((position) => {
            const card = centerCards.find((c) => c.position === position)
            return (
              card &&
              card.card.id !== null && (
                <GameCard
                  key={position}
                  id={card.card.id}
                  position={card.position}
                  isCenter={true}
                />
              )
            )
          })}
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
