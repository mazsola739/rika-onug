//@ts-check
import { allCopyPlayerIds, SCENE, goodGuyIds } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const nostradamus = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['nostradamus_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 80 || (card.player_role_id === 80 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = nostradamus_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const nostradamus_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_three_any'],
    icon: 'nostradamus',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 } },
  })
}

export const nostradamus_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const selectedCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  let showCards = []

  if (goodGuyIds.includes(playerOneCardId)) {
    if (!goodGuyIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0], selectedCards[1]]
      newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[1]].card.role
      newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[1]].card.team
    } else if (goodGuyIds.includes(playerTwoCardId)) {
      if (!goodGuyIds.includes(playerThreeCardId)) {
        showCards = selectedCards
        newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[2]].card.role
        newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[2]].card.team
      } else {
        showCards = selectedCards
        newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[2]].card.team
        if (newGameState.players[token].card.player_original_id === playerOneCardId || newGameState.players[token].card.player_original_id === playerTwoCardId || newGameState.players[token].card.player_original_id === playerThreeCardId) {
          newGameState.players[token].card.player_card_id = 0
        }
      }
    }
  } else if (!goodGuyIds.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]
    newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[0]].card.role
    newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[0]].card.team
  }

  newGameState.players[token].card_or_mark_action = true
  newGameState.nostradamus_team = newGameState.players[token].card.player_team //TODO better method to get nostradamus team!

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message : [
      'interaction_saw_card',
      selected_card_positions[0],
      showCards.length >= 2 ? selected_card_positions[1] : '',
      showCards.length === 3 ? selected_card_positions[2] : ''
    ],
    icon: 'investigator',
    showCards: showCards,
    uniqInformations: { viewed_cards: showCards.length === 3 ? selected_card_positions.slice(0, 3) : showCards.length === 2 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

/* 
newGameState.nostradamus_team = ?
export const nostradamus_team_alien_text = 'Alien team.'
export const nostradamus_team_werewolf_text = 'Werewolf team;'
export const nostradamus_team_vampire_text = 'Vampire team.'
export const nostradamus_team_villain_text = 'Villain team.'
export const nostradamus_team_villager_text = 'Villager team.'
export const nostradamus_team_hero_text = 'Hero team.'
export const nostradamus_team_assassin_text = 'Assassin team.'
export const nostradamus_team_apprenticeassassin_text = 'Apprentice Assassin team.'
export const nostradamus_team_tanner_text = 'Tanner team.'
export const nostradamus_team_synthetic_text = 'Synthetic team.'
export const nostradamus_team_blob_text = 'Blob team.'
export const nostradamus_team_family_text = 'Family team.'
export const nostradamus_team_mortician_text = 'Mortician team.'
export const nostradamus_team_mad_text = 'Mad team.'
export const nostradamus_team_doppelganger_text = 'Doppelganger team.'
*/

export const nostradamus_reaction = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const nostradamusTeam = newGameState.nostradamus_team
  const narration = [
    'nostradamus_teamstart_text',
    `nostradamus_team_${nostradamusTeam}_text`,
  ]

  tokens.forEach((token) => {

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
    })
  })

  newGameState.scene = scene
  return newGameState
}
