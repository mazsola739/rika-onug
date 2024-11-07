import artifacts from '../../../data/artifacts.json'

export const getSelectablePlayersWithNoArtifact = (players, artifactedCards) => players.filter(player => !artifactedCards.includes(player))

export const getRandomArtifact = playerArtifacts => {
  const assignedArtifacts = playerArtifacts.map(obj => Object.values(obj)[0])
  const availableArtifacts = artifacts.filter(artifact => !assignedArtifacts.includes(artifact.id))
  const randomIndex = Math.floor(Math.random() * availableArtifacts.length)

  return availableArtifacts[randomIndex].id
}
