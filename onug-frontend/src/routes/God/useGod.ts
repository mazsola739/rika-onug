import { useCallback, useState } from 'react'
import { API_HOST } from 'constant'

export const useGod = () => {
  const [response, setResponse] = useState({ serverResponse: 'will be populated here' })
  const [roomId, setRoomId] = useState('')
  const [token, setToken] = useState('')
  const [message, setMessage] = useState({ type: 'REDIRECT', path: '/lobby' })

  const fetchWrapper = async (endpoint: string, options = {}) => {
    const res = await fetch(`${API_HOST}/god/${endpoint}`, options)
    setResponse(await res.json())
  }

  const checkGamestates = () => fetchWrapper('check_gamestates')
  const checkGamestateByRoomId = () => fetchWrapper(`check_gamestate_by_room_id?room_id=${roomId}`)
  const deleteAllGamestates = () => fetchWrapper('delete_all_gamestates')
  const deleteGamestateByRoomId = () => fetchWrapper(`delete_gamestate_by_room_id?room_id=${roomId}`)
  const reInitAllGamestates = () => fetchWrapper('re_init_all_gamestates')
  const checkConnections = () => fetchWrapper('check_connections')
  const removePlayerByToken = () => fetchWrapper(`delete_player_by_token?token=${token}`)
  const removeAllPlayers = () => fetchWrapper('delete_all_players')
  const listOnugEnvVars = () => fetchWrapper('list_onug_env_vars')
  const deleteAllOldLogFiles = () => fetchWrapper('delete_all_old_log_files')

  const broadcastToAll = useCallback(() =>
    fetchWrapper('broadcast_to_all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }), [message])

  const broadcastToAllInRoom = useCallback(() =>
    fetchWrapper('broadcast_to_all_in_room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, room_id: roomId }),
    }), [message, roomId])

  const sendMessageToPlayer = useCallback(() =>
    fetchWrapper('send_message_to_player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, token }),
    }), [message, token])

  const setMessageHandler = (value: string) => {
    try {
      setMessage(JSON.parse(value))
    } catch (error) { /* Handle JSON parse error */ }
  }

  return {
    response,
    roomId,
    token,
    message,
    setRoomId,
    setToken,
    setMessageHandler,
    checkGamestates,
    checkGamestateByRoomId,
    deleteAllGamestates,
    deleteGamestateByRoomId,
    reInitAllGamestates,
    checkConnections,
    removePlayerByToken,
    removeAllPlayers,
    broadcastToAll,
    broadcastToAllInRoom,
    sendMessageToPlayer,
    listOnugEnvVars,
    deleteAllOldLogFiles,
  }
}
