import { Title } from 'typography'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { playersStore, propStore } from 'store'
import { ResultType } from 'types'
import { ResultTableCell, CellHeader, Icon, Name, PlayerName, Rank, ResultTableRow, StyledResultTable, VoterName, VotersCell } from './ResultTable.styles'

export const ResultTable: React.ComponentType = observer(() => {
  const { player } = playersStore
  const sortedVotes = [...propStore.voteResult].sort((a, b) => b.voters.length - a.voters.length)
  const groupedVotes: { votes: number; players: ResultType[] }[] = []

  sortedVotes.forEach(player => {
    const group = groupedVotes.find(g => g.votes === player.voters.length)
    if (group) {
      group.players.push(player)
    } else {
      groupedVotes.push({ votes: player.voters.length, players: [player] })
    }
  })

  const yourResult = propStore.voteResult.find(p => p.player_number === player.player_number)?.win
  const title = `THE NIGHT ${yourResult ? "COULDN'T STOP YOU... WELL DONE!" : 'HAS GOT YOU... GAME OVER!'}`

  return (
    <StyledResultTable>
      <Title yourResult={yourResult} title={title} />
      <ResultTableRow isHeader>
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
      </ResultTableRow>
      <div>
        {groupedVotes.map((group, groupIndex) => {
          const voteImage = groupIndex === 0 ? '/assets/tokens/1st_votes.webp' : groupIndex === 1 ? '/assets/tokens/2nd_votes.webp' : null

          return group.players.map((playerVote, playerIndex) => (
            <ResultTableRow key={`${groupIndex}-${playerIndex}`}>
              <ResultTableCell isFixedWidth>
                <Icon>
                  {playerVote.win ? '🏆 ' : ''}
                  {!playerVote.survived ? '💀 ' : ''}
                </Icon>
              </ResultTableCell>
              <ResultTableCell isMaxWidth>
                <PlayerName>
                  {voteImage && <Rank src={voteImage} alt='vote token' />}
                  <Name>{playerVote.name}</Name>
                </PlayerName>
              </ResultTableCell>
              <ResultTableCell isFixedWidth>{playerVote.voters.length}</ResultTableCell>
              <VotersCell>
                {playerVote.voters.map((voter, i) => (
                  <VoterName key={i}>
                    {voter}
                    {i < playerVote.voters.length - 1 && ', '}
                  </VoterName>
                ))}
              </VotersCell>
            </ResultTableRow>
          ))
        })}
      </div>
    </StyledResultTable>
  )
})
