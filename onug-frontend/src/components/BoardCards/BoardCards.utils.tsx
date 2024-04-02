import { BoardCard } from 'components'
import { gameBoardStore } from 'store'
import { CardContainer, PlayersCards, CardTitle, CenterCards, CenterCardContainer } from './BoardCards.styles'

export const renderPlayerCards = () => {
  const { playerCards } = gameBoardStore

  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map((card, index) => (
          <BoardCard
            key={index}
            isCenter={false}
            id={card.id}
            mark={card.mark}
            position={card.position}
            selectable_cards={card.selectable_cards}
            selectable_marks={card.selectable_marks}
          />
        ))}
      </PlayersCards>
    </CardContainer>
  )
}

export const renderCenterCard = () => {
  const { centerCards } = gameBoardStore
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card &&
      card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <BoardCard
              id={card.id}
              position={card.position}
              isCenter={true}
              selectable_cards={card.selectable_cards}
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
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => {
              const card = centerCards.find((c) => c.position === position)
              return (
                card &&
                card.id !== null && (
                  <BoardCard
                    key={index}
                    id={card.id}
                    position={card.position}
                    isCenter={true}
                    selectable_cards={card.selectable_cards}
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
