import { CENTER_CARD_POSITIONS, SCENE } from "../../../constants"
import { getPlayerNumberWithMatchingToken, getCardIdsByPositions, getRandomNumber, formatPlayerIdentifier, generateRoleInteraction } from "../../sceneUtils"

export const oracleAnswerAftermath = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    const scene = []
  
    const oracleQuestion = newGamestate.oracle.question
    const oracleAnswer = newGamestate.oracle.answer
    const oracleAftermath = newGamestate.oracle.aftermath
  
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
    const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
  
    let showCards = []
    let limit = 0
    let privateMessage = []
    
    switch (oracleQuestion) {
      case 'oracle_guessnumber_text':
        if (oracleAftermath.includes('success')) {
          newGamestate.oracle_eyes_open = true
          privateMessage = ['interaction_oracle_open_you_eyes']
        } else {
          newGamestate.oracle_target = true
  
          newGamestate.players[token].card.player_team = 'oracle'
          currentPlayerCard.team = 'oracle'
          privateMessage = ['interaction_oracle_team']
        }
        break
      case 'oracle_viewplayer_text':
        newGamestate.players[token].card_or_mark_action = true
  
        if (oracleAftermath.includes('yes')) {
          showCards = getCardIdsByPositions(newGamestate.card_positions, [`player_${oracleAnswer}`])
        } else {
          const randomPlayerNumber = getRandomNumber(1, newGamestate.total_players)
          showCards = getCardIdsByPositions(newGamestate.card_positions, [`player_${randomPlayerNumber}`])
        }
  
        privateMessage = ['interaction_selected_card', formatPlayerIdentifier(showCards)]
        break
      case 'oracle_alienteam_text':
        if (!oracleAftermath.includes('teamswitch_yes')) {
          newGamestate.players[token].card.player_team = 'alien'
          privateMessage = ['interaction_alien_team']
          if (oracleAftermath.includes('yes2')) {
            newGamestate.players[token].card.player_role = 'ALIEN'
            currentPlayerCard.role = 'ALIEN'
            currentPlayerCard.team = 'alien'
            privateMessage = ['interaction_alien_role']
          }
        } else {
          privateMessage = ['interaction_stay_oracle']
        }
        break
      case 'oracle_werewolfteam_text':
        if (!oracleAftermath.includes('teamswitch_yes')) {
          newGamestate.players[token].card.player_team = 'werewolf'
          currentPlayerCard.team = 'werewolf'
          privateMessage = ['interaction_werewolf_team']
        } else {
          privateMessage = ['interaction_stay_oracle']
        }
        break
      case 'oracle_vampireteam_text':
        if (!oracleAftermath.includes('teamswitch_yes')) {
          newGamestate.players[token].card.player_team = 'vampire'
          currentPlayerCard.team = 'vampire'
          privateMessage = ['interaction_vampire_team']
        } else {
          privateMessage = ['interaction_stay_oracle']
        }
        break
      case 'oracle_centerexchange_text':
        if (!oracleAftermath.includes('yes2')) {
          limit = 1
          privateMessage = ['interaction_must_one_center']
        } else {
          privateMessage = ['interaction_stay_oracle']
        }
        break
      case 'oracle_viewcenter_text':
        if (oracleAftermath.includes('yes1')) {
          limit = 1
          privateMessage = ['interaction_must_one_center']
        } else if (oracleAftermath.includes('yes2')) {
          limit = 2
          privateMessage = ['interaction_must_two_center']
        } else if (oracleAftermath.includes('yes3')) {
          limit = 3
          privateMessage = ['interaction_must_three_center']
        }
        break
    }
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: showCards,
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit } },
      uniqueInformations: { oracle: showCards },
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: privateMessage,
      icon: 'oracle',
      showCards,
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: limit } },
      uniqueInformations: { oracle: showCards },
    })
  
    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }