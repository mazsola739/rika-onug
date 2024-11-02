import { ARRIVE_VOTE, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { riseAndRestStore, wsStore } from 'store'
import { splitCardsToTable } from 'utils'

export const useVote = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

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
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

  }, [lastJsonMessage, navigate])
  
  
  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides =
    tablePlayerCards && tablePlayerCard
      ? splitCardsToTable(tablePlayerCards, tablePlayerCard)
      : null
  const { left = [], middle = [], right = [] } = sides || {}


/*   useEffect(() => {
    if (!lastJsonMessage?.player.player_history) return
    setHistory(
      Object.keys(lastJsonMessage.player.player_history).length === 0
        ? 'You have slept through the night'
        : JSON.stringify(lastJsonMessage.player.player_history)
    )
  }, [lastJsonMessage]) */

  return { tablePlayerCards, tablePlayerCard, left, middle, right }
}
