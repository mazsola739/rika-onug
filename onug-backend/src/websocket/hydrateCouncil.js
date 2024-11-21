import { HYDRATE_COUNCIL, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { getTableBoard } from '../utils'
import cardsData from '../data/cards.json'
import artifactsData from '../data/artifacts.json'
import { getKeys, updatePlayerCard } from '../scenes/sceneUtils'

export const hydrateCouncil = async (ws, message) => {
  try {
    logTrace(`hydrate council ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const newGamestate = { ...gamestate, stage: STAGES.COUNCIL }

    updatePlayerCard(newGamestate, token)

    const playerNumber = newGamestate.players[token].player_number

    if (newGamestate.card_positions[playerNumber].mark) {
      const markRoleMap = {
        mark_of_vampire: { role: 'VAMPIRE', team: 'vampire' },
        mark_of_disease: { role: 'DISEASED' },
        mark_of_love: { role: 'LOVER' },
        mark_of_traitor: { role: 'TRAITOR' },
        mark_of_assassin: { role: 'TARGET' }
      }

      if (newGamestate.card_positions[playerNumber].mark === 'mark_of_clarity') {
        const clarityCard = cardsData.find(({ id }) => id === newGamestate.card_positions[playerNumber].card.id)
        if (clarityCard) {
          newGamestate.card_positions[playerNumber].card.role = clarityCard.role
          newGamestate.card_positions[playerNumber].card.team = clarityCard.team
        }
      } else if (markRoleMap[newGamestate.card_positions[playerNumber].mark]) {
        const { role, team } = markRoleMap[newGamestate.card_positions[playerNumber].mark]
        newGamestate.card_positions[playerNumber].card.role = role || newGamestate.card_positions[playerNumber].card.role
        newGamestate.card_positions[playerNumber].card.team = team || newGamestate.card_positions[playerNumber].card.team
      }
    }

    if (newGamestate.card_positions[playerNumber].artifact) {
      const artifactRoleMap = {
        claw_of_the_werewolf: { role: 'WEREWOLF', team: 'werewolf' },
        brand_of_the_villager: { role: 'VILLAGER', team: 'village' },
        cudgel_of_the_tanner: { role: 'TANNER', team: 'tanner' },
        bow_of_the_hunter: { role: 'HUNTER', team: 'village' },
        cloak_of_the_prince: { role: 'PRINCE', team: 'village' },
        sword_of_the_bodyguard: { role: 'BODYGUARD', team: 'village' },
        mist_of_the_vampire: { role: 'VAMPIRE', team: 'vampire' },
        dagger_of_the_traitor: { role: 'TRAITOR' },
        alien_artifact: { role: 'ALIEN', team: 'alien' }
      }

      const artifact = artifactsData.find(artifact => artifact.id === newGamestate.card_positions[playerNumber].artifact)
      if (artifactRoleMap[artifact.token_name]) {
        const { role, team } = artifactRoleMap[artifact.token_name]
        newGamestate.card_positions[playerNumber].card.role = role || newGamestate.card_positions[playerNumber].card.role
        newGamestate.card_positions[playerNumber].card.team = team || newGamestate.card_positions[playerNumber].card.team
      }
      newGamestate.players[token].card.player_role = newGamestate.card_positions[playerNumber].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[playerNumber].card.team
      newGamestate.players[token].card.player_artifact = newGamestate.card_positions[playerNumber].artifact
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
        narrations: newGamestate.narration,
        action: {
          artifacted_cards: getKeys(gamestate.artifact),
          shielded_cards: newGamestate.shield,
          show_cards: newGamestate.flipped
        }
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
