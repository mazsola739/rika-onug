import { Token } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { Member, MemberName, SquadMembers, SquadTitle, StyledSquad } from './Squad.styles'

export const Squad: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const { roomPlayers: players } = roomStore

  return (
    <StyledSquad>
      <SquadTitle>Locked in {room_id.toLocaleUpperCase().replace('_', ' ')} together with</SquadTitle>
      <SquadMembers>
        {players &&
          players.map(({ player_name }, index) => (
            <Member key={index}>
              <Token tokenName={`${index + 1}`} size={25} />
              <MemberName>{player_name}</MemberName>
            </Member>
          ))}
      </SquadMembers>
    </StyledSquad>
  )
})
