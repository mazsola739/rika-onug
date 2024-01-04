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
import { gamePlayStore, deckStore, selectedDeckStore, roomStore } from 'store'

export const HomeFooter = observer(() => {
  const handleResetGame = useCallback(() => {
    gamePlayStore.resetGame()
  }, [])

  const handleStartGame = useCallback(async () => {
    roomStore.createPlayers()
    roomStore.storeCenterCards()
    gamePlayStore.toggleGameStatus()
    deckStore.resetDetailedCardInfo()
    selectedDeckStore.addCardIdsToArray()
    try {
      const requestBody = {
        route: 'create-room',
        cards: selectedDeckStore.selectedCardIds,
      }

      const response = await fetch('http://localhost:7654/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseData = await response.json()

      console.log('Response from backend:', responseData)
    } catch (error) {
      console.error('Error sending ready request:', error)
    }
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
