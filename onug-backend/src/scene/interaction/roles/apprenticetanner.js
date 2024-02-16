const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getTannerNumberByRoleIds , getKeys } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const tanner = getTannerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      tanner,
    }
    player.role_history = roleHistory
    
    const apprenticetannerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, apprenticetannerPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, apprenticetannerPlayerNumber)
    const playerCard = player?.card

    if (iSeeMyCardIsFlipped) {
      const positionCard = newGameState.card_positions[apprenticetannerPlayerNumber[0]]
      playerCard.id = positionCard.id
      playerCard.role_id = positionCard.id
      playerCard.role = positionCard.role
      playerCard.team = positionCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }

    role_interactions.push({
      type: INTERACTION,
      title: "APPRENTICE_TANNER",
      token,
      message: "interaction_apprentice_tanner",
      selectable_card_limit: { player: 0, center: 0 },
      tanner,
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })
  
    //TODO save multiple
    newGameState.actual_scene.interaction = `The player ${player.player_number} saw the position(s) of Tanner(s): ${tanner(", ")}`
  })
  
  newGameState.role_interactions = role_interactions

  return newGameState
}
