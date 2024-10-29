import { useState, useEffect } from 'react'
import { ARRIVE_VOTE, STAGES } from 'constant'
import { wsStore, playersStore } from 'store'

export const useVote = () => {
  const [firstTime, setFirstTime] = useState(true)
  const [history, setHistory] = useState('')

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_VOTE,
        stage: STAGES.VOTING,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (!lastJsonMessage?.player.player_history) return
    setHistory(
      Object.keys(lastJsonMessage.player.player_history).length === 0
        ? 'You have slept through the night'
        : JSON.stringify(lastJsonMessage.player.player_history, null, 2)
    )
  }, [lastJsonMessage])

  return { history }
}
