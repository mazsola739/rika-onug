import { WEREVOLVES, ALL_COPY_PLAYER_IDS, SCENE, CENTER_CARD_POSITIONS } from '../../../constants'
import { getAllPlayerTokens, getWerewolfPlayerNumbersByRoleIds, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

export const werewolves = (gamestate, title, hasDreamWolf) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDreamWolf
      ? 'werewolves_dreamwolf_kickoff_text'
      : 'werewolves_kickoff_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (WEREVOLVES.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = werewolvesInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const werewolvesInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGamestate.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGamestate.players)
  const loneWolf = werewolves.length + dreamwolf.length === 1

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: loneWolf ? CENTER_CARD_POSITIONS : [], selectable_card_limit: { player: 0, center: 1 },
    werewolves,
    dreamwolf,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
    icon: loneWolf ? 'lonely' : 'werewolf',
    selectableCards: { selectable_cards: loneWolf ? CENTER_CARD_POSITIONS : [], selectable_card_limit: { player: 0, center: 1 } },
    uniqueInformations: { werewolves, dreamwolf },
  })
}

export const werewolvesResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

  if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'lonely',
    showCards,
    uniqueInformations: { lonely: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })

  newGamestate.scene = scene

  return newGamestate
}
