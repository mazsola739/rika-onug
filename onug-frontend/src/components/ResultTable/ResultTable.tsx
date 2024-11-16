import { observer } from 'mobx-react-lite'
import React from 'react'
import { playersStore, propStore } from 'store'
import { Result } from 'types'
import { Cell, CellHeader, Icon, Name, PlayerName, Rank, Row, StyledResultTable, TableTitle, VoterName, VotersCell } from './ResultTable.styles'

export const ResultTable: React.FC = observer(() => {
  const { player } = playersStore
  const sortedVotes = [...propStore.voteResult].sort((a, b) => b.voters.length - a.voters.length)
  const groupedVotes: { votes: number; players: Result[] }[] = []

  sortedVotes.forEach(player => {
    const group = groupedVotes.find(g => g.votes === player.voters.length)
    if (group) {
      group.players.push(player)
    } else {
      groupedVotes.push({ votes: player.voters.length, players: [player] })
    }
  })

  const yourResult = propStore.voteResult.find(p => p.player_number === player.player_number)?.win

  return (
    <StyledResultTable>
      <TableTitle yourResult={yourResult}>{`The night ${yourResult ? "couldn't stop you... Well done!" : 'has got you... Game over!'}`}</TableTitle>
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
              <Cell isFixedWidth>
                <Icon>
                  {playerVote.win ? '🏆 ' : ''}
                  {!playerVote.survived ? '💀 ' : ''}
                </Icon>
              </Cell>
              <Cell isMaxWidth>
                <PlayerName>
                  {voteImage && <Rank src={voteImage} alt="vote token" />}
                  <Name>{playerVote.name}</Name>
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
