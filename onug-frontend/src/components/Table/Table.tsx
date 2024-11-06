import React from 'react'
import { TableContainer, TableTitle, TableRow, TableHeaderCell, TableCell, PlayerName, VotersCell, VoterName, StyledImage } from './Table.styles'

const playerVotes = [
  {
    playerName: 'nene',
    votes: 2,
    voters: [{ name: 'dgdsgsdfsd' }, { name: 'Rika' }]
  },
  {
    playerName: 'Rika',
    votes: 1,
    voters: [{ name: 'nene' }]
  },
  {
    playerName: 'dgdsgsdfsd',
    votes: 0,
    voters: []
  }
]

interface Voter {
  name: string
}

interface PlayerVotes {
  playerName: string
  votes: number
  voters: Voter[]
}

interface TableProps {
  playerVotes: PlayerVotes[]
}

export const Table: React.FC<TableProps> = () => {
  // Sort the players based on the number of votes (descending order)
  const sortedVotes = [...playerVotes].sort((a, b) => b.votes - a.votes)

  // Group players with the same number of votes
  const groupedVotes: { votes: number; players: PlayerVotes[] }[] = []

  sortedVotes.forEach(player => {
    const group = groupedVotes.find(g => g.votes === player.votes)
    if (group) {
      group.players.push(player)
    } else {
      groupedVotes.push({ votes: player.votes, players: [player] })
    }
  })

  //`teamName team {'won'} - You {'won' ? 'won' : 'lost'} the game`
  return (
    <TableContainer>
      <TableTitle>{`Team won! - You lost the game`}</TableTitle>
      {/* Div-based table layout */}
      <TableRow isHeader>
        <TableHeaderCell isFixedWidth isFixedHeight>
          #
        </TableHeaderCell>
        <TableHeaderCell isMaxWidth isFixedHeight>
          Player
        </TableHeaderCell>
        <TableHeaderCell isFixedWidth isFixedHeight>
          Votes
        </TableHeaderCell>
        <TableHeaderCell isFixedHeight>Voters</TableHeaderCell>
      </TableRow>
      <div>
        {groupedVotes.map((group, groupIndex) => {
          const voteImage = groupIndex === 0 ? '/assets/tokens/1st_votes.webp' : groupIndex === 1 ? '/assets/tokens/2nd_votes.webp' : null

          return group.players.map((playerVote, playerIndex) => (
            <TableRow key={`${groupIndex}-${playerIndex}`}>
              <TableCell isFixedWidth>{voteImage && <StyledImage src={voteImage} alt="vote token" />}</TableCell>
              <TableCell isMaxWidth>
                <PlayerName>{playerVote.playerName}</PlayerName>
              </TableCell>
              <TableCell isFixedWidth>{playerVote.votes}</TableCell>
              <VotersCell>
                {playerVote.voters.map((voter, i) => (
                  <VoterName key={i}>
                    {voter.name}
                    {i < playerVote.voters.length - 1 && ', '}
                  </VoterName>
                ))}
              </VotersCell>
            </TableRow>
          ))
        })}
      </div>
    </TableContainer>
  )
}
