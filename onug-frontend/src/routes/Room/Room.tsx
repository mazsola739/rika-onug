import {
  Button,
  Footer,
  FooterButtons,
  GameCard,
  Header,
  LinkButton,
} from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { buttons } from 'constant'
import { gamePlayStore, roomStore, selectedDeckStore } from 'store' // Direct store imports
import { StyledRoom, PlayersCards, CenterCards } from './Room.styles'

export const Room = observer(() => {
  const { playerCards, centerCards, chosenWolf, chosenSuperVillain } =
    roomStore.distributeCards()

  const handlePauseGame = useCallback(() => {
    gamePlayStore.togglePauseStatus()
  }, [])

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
  }, [selectedDeckStore])

  const handleStartGame = useCallback(() => {
    console.log('Game started', buttons.start_button_label)
  }, [])

  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  return (
    <>
      <Header>
        <p>Header</p>
      </Header>
      <StyledRoom>
        <PlayersCards>
          {playerCards.map((card, i) => (
            <GameCard
              key={card.id}
              card_name={card.card_name}
              display_name={card.display_name}
              player_number={i + 1}
              isCenter={false}
            />
          ))}
        </PlayersCards>
        {chosenWolf && (
          <CenterCards>
            <GameCard
              card_name={chosenWolf.card_name}
              display_name={chosenWolf.display_name}
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
              display_name={card.display_name}
              player_number={i + 1}
              isCenter={true}
            />
          ))}
        </CenterCards>
        {chosenSuperVillain && (
          <CenterCards>
            <GameCard
              card_name={chosenSuperVillain.card_name}
              display_name={chosenSuperVillain.display_name}
              player_number={1}
              isCenter={true}
            />
          </CenterCards>
        )}
      </StyledRoom>
      <Footer>
        <FooterButtons>
          <Button
            onClick={handlePauseGame}
            buttontext={buttonText}
            backgroundColor="#ff9800"
          />
          <LinkButton
            linkTo="/"
            onClick={handleStopGame}
            buttontext={buttons.stop_button_label}
            backgroundColor="#f44336"
          />
          <LinkButton
            linkTo="/gameplay"
            onClick={handleStartGame}
            buttontext={buttons.start_game_label}
            backgroundColor="#8e44ad"
          />
        </FooterButtons>
      </Footer>
    </>
  )
})
