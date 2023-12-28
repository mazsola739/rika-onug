import { GameCard } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { StyledRoom, PlayersCards, CenterCards } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'

export const Room = observer(() => {
  const { playerCards, centerCards, chosenWolf, chosenSuperVillain } =
    roomStore.distributeCards()

  return (
    <>
      <RoomHeader />
      <StyledRoom>
        <PlayersCards>
          {playerCards.map((card, i) => (
            <GameCard
              key={card.id}
              card_name={card.card_name}
              player_number={i + 1}
              isCenter={false}
            />
          ))}
        </PlayersCards>
        {chosenWolf && (
          <CenterCards>
            <GameCard
              card_name={chosenWolf.card_name}
              player_number={1}
              isCenter={true}
            />
          </CenterCards>
        )}
        <CenterCards>
          {centerCards.map((card, i) => (
            <GameCard
              key={card.id}
              card_name={card.card_name}
              player_number={i + 1}
              isCenter={true}
            />
          ))}
        </CenterCards>
        {chosenSuperVillain && (
          <CenterCards>
            <GameCard
              card_name={chosenSuperVillain.card_name}
              player_number={1}
              isCenter={true}
            />
          </CenterCards>
        )}
      </StyledRoom>
      <RoomFooter />
    </>
  )
})
