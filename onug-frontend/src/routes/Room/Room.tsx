import { Footer, GameCard, Header } from 'components'
import { observer } from 'mobx-react-lite'
import { gamePlayStore, roomStore, selectedDeckStore } from 'store'
import {
  StyledRoom,
  PlayersCards,
  CenterCards,
  PauseButton,
  StopButton,
  StyledFooterButtons,
  StartButton,
} from './Room.styles'
import { buttons } from 'constant'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

const FooterButtons = observer(() => {
  const handlePauseGame = useCallback(() => {
    gamePlayStore.togglePauseStatus()
  }, [])

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
  }, [selectedDeckStore])

  const handleStartGame = useCallback(() => {
    console.log('Game started', buttons.start_button_label)
  }, [])

  return (
    <StyledFooterButtons>
      <PauseButton onClick={handlePauseGame}>
        {gamePlayStore.isGamePaused
          ? buttons.pause_button_alt_label
          : buttons.pause_button_label}
      </PauseButton>
      <Link to="/">
        <StopButton onClick={handleStopGame}>
          {buttons.stop_button_label}
        </StopButton>
      </Link>
      <Link to="/gameplay">
        <StartButton onClick={handleStartGame}>
          {buttons.start_game_label}
        </StartButton>
      </Link>
    </StyledFooterButtons>
  )
})

export const Room = observer(() => {
  const { playerCards, centerCards, chosenWolf, chosenSuperVillain } =
    roomStore.distributeCards()

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
        <FooterButtons />
      </Footer>
    </>
  )
})
