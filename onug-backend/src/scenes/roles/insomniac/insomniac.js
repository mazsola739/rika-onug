import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'

export const insomniac = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_insomniac_kickoff_text'
      : 'insomniac_kickoff_text',
    'insomniac_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 4 || (card.player_role_id === 4 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = insomniacInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const insomniacInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentCard = newGamestate.card_positions[currentPlayerNumber].card

  if (!newGamestate.players[token].shield) {
    newGamestate.players[token].card.player_card_id = currentCard.id
    newGamestate.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [currentPlayerNumber],
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_own_card'],
      icon: title === 'INSOMNIAC' ? 'bear' : 'thumb',
      showCards,
      uniqueInformations: { bear: title === 'INSOMNIAC' ? [currentPlayerNumber] : [], thumb: title === 'SELF_AWARENESS_GIRL' ? [currentPlayerNumber] : [], }
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }
}
