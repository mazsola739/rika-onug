import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getWerewolfAndDreamwolfPlayerNumbersByRoleIds, getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateAnswerSelection } from '../../validators/validateAnswerSelection'

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (IDS.ALL_WEREWOLF_IDS.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}


export const squire = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 83 || (card.player_role_id === 27 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = squireInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const squireInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'squire'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    werewolves,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_werewolves', 'interaction_may_look'],
    icon: 'werewolf',
    uniqueInformations: { werewolves, answer_options: ['yes', 'no'] },
  })
}

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  let interaction = {}

  if (selected_answer === 'yes') {
    const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)
    const viewCards = getCardIdsByPositions(newGamestate.card_positions, werewolves)

    if ( werewolves.some(wolf => newGamestate.card_positions[wolf].card.id === newGamestate.players[token]?.card?.original_id)  ) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
      viewed_cards: werewolves,
    }

    const messageIdentifiers = formatPlayerIdentifier(werewolves)
  
    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      icon: 'werewolves',
      showCards: viewCards,
      uniqueInformations: { werewolves },
    })
  } else if (selected_answer === 'no') {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
    }

    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_nothing'],
      icon: 'werewolves',
    })
  }

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
