import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getSelectablePlayersWithNoArtifact, getRandomArtifact, getPlayerTokensByPlayerNumber, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const curator = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'curator_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'curator') {
      if (card.player_original_id === 20 || (card.player_role_id === 20 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = curator_interaction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_curator') {
      if (card.player_role_id === 20 && card.player_original_id === 1) {
        interaction = curator_interaction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const curator_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)
  const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGamestate.artifact)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any'],
    icon: 'artifacted',
    selectableCards: { selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const curator_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const newArtifact = getRandomArtifact(newGamestate.artifact)
  const artifactedPlayersToken = getPlayerTokensByPlayerNumber(newGamestate.players, selected_card_positions[0])

  if (artifactedPlayersToken) {
    newGamestate.artifact.push({ [selected_card_positions[0]]: newArtifact })
    newGamestate.players[artifactedPlayersToken[0]].artifact = true
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    new_artifact_card: selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_placed_artifact', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'artifacted',
    uniqueInformations: { artifacted: selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
