import { ARRIVE_VERDICT, REDIRECT, RESULT } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { voteStore, wsStore } from 'store'

export const useVerdict = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()
  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_VERDICT,
        room_id,
        token
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === RESULT && lastJsonMessage.success) {
      voteStore.revealResult(lastJsonMessage)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, navigate])
}
