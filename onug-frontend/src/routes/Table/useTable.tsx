import { ARRIVE_TABLE, HYDRATE_READY, HYDRATE_TABLE, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deckStore, interactionStore, playersStore, wsStore } from 'store'
import { splitPlayersToTable } from 'utils'

export const useTable = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()
  
  const token = sessionStorage.getItem('token')
  const room_id = sessionStorage.getItem('room_id')

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_TABLE,
        stage: STAGES.TABLE,
        token,
        room_id,
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_TABLE) {
      playersStore.setPlayer(lastJsonMessage.player)
      playersStore.setPlayers(lastJsonMessage.players)
      deckStore.setPlayerCard()
      deckStore.setPlayerMark()
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      interactionStore.closeYourEyes()
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, playersStore.setPlayer, playersStore.setPlayers, navigate])

  const { players, player } = playersStore

  const sides = players && player ? splitPlayersToTable(players, player) : null
  const { left = [], middle = [], right = [] } = sides || {}

  return { players, player, left, middle, right }
}
