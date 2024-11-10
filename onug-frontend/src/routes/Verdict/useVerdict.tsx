import { ARRIVE_VERDICT, REDIRECT, RESULT } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { propStore, riseAndRestStore, wsStore } from 'store'

export const useVerdict = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_VERDICT,
        room_id,
        token
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {

    if (lastJsonMessage?.type === RESULT) {
      propStore.setEnd(true)
      riseAndRestStore.openYourEyes(lastJsonMessage)
      riseAndRestStore.setTablePlayerCard(lastJsonMessage)
      propStore.setVoteResult(lastJsonMessage.vote_result)
      propStore.setWinnerTeams(lastJsonMessage.winner_teams)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

  }, [lastJsonMessage, navigate])
}
