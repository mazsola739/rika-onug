export const formatPlayerIdentifier = playerNumbers => {
  const formattedPlayerNumbers = [...playerNumbers]

  return formattedPlayerNumbers.map(player => `identifier_${player.replace('_', '')}_text`)
}
