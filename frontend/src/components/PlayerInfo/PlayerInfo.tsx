import { CardImage, TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { PlayerInfoName, PlayerInfoRole, PlayerInfoTeam, StyledPlayerInfo } from './PlayerInfo.styles'
import { PlayerInfoProps } from './PlayerInfo.types'
import { propStore } from 'store'

export const PlayerInfo: React.ComponentType<PlayerInfoProps> = observer(({ card_name, mark, artifact, player }) => {
  const playerNumber = player?.player_number?.replace(/^player_/, '')
  const result = propStore.voteResult.find(p => p.player_number === player.player_number)?.win
  return (
    player && (
      <StyledPlayerInfo result={result}>
        <CardImage image={card_name} size={80} />
        <TokenImage image={playerNumber} size={20} />
        <PlayerInfoName>{player.player_name}</PlayerInfoName>{/* TODO: to long names - solution? */}
        <PlayerInfoRole>{player.player_role}</PlayerInfoRole>{/* TODO: fix player role name (now its all uppercase, and have _) - do i need? name on card already */}
        <PlayerInfoTeam>Team: {player.player_team}</PlayerInfoTeam>
        {mark && <TokenImage image={mark} size={35} />}
        {artifact && <TokenImage image={artifact} size={35} />}
      </StyledPlayerInfo>
    )
  )
})


/* TODO do it with RoleCard?*/