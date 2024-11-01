// useGodAPI.ts
import { useCallback, useState } from 'react';
import { API_HOST } from 'constant';

export const useGod = () => {
    const [response, setResponse] = useState({ serverResponse: 'will be populated here' })
    const [roomId, setRoomId] = useState('')
    const [token, setToken] = useState('')
    const [message, setMessage] = useState({ type: 'REDIRECT', path: '/lobby' })
  
    const checkGamestates = async () => {
      const res = await fetch(`${API_HOST}/god/check_gamestates`)
      const json = await res.json()
      setResponse(json)
    }
  
    const checkGamestateByRoomId = async () => {
      const res = await fetch(
        `${API_HOST}/god/check_gamestate_by_room_id?room_id=${roomId}`
      )
      const json = await res.json()
      setResponse(json)
    }
  
    const deleteAllGamestates = async () => {
      const res = await fetch(`${API_HOST}/god/delete_all_gamestates`)
      const json = await res.json()
      setResponse(json)
    }
  
    const deleteGamestateByRoomId = async () => {
      const res = await fetch(
        `${API_HOST}/god/delete_gamestate_by_room_id?room_id=${roomId}`
      )
      const json = await res.json()
      setResponse(json)
    }
  
    const reInitAllGamestates = async () => {
      const res = await fetch(`${API_HOST}/god/re_init_all_gamestates`)
      const json = await res.json()
      setResponse(json)
    }
  
    const checkConnections = async () => {
      const res = await fetch(`${API_HOST}/god/check_connections`)
      const json = await res.json()
      setResponse(json)
    }
  
    const removePlayerByToken = async () => {
      const res = await fetch(
        `${API_HOST}/god/delete_player_by_token?token=${token}`
      )
      const json = await res.json()
      setResponse(json)
    }
  
    const removeAllPlayers = async () => {
      const res = await fetch(`${API_HOST}/god/delete_all_players`)
      const json = await res.json()
      setResponse(json)
    }
  
    // {"type": "MESSAGE", "message": "hi there, this is a broadcast message"}
    // examples:
    // {"type": "REDIRECT", "path": "/stub"}
    const broadcastToAll = useCallback(async () => {
      const res = await fetch(`${API_HOST}/god/broadcast_to_all`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      })
      const json = await res.json()
      setResponse(json)
    }, [message, setResponse])
  
    const broadcastToAllInRoom = useCallback(async () => {
      const res = await fetch(`${API_HOST}/god/broadcast_to_all_in_room`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message, room_id: roomId }),
      })
      const json = await res.json()
      setResponse(json)
    }, [token, message, setResponse, roomId])
  
    const sendMessageToPlayer = useCallback(async () => {
      const res = await fetch(`${API_HOST}/god/send_message_to_player`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message, token: token }),
      })
      const json = await res.json()
      setResponse(json)
    }, [token, message, setResponse])
  
    const listOnugEnvVars = async () => {
      const res = await fetch(`${API_HOST}/god/list_onug_env_vars`)
      const json = await res.json()
      setResponse(json)
    }
  
    const deleteAllOldLogFiles = async () => {
      const res = await fetch(`${API_HOST}/god/delete_all_old_log_files`)
      const json = await res.json()
      setResponse(json)
    }
  
    const setMessageHandler = (value: string) => {
      try {
        return setMessage(JSON.parse(value))
      } catch (error) {
        // shhhhhh, no need to do anything, we just try to
      }
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
  };
};
