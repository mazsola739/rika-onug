import { ARRIVE_GAME, HYDRATE_GAME, PAUSE_GAME, REDIRECT, SCENE, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playersStore, gamePlayStore, interactionStore, wsStore } from 'store'
import { InteractionType, NarrationType } from 'types'
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
      interactionStore.setNarration(lastJsonMessage.narration as NarrationType[])
      interactionStore.setInteraction(lastJsonMessage.interaction as InteractionType)
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
  
  const { players, player } = playersStore

  const sides = players && player ? splitPlayersToTable(players, player) : null
  const { left = [], middle = [], right = [] } = sides || {}

  return { players, left, middle, right, nightMode, setTransitionCompleted }
}
