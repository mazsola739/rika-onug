import { getPlayerNumberWithMatchingToken } from '../scenes/sceneUtils'
import cardsData from '../data/cards.json'
import artifactsData from '../data/artifacts.json'

export const isPlayersCardsFlipped = (flippedCards, playerCardId) => {
  return flippedCards.some(obj => {
    const key = Object.keys(obj)[0]
    return obj[key] === playerCardId
  })
}

export const isActivePlayersCardsFlipped = (flippedCards, playersPosition) => flippedCards.some(obj => Object.keys(obj)[0] === playersPosition)

export const getKeys = array => array.map(obj => Object.keys(obj)[0])

//TODO groob team and zerb team if alone - then alien
//TODO refactor for better solution
export const updatePlayer = (gamestate, token) => {
  let newPlayers = { ...gamestate.players }
  let newPositions = { ...gamestate.positions }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newPlayers, token)
  const flippedCards = newPositions.flipped_cards

  const playerCard = newPlayers[token].card
  const currentCard = newPositions.card_positions[currentPlayerNumber]?.card

  if (!playerCard || !currentCard) return gamestate

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, playerCard.player_card_id)

  if (iSeeMyCardIsFlipped) {
    newPlayers[token].card.player_card_id = currentCard.id
    newPlayers[token].card.player_role = currentCard.role
    newPlayers[token].card.player_team = currentCard.team
  }

  if (iSeeMyCardElsewhere) {
    newPlayers[token].card.player_card_id = 87
  }

  if (newPositions.card_positions[currentPlayerNumber]?.mark) {
    const markRoleMap = {
      mark_of_vampire: { role: 'VAMPIRE', team: 'vampire' },
      mark_of_disease: { role: 'DISEASED' },
      mark_of_love: { role: 'LOVER' },
      mark_of_traitor: { role: 'TRAITOR' },
      mark_of_assassin: { role: 'TARGET' }
    }

    if (newPositions.card_positions[currentPlayerNumber].mark === 'mark_of_clarity') {
      const clarityCard = cardsData.find(({ id }) => id === newPositions.card_positions[currentPlayerNumber].card.id)
      if (clarityCard) {
        newPositions.card_positions[currentPlayerNumber].card.role = clarityCard.role
        newPositions.card_positions[currentPlayerNumber].card.team = clarityCard.team
      }
    } else if (markRoleMap[newPositions.card_positions[currentPlayerNumber].mark]) {
      const { role, team } = markRoleMap[newPositions.card_positions[currentPlayerNumber].mark]
      newPositions.card_positions[currentPlayerNumber].card.role = role || newPositions.card_positions[currentPlayerNumber].card.role
      newPositions.card_positions[currentPlayerNumber].card.team = team || newPositions.card_positions[currentPlayerNumber].card.team
    }
  }

  if (newPositions.card_positions[currentPlayerNumber]?.artifact) {
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

    const artifact = artifactsData.find(artifact => artifact.id === newPositions.card_positions[currentPlayerNumber]?.artifact)
    if (artifactRoleMap[artifact?.token_name]) {
      const { role, team } = artifactRoleMap[artifact.token_name]
      newPositions.card_positions[currentPlayerNumber].card.role = role || newPositions.card_positions[currentPlayerNumber].card.role
      newPositions.card_positions[currentPlayerNumber].card.team = team || newPositions.card_positions[currentPlayerNumber].card.team
    }
    newPlayers[token].card.player_role = newPositions.card_positions[currentPlayerNumber].card.role
    newPlayers[token].card.player_team = newPositions.card_positions[currentPlayerNumber].card.team
    newPlayers[token].card.player_artifact = newPositions.card_positions[currentPlayerNumber].artifact
  }

  const newGamestate = {
    ...gamestate,
    players: newPlayers,
    positions: newPositions
  }

  return newGamestate
}

export const getKnownPlayer = (newGamestate, token) => {
  return {
    player_name: newGamestate.players[token].name,
    player_number: newGamestate.players[token].player_number,
    player_card_id: newGamestate.players[token].card.player_card_id,
    player_role: newGamestate.players[token].card.player_role,
    player_team: newGamestate.players[token].card.player_team,
    player_mark: newGamestate.players[token].card.player_mark,
    player_artifact: newGamestate.players[token].card.player_artifact
  }
}
