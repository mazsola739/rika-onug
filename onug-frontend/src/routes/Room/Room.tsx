import { GameCard, GameToken } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore, selectedDeckStore } from 'store'
import {
  StyledRoom,
  PlayersCards,
  CenterCards,
  Marks,
  CardContainer,
  CardTitle,
  CenterCardContainer,
  Shield,
} from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { artifacts } from 'data'

export const Room = observer(() => {
  const { playerCards, centerCards, chosenWolf, chosenSuperVillain } =
    roomStore.distributeCards()

  const selectedMarks = selectedDeckStore.selectedMarks

  return (
    <>
      <RoomHeader />
      <StyledRoom>
        <CardContainer>
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
        </CardContainer>
        <CenterCardContainer>
          {/* Shield */}
          <Shield
            src={require(`../../assets/tokens/shield.png`)}
            alt="shield"
          />
          {chosenWolf && (
            <CardContainer>
              <CardTitle>Werewolf</CardTitle>
              <CenterCards>
                <GameCard
                  card_name={chosenWolf.card_name}
                  player_number={1}
                  isCenter={true}
                />
              </CenterCards>
            </CardContainer>
          )}
          <CardContainer>
            <CardTitle>Center</CardTitle>
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
          </CardContainer>
          {chosenSuperVillain && (
            <CardContainer>
              <CardTitle>Villain</CardTitle>
              <CenterCards>
                <GameCard
                  card_name={chosenSuperVillain.card_name}
                  player_number={1}
                  isCenter={true}
                />
              </CenterCards>
            </CardContainer>
          )}
        </CenterCardContainer>
        <Marks>
          {selectedMarks.map((mark) => {
            return (
              <GameToken
                key={mark.id}
                tokenName={mark.token_name}
                isInDeck={mark.isInDeck}
                display_name={mark.display_name}
              />
            )
          })}
        </Marks>
        <Marks>
          {artifacts.map(
            (artifact, i) =>
              artifact.token_name !== 'shield' && (
                <img
                  key={i}
                  style={{ width: '60px' }}
                  src={require(
                    `../../assets/tokens/${artifact.token_name}.png`
                  )}
                  alt={artifact.token_name}
                />
              )
          )}
        </Marks>
      </StyledRoom>
      <RoomFooter />
    </>
  )
})
