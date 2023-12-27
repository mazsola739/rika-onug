import { useCallback } from 'react'
import { buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { deckStore, selectedDeckStore } from 'store'
import {
  StyledFooterButtons,
  StartButton,
  PauseButton,
  StopButton,
  StyledFooter,
  StyledSelectedCard,
  StyledSelectedCardList,
  ResetButton,
} from './Footer.styles'
import { SelectedCardProps } from './Footer.types'

const SelectedCard = ({ src, alt, id }: SelectedCardProps & { id: number }) => {
  const handleDeselect = () => {
    selectedDeckStore.toggleCardSelection({
      id,
      display_name: alt,
      expansion: '',
      team: '',
      wake_up_time: '',
      card_name: '',
      order: 0,
      rules: '',
    })
  }

  return (
    <StyledSelectedCard
      key={alt}
      src={src}
      alt={alt}
      onClick={handleDeselect}
    />
  )
}

const SelectedCardList = observer(() => {
  const { selectedCards, isGameStopped } = selectedDeckStore
  return (
    <StyledSelectedCardList>
      {isGameStopped &&
        selectedCards.map((card) => (
          <SelectedCard
            key={card.id}
            src={require(`../../assets/cards/${card.card_name}.png`)}
            alt={card.display_name}
            id={card.id}
          />
        ))}
    </StyledSelectedCardList>
  )
})

const FooterButtons = observer(() => {
  const isGameStarted = selectedDeckStore.isGameStarted

  const handleResetGame = useCallback(() => {
    selectedDeckStore.resetGame()
  }, [])

  const handleStartGame = useCallback(() => {
    selectedDeckStore.toggleGameStatus()
    deckStore.resetDetailedCardInfo()
  }, [selectedDeckStore, deckStore])

  const handlePauseGame = useCallback(() => {
    selectedDeckStore.togglePauseStatus()
  }, [])

  const handleStopGame = useCallback(() => {
    selectedDeckStore.toggleGameStatus()
  }, [selectedDeckStore])

  if (isGameStarted) {
    return (
      <StyledFooterButtons>
        <PauseButton onClick={handlePauseGame}>
          {selectedDeckStore.isGamePaused
            ? buttons.pause_button_alt_label
            : buttons.pause_button_label}
        </PauseButton>
        <StopButton onClick={handleStopGame}>
          {buttons.stop_button_label}
        </StopButton>
      </StyledFooterButtons>
    )
  }

  const totalPlayers = selectedDeckStore.totalPlayers
  const buttonText = totalPlayers
    ? `${buttons.start_game_text}${totalPlayers}`
    : buttons.start_game_text

  return (
    <StyledFooterButtons>
      <ResetButton onClick={handleResetGame}>
        {buttons.reset_game_text}
      </ResetButton>
      <StartButton onClick={handleStartGame} disabled={!totalPlayers}>
        {buttonText}
      </StartButton>
    </StyledFooterButtons>
  )
})

export const Footer = () => (
  <StyledFooter>
    <FooterButtons />
    <SelectedCardList />
  </StyledFooter>
)
