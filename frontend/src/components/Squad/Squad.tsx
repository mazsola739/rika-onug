import { TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { Title } from 'typography'
import { StyledSquad, SquadMembers, Member, MemberName } from './Squad.styles'

export const Squad: React.ComponentType = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const { roomPlayers: players } = roomStore
  const title = `LOCKED IN ${room_id.toLocaleUpperCase().replace('_', ' ')} TOGETHER WITH`

  return (
    <StyledSquad>
      <Title title={title} />
      <SquadMembers>
        {players &&
          players.map(({ player_name }, index) => (
            <Member key={index}>
              <TokenImage image={`${index + 1}`} size={20} />
              <MemberName>{player_name}</MemberName>
            </Member>
          ))}
      </SquadMembers>
    </StyledSquad>
  )
})
