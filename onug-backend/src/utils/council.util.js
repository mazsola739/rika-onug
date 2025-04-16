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
  let newGamestate = { ...gamestate }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const flippedCards = newGamestate.flipped_cards

  const playerCard = newGamestate.players[token].card
  const currentCard = newGamestate.card_positions[currentPlayerNumber]?.card

  if (!playerCard || !currentCard) return newGamestate

  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, playerCard.player_card_id)

  if (iSeeMyCardIsFlipped) {
    newGamestate.players[token].card.player_card_id = currentCard.id
    newGamestate.players[token].card.player_role = currentCard.role
    newGamestate.players[token].card.player_team = currentCard.team
  }

  if (iSeeMyCardElsewhere) {
    newGamestate.players[token].card.player_card_id = 87
  }

  if (newGamestate.card_positions[currentPlayerNumber]?.mark) {
    const markRoleMap = {
      mark_of_vampire: { role: 'VAMPIRE', team: 'vampire' },
      mark_of_disease: { role: 'DISEASED' },
      mark_of_love: { role: 'LOVER' },
      mark_of_traitor: { role: 'TRAITOR' },
      mark_of_assassin: { role: 'TARGET' }
    }

    if (newGamestate.card_positions[currentPlayerNumber].mark === 'mark_of_clarity') {
      const clarityCard = cardsData.find(({ id }) => id === newGamestate.card_positions[currentPlayerNumber].card.id)
      if (clarityCard) {
        newGamestate.card_positions[currentPlayerNumber].card.role = clarityCard.role
        newGamestate.card_positions[currentPlayerNumber].card.team = clarityCard.team
      }
    } else if (markRoleMap[newGamestate.card_positions[currentPlayerNumber].mark]) {
      const { role, team } = markRoleMap[newGamestate.card_positions[currentPlayerNumber].mark]
      newGamestate.card_positions[currentPlayerNumber].card.role = role || newGamestate.card_positions[currentPlayerNumber].card.role
      newGamestate.card_positions[currentPlayerNumber].card.team = team || newGamestate.card_positions[currentPlayerNumber].card.team
    }
  }

  if (newGamestate.card_positions[currentPlayerNumber]?.artifact) {
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

    const artifact = artifactsData.find(artifact => artifact.id === newGamestate.card_positions[currentPlayerNumber]?.artifact)
    if (artifactRoleMap[artifact?.token_name]) {
      const { role, team } = artifactRoleMap[artifact.token_name]
      newGamestate.card_positions[currentPlayerNumber].card.role = role || newGamestate.card_positions[currentPlayerNumber].card.role
      newGamestate.card_positions[currentPlayerNumber].card.team = team || newGamestate.card_positions[currentPlayerNumber].card.team
    }
    newGamestate.players[token].card.player_role = newGamestate.card_positions[currentPlayerNumber].card.role
    newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
    newGamestate.players[token].card.player_artifact = newGamestate.card_positions[currentPlayerNumber].artifact
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
