import { Title, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { Member, MemberName, SquadMembers, StyledSquad } from './Squad.styles'

export const Squad: React.FC = observer(() => {
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
              <Token tokenName={`${index + 1}`} size={20} />
              <MemberName>{player_name}</MemberName>
            </Member>
          ))}
      </SquadMembers>
    </StyledSquad>
  )
})
