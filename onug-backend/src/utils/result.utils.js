import cardsData from '../data/cards.json'

export const assignRoleFromMark = (mark, card) => {
  const markRoleMap = {
    mark_of_vampire: { role: 'VAMPIRE', team: 'vampire' },
    mark_of_disease: { role: 'DISEASED' },
    mark_of_love: { role: 'LOVER' },
    mark_of_traitor: { role: 'TRAITOR' },
    mark_of_assassin: { role: 'TARGET' }
  }

  if (mark === 'mark_of_clarity') {
    const clarityCard = cardsData.find(({ id }) => id === card.id)
    return clarityCard ? { role: clarityCard.role, team: clarityCard.team } : {}
  }

  return markRoleMap[mark] || { role: card.role, team: card.team }
}

export const assignRoleFromArtifact = artifact => {
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
  return artifactRoleMap[artifact.token_name] || {}
}

export const updatePlayerRoleFromMark = (player, card, mark) => {
  const { role, team } = assignRoleFromMark(mark, card)
  player.card.player_role = role
  player.card.player_team = team
}

export const getPlayerInfo = player => ({
  playeformatPlayerInfor_name: player.name,
  player_number: player.player_number,
  player_card_id: player.card.player_card_id,
  player_role: player.card.player_role,
  player_team: player.card.player_team,
  player_mark: player.card.player_mark
})
