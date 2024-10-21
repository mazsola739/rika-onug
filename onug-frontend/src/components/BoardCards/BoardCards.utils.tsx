import { gameBoardStore } from 'store'
import { CardContainer, PlayersCards, CardTitle, CenterCards, CenterCardContainer } from './BoardCards.styles'
import BoardCard from 'components/BoardCard/BoardCard'

export const renderPlayerCards = () => {
  const { playerCards } = gameBoardStore

  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map((card, index) => (
          <BoardCard key={index} isCenter={false} boardCard={card} />
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
      card && card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <BoardCard isCenter={true} boardCard={card} />
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
                card && card.id !== null && (
                  <BoardCard key={index} isCenter={true} boardCard={card} />
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
