import { InfoPanel, QuickGuide, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { roomStore } from 'store'
import { Avatar, Character, Names, Player, PlayerName, Players, Rule, StyledInfo, StyledPlayerNames } from './Room.styles'

const Info: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const imgSrc =
    detailedCardInfo.id !== 0
      ? `/assets/cards/${detailedCardInfo.card_name}.webp`
      : ''

  return (
    <StyledInfo>
      {imgSrc && <Avatar src={imgSrc} alt="info" />}
      <Character>{detailedCardInfo.display_name.toLocaleUpperCase()}</Character>
      <Rule>{detailedCardInfo.rules}</Rule>
    </StyledInfo>
  )
})

const PlayerNames: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const { roomPlayers: players } = roomStore

  return (
    <StyledPlayerNames>
      <Players>PLAYER(S) IN THE {room_id.toLocaleUpperCase().replace('_', ' ')}</Players>
      <Names>
        {players &&
          players.map(({ player_name }, index) => (
            <Fragment key={index}>
              <Player>
                <Token tokenName={`${index + 1}`} size={20} />
                <PlayerName>{player_name}</PlayerName>
              </Player>
            </Fragment>
          ))}
      </Names>
    </StyledPlayerNames>
  )
})

export const RoomInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <PlayerNames />
      <Info />
      <QuickGuide />
    </InfoPanel>
  )
})
