import { Button, Header } from 'components'
import { observer } from 'mobx-react-lite'
import {
  CardInformation,
  Player,
  PlayerInfo,
  StyledGameTableHeader,
  YourAvatar,
  YourCard,
  YourCardRule,
  YourName,
} from './GameTable.styles'
import { sendReadyRequest } from 'api'
import { expansion, roles, team, wake, rules_role } from 'constant'

export const GameTableHeader = observer(() => {
  const handleClick = async () => {
    try {
      const responseData = await sendReadyRequest()
      console.log('Response from backend:', responseData)
    } catch (error) {
      console.error(error.message)
    }
  }
  const player_name = sessionStorage.getItem('player_name')

  const player = {
    player_card: {
      id: 7,
      expansion: expansion.werewolf,
      display_name: roles.role_minion,
      team: team.werewolf,
      wake_up_time: wake.night,
      card_name: 'onuw_minion',
      order: 32,
      rules: rules_role.rules_minion,
    },
    player_name,
    player_number: 1,
  }

  return (
    <Header>
      <StyledGameTableHeader>
        <CardInformation>
          <YourCard
            src={require(
              `../../assets/cards/${player.player_card.card_name}.png`
            )}
            alt={player.player_card.display_name}
          />
          <YourCardRule>{`${player.player_card.display_name}: ${player.player_card.rules}`}</YourCardRule>
        </CardInformation>
        <PlayerInfo>
          <YourAvatar
            src={require(
              `../../assets/players/selected_player_${player.player_number}.png`
            )}
            alt={player.player_name}
          />
          <Player>
            <YourName>{player.player_name}</YourName>
            <Button
              onClick={handleClick}
              backgroundColor="#28a745"
              buttontext="Ready?"
            />
          </Player>
        </PlayerInfo>
      </StyledGameTableHeader>
    </Header>
  )
})
