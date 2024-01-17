import {
  Footer,
  FooterButtons,
  Button,
  LinkButton,
  SelectedCardList,
} from 'components'
import { PLAY_GAME, buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { gamePlayStore, roomStore, selectedDeckStore } from 'store'
import { RoomFooterProps } from './Room.types'
import { useNavigate } from 'react-router-dom'
import { leaveRoomRequest } from 'api'

export const RoomFooter = observer(
  ({ room_id, player_name }: RoomFooterProps) => {
    const navigate = useNavigate()

    const handleResetGame = useCallback(() => {
      gamePlayStore.resetGame()
    }, [])

    const handleLeaveRoom = useCallback(async () => {
      try {
        const responseData = await leaveRoomRequest()

        if (responseData.success) {
          navigate('/lobby')
        } else {
          console.error('Failed to leave room:', responseData.error)
        }
      } catch (error) {
        console.error(error.message)
      }
    }, [navigate])

    const handleStartGame = useCallback(() => {
      const sendJsonMessage = roomStore.getSendJsonMessage()
      sendJsonMessage({
        type: PLAY_GAME,
        room_id,
        token: sessionStorage.getItem('token'),
      })
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
