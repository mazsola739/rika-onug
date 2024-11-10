import { HYDRATE_COUNCIL, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import artifactData from '../data/artifacts.json'
import { getTableBoard } from '../utils'

export const hydrateCouncil = async (ws, message) => {
  try {
    logTrace(`hydrate council ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const newGamestate = { ...gamestate, stage: STAGES.COUNCIL }
    const playerNumber = newGamestate.players[token].player_number

    const players = getTableBoard(newGamestate)

    const guess_cards = [...newGamestate.selected_cards]
    const playerArtifact = newGamestate.artifact.find(artifactEntry => Object.keys(artifactEntry)[0] === playerNumber)

    if (playerArtifact) {
      const artifactType = artifactData.find(entry => entry.id === newGamestate.players[token].card.player_artifact).token_name

      switch (artifactType) {
        case 'claw_of_the_werewolf':
          newGamestate.players[token].card.player_role = 'WEREWOLF'
          newGamestate.players[token].card.player_team = 'werewolf'
          newGamestate.card_positions[playerNumber].card.role = 'WEREWOLF'
          newGamestate.card_positions[playerNumber].card.team = 'werewolf'
          await upsertRoomState(newGamestate)
          break

        case 'brand_of_the_villager':
          newGamestate.players[token].card.player_role = 'VILLAGER'
          newGamestate.players[token].card.player_team = 'village'
          newGamestate.card_positions[playerNumber].card.role = 'VILLAGER'
          newGamestate.card_positions[playerNumber].card.team = 'village'
          await upsertRoomState(newGamestate)
          break

        case 'cudgel_of_the_tanner':
          newGamestate.players[token].card.player_role = 'TANNER'
          newGamestate.players[token].card.player_team = 'tanner'
          newGamestate.card_positions[playerNumber].card.role = 'TANNER'
          newGamestate.card_positions[playerNumber].card.team = 'tanner'
          await upsertRoomState(newGamestate)
          break

        case 'mask_of_muting':
          newGamestate.players[token].no_talk = true
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
              narrations: newGamestate.narration,
              no_talk: true
            })
          )

        case 'shroud_of_shame':
          newGamestate.players[token].shame = true
          await upsertRoomState(newGamestate)
          return ws.send(
            JSON.stringify({
              type: HYDRATE_COUNCIL,
              success: true,
              player: {
                player_name: newGamestate.players[token].name,
                player_number: newGamestate.players[token].player_number,
                player_artifact: newGamestate.players[token].card.player_artifact
              },
              shame: true
            })
          )

        case 'bow_of_the_hunter':
          newGamestate.players[token].card.player_role = 'HUNTER'
          newGamestate.players[token].card.player_team = 'village'
          newGamestate.card_positions[playerNumber].card.role = 'HUNTER'
          newGamestate.card_positions[playerNumber].card.team = 'village'
          await upsertRoomState(newGamestate)
          break

        case 'cloak_of_the_prince':
          newGamestate.players[token].card.player_role = 'PRINCE'
          newGamestate.players[token].card.player_team = 'village'
          newGamestate.card_positions[playerNumber].card.role = 'PRINCE'
          newGamestate.card_positions[playerNumber].card.team = 'village'
          await upsertRoomState(newGamestate)
          break

        case 'sword_of_the_bodyguard':
          newGamestate.players[token].card.player_role = 'BODYGUARD'
          newGamestate.players[token].card.player_team = 'village'
          newGamestate.card_positions[playerNumber].card.role = 'BODYGUARD'
          newGamestate.card_positions[playerNumber].card.team = 'village'
          await upsertRoomState(newGamestate)
          break

        case 'mist_of_the_vampire':
          newGamestate.players[token].card.player_role = 'VAMPIRE'
          newGamestate.players[token].card.player_team = 'vampire'
          newGamestate.card_positions[playerNumber].card.role = 'VAMPIRE'
          newGamestate.card_positions[playerNumber].card.team = 'vampire'
          await upsertRoomState(newGamestate)
          break

        case 'dagger_of_the_traitor':
          newGamestate.players[token].card.player_role = 'TRAITOR'
          newGamestate.card_positions[playerNumber].card.role = 'TRAITOR'
          await upsertRoomState(newGamestate)
          break

        case 'alien_artifact':
          newGamestate.players[token].card.player_role = 'ALIEN'
          newGamestate.players[token].card.player_team = 'alien'
          newGamestate.card_positions[playerNumber].card.role = 'ALIEN'
          newGamestate.card_positions[playerNumber].card.team = 'alien'
          await upsertRoomState(newGamestate)
          break
      }
    }

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
