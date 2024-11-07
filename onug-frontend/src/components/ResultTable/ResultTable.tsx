import React from 'react'
import { PlayerName, ResultCell, ResultContainer, ResultHeaderCell, ResultRow, ResultTitle, StyledImage, VoterName, VotersCell } from './ResultTable.styles'
import { gamePropStore, riseAndRestStore } from 'store'
import { Result } from 'types'

export const ResultTable: React.FC = () => {
  const { voteResult, winnerTeams } = gamePropStore

  const sortedVotes = [...voteResult].sort((a, b) => b.voters.length - a.voters.length)

  const isActualPlayerWin = voteResult.find(player => player.player_number === riseAndRestStore.tablePlayerCard.position)?.win

  const groupedVotes: { votes: number; players: Result[] }[] = []

  sortedVotes.forEach(player => {
    const group = groupedVotes.find(g => g.votes === player.voters.length)
    if (group) {
      group.players.push(player)
    } else {
      groupedVotes.push({ votes: player.voters.length, players: [player] })
    }
  })
  console.log(JSON.stringify(riseAndRestStore.tablePlayerCard), isActualPlayerWin)
  //`teamName team {'won'} - You {'won' ? 'won' : 'lost'} the game`
  return (
    <ResultContainer>
      <ResultTitle>{`${winnerTeams.join(', ')} won! - You ${isActualPlayerWin ? 'won' : 'lost'} the game`}</ResultTitle>
      <ResultRow isHeader>
        <ResultHeaderCell isFixedWidth isFixedHeight>
          #
        </ResultHeaderCell>
        <ResultHeaderCell isMaxWidth isFixedHeight>
          Player
        </ResultHeaderCell>
        <ResultHeaderCell isFixedWidth isFixedHeight>
          Votes
        </ResultHeaderCell>
        <ResultHeaderCell isFixedHeight>Voters</ResultHeaderCell>
      </ResultRow>
      <div>
        {groupedVotes.map((group, groupIndex) => {
          const voteImage = groupIndex === 0 ? '/assets/tokens/1st_votes.webp' : groupIndex === 1 ? '/assets/tokens/2nd_votes.webp' : null

          return group.players.map((playerVote, playerIndex) => (
            <ResultRow key={`${groupIndex}-${playerIndex}`}>
              <ResultCell isFixedWidth>{voteImage && <StyledImage src={voteImage} alt="vote token" />}</ResultCell>
              <ResultCell isMaxWidth>
                <PlayerName>
                  {!playerVote.survived ? '💀' : ''}
                  {playerVote.player_number}
                  {playerVote.win ? '🏆' : ''}
                </PlayerName>
              </ResultCell>
              <ResultCell isFixedWidth>{playerVote.voters.length}</ResultCell>
              <VotersCell>
                {playerVote.voters.map((voter, i) => (
                  <VoterName key={i}>
                    {voter}
                    {i < playerVote.voters.length - 1 && ', '}
                  </VoterName>
                ))}
              </VotersCell>
            </ResultRow>
          ))
        })}
      </div>
    </ResultContainer>
  )
}
