import { observer } from 'mobx-react-lite'
import { useState } from 'react'

// TODO security, protected routing and sending a secure GOD token
export const God: React.FC = observer(() => {
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })
  const clickHandler = () => {
    console.log('Click')
  }
  const checkGamesStates = async () => {
    const res = await fetch('/god/check-game-states')
    const json = await res.json()
    setResponse(json)
  }
  const deleteAllGamesStates = async () => {
    const res = await fetch('/god/delete-all-game-states')
    const json = await res.json()
    setResponse(json)
  }
  const checkConnections = async () => {
    const res = await fetch('/god/check-connections')
    const json = await res.json()
    setResponse(json)
  }

  return (
    <>
      <div>
        <h2>GameStates</h2>
        <div>
          <div>
            <label htmlFor="room_id">room_id</label>
          </div>
          <div>
            <input type="text" id="room_id" name="room_id" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="token">token</label>
          </div>
          <div>
            <input type="text" id="token" name="token" />
          </div>
        </div>
        <ul>
          <li onClick={checkGamesStates}>check gamesStates</li>
          <li onClick={clickHandler}>check gameState by room_id</li>
          <li onClick={deleteAllGamesStates}>delete all gameStates</li>
          <li onClick={clickHandler}>delete gameState by room_id</li>
        </ul>
      </div>
      <h2>WS</h2>

      <ul>
        <li onClick={checkConnections}>check connections</li>
        <li onClick={clickHandler}>remove player by token</li>
        <li onClick={clickHandler}>remove all player (drop connection)</li>
        <li onClick={clickHandler}>broadcast to all</li>
        <li onClick={clickHandler}>broadcast to all in room by room_id</li>
        <li onClick={clickHandler}>send message to player by token</li>
      </ul>
      <h2>Meta</h2>
      <ul>
        <li onClick={clickHandler}>list ONUG_* env vars</li>
      </ul>
      <h2>Response</h2>
      <pre>{`${JSON.stringify(response, null, 4)}`}</pre>
    </>
  )
})
