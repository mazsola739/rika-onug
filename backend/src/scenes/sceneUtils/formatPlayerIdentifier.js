export const formatPlayerIdentifier = playerNumbers => playerNumbers.map(player => `identifier_${player.replace('_', '')}`)
