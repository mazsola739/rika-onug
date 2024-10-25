import { useEffect, useState } from 'react'
import { ARRIVE_GAME, HYDRATE_GAME, MESSAGE, PAUSE_GAME, REDIRECT, SCENE, STAGES } from 'constant'
import { useNavigate } from 'react-router-dom'
import { boardStore, gamePlayStore, interactionStore, narrationStore, wsStore } from 'store'
import { splitPlayersToTable } from 'utils'

export const useGame = () => {
  const [firstTime, setFirstTime] = useState(true)
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
    if (lastJsonMessage?.type === SCENE) {
      narrationStore.setNarration(lastJsonMessage.narration)
      interactionStore.setLastJsonMessage(lastJsonMessage)

      if (Object.keys(lastJsonMessage.interaction).length > 0) {
        interactionStore.setMessage(lastJsonMessage.interaction.private_message)
        interactionStore.setInteraction(lastJsonMessage.interaction.title)
        interactionStore.toggleMessageBoxStatus(true)
      }
    }

    if (lastJsonMessage?.type === HYDRATE_GAME) {
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
    }

    if (lastJsonMessage?.type === MESSAGE) {
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

  return { players, left, middle, right }
}
