import { DEAL, JOIN_ROOM, LEAVE_GAME, LEAVE_ROOM, PAUSE_GAME, READY, RESET, SCENE, START_GAME, START_VOTE, STOP_GAME, UPDATE_GUESS, UPDATE_ROOM, VOTE } from 'constant'
import { useCallback } from 'react'
import { gameStatusStore, riseAndRestStore, roomStore, wsStore } from 'store'

export const useClickHandler = () => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  //ARE YOU READY?
  const handleReady = useCallback(() => {
    sendJsonMessage?.({
      type: READY,
      token,
      room_id
    })
  }, [sendJsonMessage])

  //BACK TO ROOM
  const handleLeaveGame = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_GAME,
      room_id,
      token
    })
  }, [sendJsonMessage])

  //LOBBY
  const handleJoinRoom = (room_id: string) => {
    sendJsonMessage?.({
      type: JOIN_ROOM /*  */,
      room_id,
      token
    })
  }

  //ROOM
  const handleLeaveRoom = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_ROOM,
      room_id,
      token
    })
  }, [sendJsonMessage])

  const handleJoinTable = useCallback(() => {
    sendJsonMessage?.({
      type: DEAL,
      room_id,
      token
    })
  }, [sendJsonMessage])

  const handleResetGame = useCallback(() => {
    sendJsonMessage?.({
      type: RESET,
      room_id,
      token
    })
    gameStatusStore.resetStatus()
  }, [sendJsonMessage])

  //CARD SELECTION / DESELECTION
  const handleSelectAndDeselect = useCallback(
    (id: number) => {
      sendJsonMessage?.({
        type: UPDATE_ROOM,
        card_id: id,
        room_id,
        token
      })

      roomStore.toggleInfo(id)
    },
    [roomStore, sendJsonMessage]
  )

  //TABLE
  const handleStartGame = useCallback(() => {
    sendJsonMessage?.({
      type: START_GAME,
      room_id,
      token
    })
    gameStatusStore.toggleStart()
  }, [sendJsonMessage])

  const handlePauseGame = useCallback(() => {
    sendJsonMessage?.({
      type: PAUSE_GAME,
      room_id,
      token
    })
    gameStatusStore.togglePause()
  }, [sendJsonMessage])

  const handleStopGame = useCallback(() => {
    sendJsonMessage?.({
      type: STOP_GAME,
      room_id,
      token
    })
    gameStatusStore.toggleStop()
  }, [sendJsonMessage])

  //COUNCIL
  const handleVoteNow = useCallback(() => {
    sendJsonMessage?.({
      type: START_VOTE,
      room_id,
      token
    })
  }, [sendJsonMessage])

  const handleAccuse = useCallback(
    (selected_cards: string[]) => {
      sendJsonMessage({
        type: VOTE,
        room_id,
        token,
        selected_card_positions: selected_cards
      })
    },
    [sendJsonMessage]
  )

  //GAME
  const handleFinish = useCallback(
    (title: string) => {
      sendJsonMessage?.({
        type: SCENE,
        title,
        room_id,
        token,
        done: true
      })
      riseAndRestStore.closeYourEyes()
    },
    [sendJsonMessage]
  )

  const handleSkip = useCallback(
    (title: string) => {
      sendJsonMessage?.({
        type: SCENE,
        title,
        room_id,
        token,
        skip: true
      })
      riseAndRestStore.closeYourEyes()
    },
    [sendJsonMessage]
  )

  const handleCardInteraction = useCallback(
    (selected_cards: string[], title: string) => {
      sendJsonMessage?.({
        type: SCENE,
        title,
        room_id,
        token,
        selected_card_positions: selected_cards
      })
    },
    [sendJsonMessage]
  )

  const handleMarkInteraction = useCallback(
    (selected_marks: string[], title: string) => {
      sendJsonMessage?.({
        type: SCENE,
        title,
        room_id,
        token,
        selected_mark_positions: selected_marks
      })
    },
    [sendJsonMessage]
  )

  const handleAnswerInteraction = useCallback(
    (selected_answer: string, title: string) => {
      sendJsonMessage?.({
        type: SCENE,
        title,
        room_id,
        token,
        selected_answer
      })
    },
    [sendJsonMessage]
  )

  const handleVote = useCallback(
    (selected_vote: string, title: string) => {
      sendJsonMessage?.({
        type: title,
        title,
        room_id,
        token,
        selected_vote
      })
    },
    [sendJsonMessage]
  )

  return {
    handleJoinRoom,
    handleLeaveRoom,
    handleJoinTable,
    handleLeaveGame,
    handleResetGame,
    handleStartGame,
    handleReady,
    handlePauseGame,
    handleStopGame,
    handleFinish,
    handleSkip,
    handleCardInteraction,
    handleMarkInteraction,
    handleAnswerInteraction,
    handleSelectAndDeselect,
    handleVoteNow,
    handleVote,
    handleAccuse
  }
}
