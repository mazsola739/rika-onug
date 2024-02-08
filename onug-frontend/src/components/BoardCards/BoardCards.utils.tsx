import { GameCard } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  CenterCardContainer,
} from './BoardCards.styles'
import { gameBoardStore } from 'store'

const renderPlayerCards = () => {
  const { playerCards } = gameBoardStore

  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map(
          ({ position, id, ready, werewolf, selectable, mason }) => (
            <GameCard
              key={position}
              isCenter={false}
              id={id}
              position={position}
              ready={ready}
              werewolf={werewolf}
              selectable={selectable}
              mason={mason}
            />
          )
        )}
      </PlayersCards>
    </CardContainer>
  )
}

const renderCenterCard = () => {
  const { centerCards } = gameBoardStore
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card &&
      card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <GameCard
              id={card.id}
              position={card.position}
              isCenter={true}
              selectable={card.selectable}
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
              card.id !== null && (
                <GameCard
                  key={position}
                  id={card.id}
                  position={card.position}
                  isCenter={true}
                  selectable={card.selectable}
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
