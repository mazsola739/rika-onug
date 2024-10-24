import { ARRIVE_TABLE, HYDRATE_READY, HYDRATE_TABLE, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardStore, wsStore } from 'store'
import { splitPlayersToTable } from 'utils'

export const useTable = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()
  
  const token = sessionStorage.getItem('token')
  const room_id = sessionStorage.getItem('room_id')

  const { setPlayer, setPlayers, players, player } = boardStore
  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_TABLE,
        stage: STAGES.DEALING,
        token,
        room_id,
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_TABLE) {
      setPlayer({
        player_name: lastJsonMessage.player.player_name,
        player_number: lastJsonMessage.player.player_number,
        player_card_id: lastJsonMessage.player.player_card_id,
        player_original_id: lastJsonMessage.player.player_original_id,
        player_role: lastJsonMessage.player.player_role,
        player_role_id: lastJsonMessage.player.player_role_id,
        player_team: lastJsonMessage.player.player_team,
        player_mark: lastJsonMessage.player.player_mark,
      })
      setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, setPlayers, navigate])

  const sides = players && player ? splitPlayersToTable(players, player) : null
  const { left = [], middle = [], right = [] } = sides || {}

  return { players, player, left, middle, right }
}
