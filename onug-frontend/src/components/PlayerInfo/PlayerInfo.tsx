import { CardImage, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { PlayerInfoName, PlayerInfoRole, PlayerInfoTeam, StyledPlayerInfo } from './PlayerInfo.styles'
import { PlayerInfoProps } from './PlayerInfo.types'
import { propStore } from 'store'

export const PlayerInfo: React.FC<PlayerInfoProps> = observer(({ card_name, mark, artifact, player }) => {
  const playerNumber = player?.player_number?.replace(/^player_/, '')
  const result = propStore.voteResult.find(p => p.player_number === player.player_number)?.win
  return (
    player && (
      <StyledPlayerInfo result={result}>
        <CardImage image={card_name} size={80} />
        <Token tokenName={playerNumber} size={25} />
        <PlayerInfoName>{player.player_name}</PlayerInfoName>
        <PlayerInfoRole>Role: {player.player_role}</PlayerInfoRole>
        <PlayerInfoTeam>Team: {player.player_team}</PlayerInfoTeam>
        {mark && <Token tokenName={mark} size={30} />}
        {artifact && <Token tokenName={artifact} size={30} />}
      </StyledPlayerInfo>
    )
  )
})
