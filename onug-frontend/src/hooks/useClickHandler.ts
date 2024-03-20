import { useCallback } from 'react'
import { JOIN_ROOM, LEAVE_ROOM, DEAL, RESET, START_GAME, READY, PAUSE_GAME, STOP_GAME, SCENE, LEAVE_TABLE, UPDATE_ROOM } from 'constant'
import { gamePlayStore, deckStore, wsStore, roomStore } from 'store'

export const useClickHandler = (room_id: string, token: string) => {
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  const handleJoinRoom = (room_id: string) => {
    sendJsonMessage?.({
      type: JOIN_ROOM,
      room_id,
      token,
    })
  }

  const handleLeaveRoom = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_ROOM,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleToGameTable = useCallback(() => {
    sendJsonMessage?.({
      type: DEAL,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleResetGame = useCallback(() => {
    sendJsonMessage?.({
      type: RESET,
      room_id,
      token,
    })
    gamePlayStore.resetGame()
  }, [sendJsonMessage])

  const handleStartGame = useCallback(() => {
    sendJsonMessage?.({
      type: START_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleReady = useCallback(() => {
    sendJsonMessage?.({
      type: READY,
      token,
      room_id,
    })
  }, [sendJsonMessage])

  const handlePauseGame = useCallback(() => {
    sendJsonMessage?.({
      type: PAUSE_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleStopGame = useCallback(() => {
    sendJsonMessage?.({
      type: STOP_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleLeaveTable = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_TABLE,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleCardInteraction = useCallback(
    (selected_cards: string[]) => {
      sendJsonMessage?.({
        type: SCENE,
        room_id,
        token,
        selected_card_positions: selected_cards,
      })
    },
    [sendJsonMessage]
  )

  const handleMarkInteraction = useCallback(
    (selected_marks: string[]) => {
      sendJsonMessage?.({
        type: SCENE,
        room_id,
        token,
        selected_mark_positions: selected_marks,
      })
    },
    [sendJsonMessage]
  )

  const handleAnswerInteraction = useCallback(
    (answer: string) => {
      sendJsonMessage?.({
        type: SCENE,
        room_id,
        token,
        answer: answer,
      })
    },
    [sendJsonMessage]
  )

  const handleDeselect = useCallback(
    (id: number, action: string) => {
      sendJsonMessage?.({
        type: UPDATE_ROOM,
        card_id: id,
        room_id,
        token,
        action,
      })

      roomStore.toggleInfo(id)
    },
    [deckStore, roomStore, sendJsonMessage]
  )

  const handleCardClick = useCallback(
    (id: number) => {
      sendJsonMessage?.({
        type: UPDATE_ROOM,
        card_id: id,
        room_id,
        token,
      })

      roomStore.toggleInfo(id)
    },
    [roomStore, sendJsonMessage]
  )

  return {
    handleJoinRoom,
    handleLeaveRoom,
    handleToGameTable,
    handleLeaveTable,
    handleResetGame,
    handleStartGame,
    handleReady,
    handlePauseGame,
    handleStopGame,
    handleCardInteraction,
    handleMarkInteraction,
    handleAnswerInteraction,
    handleDeselect,
    handleCardClick,
  }
}
