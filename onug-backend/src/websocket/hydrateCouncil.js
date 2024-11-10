import { HYDRATE_COUNCIL, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { assignRoleFromArtifact, assignRoleFromMark, getTableBoard, updatePlayerRoleAndTeam } from '../utils'

export const hydrateCouncil = async (ws, message) => {
  try {
    logTrace(`hydrate council ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const newGamestate = { ...gamestate, stage: STAGES.COUNCIL }
    const playerNumber = newGamestate.players[token].player_number
    const playerArtifact = newGamestate.card_positions[playerNumber].artifact
    const playerMark = newGamestate.card_positions[playerNumber].mark
    const playerCard = newGamestate.card_positions[playerNumber].card

    if (playerMark) {
      assignRoleFromMark(playerMark, playerCard)
    }

    if (playerArtifact) {
      assignRoleFromArtifact(playerArtifact, playerCard)
      updatePlayerRoleAndTeam(playerCard, newGamestate.players[token])
    }

    const players = getTableBoard(newGamestate)
    const guess_cards = [...newGamestate.selected_cards]

    await upsertRoomState(newGamestate)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: true,
        guess_cards,
        player: {
          player_name: newGamestate.players[token].name,
          player_number: newGamestate.players[token].player_number,
          player_card_id: newGamestate.players[token].card.player_card_id,
          player_role: newGamestate.players[token].card.player_role,
          player_team: newGamestate.players[token].card.player_team,
          player_mark: newGamestate.players[token].card.player_mark,
          player_artifact: newGamestate.players[token].card.player_artifact
        },
        players,
        artifact: Object.keys(newGamestate.artifact),
        shield: newGamestate.shield,
        narrations: newGamestate.narration
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
