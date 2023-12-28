import {
  Footer,
  FooterButtons,
  Button,
  LinkButton,
  SelectedCardList,
} from 'components'
import { buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { gamePlayStore, deckStore, selectedDeckStore } from 'store'

export const HomeFooter = observer(() => {
  const handleResetGame = useCallback(() => {
    gamePlayStore.resetGame()
  }, [])

  const handleStartGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
    deckStore.resetDetailedCardInfo()
  }, [])

  const totalPlayers = selectedDeckStore.totalPlayers
  const buttonText = totalPlayers
    ? `${buttons.play_game_text}${totalPlayers}`
    : buttons.play_game_text

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleResetGame}
          buttontext={buttons.reset_game_label}
          backgroundColor="#007bff"
        />
        <LinkButton
          linkTo="/room"
          onClick={handleStartGame}
          disabled={!selectedDeckStore.totalPlayers}
          buttontext={buttonText}
          backgroundColor="#28a745"
        />
      </FooterButtons>
      <SelectedCardList />
    </Footer>
  )
})
