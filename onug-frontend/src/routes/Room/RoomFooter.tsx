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
import { gamePlayStore, roomStore, selectedDeckStore } from 'store'
import { RoomFooterProps } from './Room.types'
import { useNavigate } from 'react-router-dom'

export const RoomFooter = observer(
  ({ room_id, player_name }: RoomFooterProps) => {
    const navigate = useNavigate()

    const handleResetGame = useCallback(() => {
      gamePlayStore.resetGame()
    }, [])

    const handleLeaveRoom = useCallback(async () => {
      try {
        const requestBody = {
          route: 'leave-room',
          room_id: room_id,
          player_name: player_name,
        }

        const response = await fetch('http://localhost:7654/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        const responseData = await response.json()

        if (responseData.success) {
          navigate('/lobby')
        }
      } catch (error) {
        console.error('Error leaving room:', error)
      }
    }, [navigate, room_id])

    const handleStartGame = useCallback(() => {
      gamePlayStore.toggleGameStatus()
      roomStore.resetDetailedCardInfo()
      selectedDeckStore.addCardIdsToArray()
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
            linkTo={`/gametable/${room_id}`}
            onClick={handleStartGame}
            disabled={!selectedDeckStore.totalPlayers}
            buttontext={buttonText}
            backgroundColor="#28a745"
          />
          <LinkButton
            linkTo="/lobby"
            onClick={handleLeaveRoom}
            buttontext="LEAVE ROOM"
            backgroundColor="#dc3545"
          />
        </FooterButtons>
        <SelectedCardList />
      </Footer>
    )
  }
)
