import { Filter, Header } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore, gamePlayStore } from 'store'
import { StyledInfo, RuleInfo, RuleImage, RuleInfoDescription, Logo, Banner, User } from './Room.styles'

const Info: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const { isGameStopped } = gamePlayStore

  const displayInfo =
    detailedCardInfo.id !== 0
      ? `${detailedCardInfo.display_name}: ${detailedCardInfo.rules}`
      : ''
  const imgSrc =
    detailedCardInfo.id !== 0
      ? `/assets/cards/${detailedCardInfo.card_name}.png`
      : ''

  return (
    <StyledInfo>
      {isGameStopped && displayInfo && (
        <RuleInfo>
          <RuleImage src={imgSrc} alt="info" />
          <RuleInfoDescription>{displayInfo}</RuleInfoDescription>
        </RuleInfo>
      )}
    </StyledInfo>
  )
})

export const RoomHeader: React.FC = observer(() => {
  const player_name = sessionStorage.getItem('player_name')
  const room_id = sessionStorage.getItem('room_id')
  const room = (room_id.charAt(0).toUpperCase() + room_id.slice(1)).replace('_', ' ')

  return (
    <Header>
      <Logo backgroundImage={room_id}>
        Welcome in {room}!
      </Logo>
      <Banner>
        <Info />
        <Filter />
      </Banner>
      <User>
        Itt lesz a user avatar
      </User>
    </Header>
  )
})
