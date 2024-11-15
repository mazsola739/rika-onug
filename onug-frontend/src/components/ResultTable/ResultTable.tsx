import React from 'react'
import { propStore, riseAndRestStore } from 'store'
import { Result } from 'types'
import { Cell, CellHeader, PlayerName, Rank, Row, StyledResultTable, TableTitle, VoterName, VotersCell } from './ResultTable.styles'
import { observer } from 'mobx-react-lite'

export const ResultTable: React.FC = observer(() => {
  const sortedVotes = [...propStore.voteResult].sort((a, b) => b.voters.length - a.voters.length)

  const isActualPlayerWin = sortedVotes.find(player => player.player_number === riseAndRestStore.tablePlayerCard.position)?.win

  const groupedVotes: { votes: number; players: Result[] }[] = []

  sortedVotes.forEach(player => {
    const group = groupedVotes.find(g => g.votes === player.voters.length)
    if (group) {
      group.players.push(player)
    } else {
      groupedVotes.push({ votes: player.voters.length, players: [player] })
    }
  })

  const winners = (propStore.winnerTeams.length > 0 ? propStore.winnerTeams.join(', ') : 'None') + ' won!';
  const losers = (propStore.loserTeams.length > 0 ? propStore.loserTeams.join(', ') : 'None') + ' lost!';
  

  //`teamName team {'won'} - You {'won' ? 'won' : 'lost'} the game`
  return (
    <StyledResultTable>
      <TableTitle>{`${winners} ${losers}`}</TableTitle>
      <Row isHeader>
        <CellHeader isFixedWidth isFixedHeight>
          #
        </CellHeader>
        <CellHeader isMaxWidth isFixedHeight>
          Player
        </CellHeader>
        <CellHeader isFixedWidth isFixedHeight>
          Votes
        </CellHeader>
        <CellHeader isFixedHeight>Voters</CellHeader>
      </Row>
      <div>
        {groupedVotes.map((group, groupIndex) => {
          const voteImage = groupIndex === 0 ? '/assets/tokens/1st_votes.webp' : groupIndex === 1 ? '/assets/tokens/2nd_votes.webp' : null

          return group.players.map((playerVote, playerIndex) => (
            <Row key={`${groupIndex}-${playerIndex}`}>
              <Cell isFixedWidth>{voteImage && <Rank src={voteImage} alt="vote token" />}</Cell>
              <Cell isMaxWidth>
                <PlayerName>
                  {!playerVote.survived ? '💀 ' : ''}
                  {playerVote.win ? '🏆 ' : ''}
                  {playerVote.player_number}
                </PlayerName>
              </Cell>
              <Cell isFixedWidth>{playerVote.voters.length}</Cell>
              <VotersCell>
                {playerVote.voters.map((voter, i) => (
                  <VoterName key={i}>
                    {voter}
                    {i < playerVote.voters.length - 1 && ', '}
                  </VoterName>
                ))}
              </VotersCell>
            </Row>
          ))
        })}
      </div>
    </StyledResultTable>
  )
})
