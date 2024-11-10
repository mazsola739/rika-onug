import { PlayerInfo } from 'components'
import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { getArtifactById, getCardById } from 'utils'
import { StyledPlayerInfoList } from './PlayerInfoList.styles'

export const PlayerInfoList: React.FC = observer(() => {
  const players = voteStore.resultPlayers

  return (
    <StyledPlayerInfoList>
      {players.map((player) => {
        const card = getCardById(player.player_card_id)
        const artifact = getArtifactById(player.player_artifact)
        const artifactName = artifact ? artifact.token_name : '' 

        return (
          <PlayerInfo
            key={player.player_number} 
            card_name={card?.card_name || 'Unknown Card'} 
            mark={player.player_mark}
            artifact={artifactName}
            player={player}
          />
        )
      })}
    </StyledPlayerInfoList>
  )
})
