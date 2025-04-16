import { Title, TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'
import { Ready, ReadyPlayerList, StyledReadyPlayer, StyledReadyStatus } from './ReadyStatus.styles'
import { ReadyPlayerProps, ReadyStatusProps } from './ReadyStatus.types'

const ReadyPlayer: React.ComponentType<ReadyPlayerProps> = observer(({ player_name, ready, player_number }) => {
  const playerTokenName = ready ? `selected_${player_number}` : player_number

  return (
    <StyledReadyPlayer>
      <TokenImage image={playerTokenName} size={25} ready={ready} />
      <Ready ready={ready}>
        {player_name} is {ready ? 'ready' : 'not ready'}
      </Ready>
    </StyledReadyPlayer>
  )
})

export const ReadyStatus: React.ComponentType<ReadyStatusProps> = observer(({ title }) => {
  const { players } = playersStore

  return (
    <StyledReadyStatus>
      <Title title={title} />
      <ReadyPlayerList>
        {players.map(({ player_name, flag: ready, player_number }, index) => (
          <ReadyPlayer key={index} player_name={player_name} ready={ready} player_number={player_number} />
        ))}
      </ReadyPlayerList>
    </StyledReadyStatus>
  )
})
