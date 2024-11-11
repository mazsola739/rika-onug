import { CardImage, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { PlayerInfoName, PlayerInfoRole, PlayerInfoTeam, StyledPlayerInfo } from './PlayerInfo.styles'
import { PlayerInfoProps } from './PlayerInfo.types'

export const PlayerInfo: React.FC<PlayerInfoProps> = observer(({ card_name, mark, artifact, player }) => {
  const playerNumber = player?.player_number?.replace(/^player_/, '')
  return (
    player && (
      <StyledPlayerInfo>
        <CardImage image={card_name} size={100} />

        <Token tokenName={playerNumber} size={30} />
        <PlayerInfoName>{player.player_name}</PlayerInfoName>

        <PlayerInfoRole>Role: {player.player_role}</PlayerInfoRole>
        <PlayerInfoTeam>Team: {player.player_team}</PlayerInfoTeam>
        {mark && <Token tokenName={mark} size={30} />}
        {artifact && <Token tokenName={artifact} size={30} />}
      </StyledPlayerInfo>
    )
  )
})
