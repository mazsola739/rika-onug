import { ARRIVE_GAME, HYDRATE_GAME, HYDRATE_SCENE, MESSAGE, PAUSE_GAME, REDIRECT, SCENE, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardStore, gamePlayStore, interactionStore, sceneStore, wsStore } from 'store'
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
      sendJsonMessage?.({ type: HYDRATE_SCENE, room_id, token, scene_finished: true }); //TYPE? TITLE?
    }
  }, [sendJsonMessage, transitionCompleted])

  useEffect(() => {
    if (lastJsonMessage?.type === SCENE) {
      interactionStore.setLastJsonMessage(lastJsonMessage)

      if (Object.keys(lastJsonMessage.interaction).length > 0) {
        interactionStore.setMessage(lastJsonMessage.interaction.private_message)
        interactionStore.setInteraction(lastJsonMessage.interaction.title)
        interactionStore.toggleMessageBoxStatus(true)
      }
    }

    if (lastJsonMessage?.type === HYDRATE_GAME) {
      sceneStore.setTitle(lastJsonMessage.actual_scene.scene_title)
      if (lastJsonMessage?.actual_scene?.scene_title === 'START_GAME') {
        setNightMode(true)
      }
    }

    if (lastJsonMessage?.type === MESSAGE) { //TODO check
      interactionStore.toggleMessageBoxStatus(true)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === PAUSE_GAME) {
      gamePlayStore.toggleIsRunning()
    }
  }, [lastJsonMessage, navigate])
  
  const { players, player } = boardStore

  const sides = players && player ? splitPlayersToTable(players, player) : null
  const { left = [], middle = [], right = [] } = sides || {}

  return { players, left, middle, right, nightMode, setTransitionCompleted }
}
