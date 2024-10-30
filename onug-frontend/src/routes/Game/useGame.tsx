import { ARRIVE_GAME, HYDRATE_GAME, PAUSE_GAME, REDIRECT, SCENE, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gamePlayStore, messageStore, playersStore, riseAndRestStore, wsStore } from 'store'
import { MessagesType, NarrationType } from 'types'
import { splitPlayersToTable } from 'utils'

export const useGame = () => {
  const [firstTime, setFirstTime] = useState(true)
  const [nightMode, setNightMode] = useState(false);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_GAME,
        stage: STAGES.GAME,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (transitionCompleted) {
      sendJsonMessage?.({ type: SCENE, room_id, token, player_ready: true })
    }
  }, [sendJsonMessage, transitionCompleted])

  useEffect(() => {
    if (lastJsonMessage?.type === SCENE) {
      messageStore.setNarration(lastJsonMessage.narration as NarrationType[])
      messageStore.setPrivateMessage(lastJsonMessage.interaction.private_message as MessagesType[])

    }

    if (lastJsonMessage?.type === HYDRATE_GAME) {
        setNightMode(true)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === PAUSE_GAME) {
      gamePlayStore.toggleIsRunning()
    }

  }, [lastJsonMessage, navigate])
  
  const { tablePlayerCards } = riseAndRestStore
  const { player } = playersStore

  const tablePlayer = tablePlayerCards.find(
    (tablePlayerCard) => tablePlayerCard.position === player.player_number
  )

  const sides = tablePlayerCards && tablePlayer ? splitPlayersToTable(tablePlayerCards, tablePlayer) : null
  const { left = [], middle = [], right = [] } = sides || {}

  return { tablePlayerCards, tablePlayer, left, middle, right, nightMode, setTransitionCompleted }
}
