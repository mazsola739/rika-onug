//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getCardIdsByPositions, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const squire = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 83 || (newGameState.players[token].card.player_role_id === 83 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 83 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = squire_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const squire_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    werewolves: werewolves,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_werewolves', "interaction_may_look"],
    icon: 'werewolf',
    uniqInformations: { werewolves: werewolves, answer_options: ["yes", "no"] },
  })
}

export const squire_response = (gameState, token, answer, title) => { //TODO validate answer?
  const newGameState = { ...gameState }
  const scene = []

  let interaction = {}

  if (answer === "yes") {
    const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGameState.players)
    const viewCards = getCardIdsByPositions(newGameState.card_positions, [werewolves])

    if ( werewolves.some(wolf => newGameState.card_positions[wolf].card.id === newGameState.players[token]?.card?.original_id)  ) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      viewed_cards: [werewolves],
    }
  
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_saw_card', werewolves],
      icon: 'werewolves',
      showCards: viewCards,
      uniqInformations: { viewed_cards: [werewolves] },
    })
  } else if (answer === "no") {
    interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_nothing'],
      icon: 'werewolves',
    })
  }

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
