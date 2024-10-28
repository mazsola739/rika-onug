import { InfoPanel, QuickGuide, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { roomStore } from 'store'
import { Avatar, Character, Names, Player, PlayerName, Players, Rule, StyledInfo, StyledPlayerNames } from './Room.styles'

const Info: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const imgSrc =
    detailedCardInfo.id !== 0
      ? `/assets/cards/${detailedCardInfo.card_name}.png`
      : ''

  return (
    <StyledInfo>
      {imgSrc && <Avatar src={imgSrc} alt="info" />}
      <Character>{detailedCardInfo.display_name}</Character>
      <Rule>{detailedCardInfo.rules}</Rule>
    </StyledInfo>
  )
})

const PlayerNames: React.FC = observer(() => {
  const { players } = roomStore

  return (
    <StyledPlayerNames>
      <Players>Player(s) in the room</Players>
      <Names>
        {players &&
          players.map(({ player_name }, index) => (
            <Fragment key={index}>
              <Player>
                <Token tokenName={`${index + 1}`} size={30} />
                <PlayerName>{player_name}</PlayerName>
              </Player>
              {index < players.length - 1 && ', '}
            </Fragment>
          ))}
      </Names>
    </StyledPlayerNames>
  )
})

export const RoomInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <Info />
      <PlayerNames />
      <QuickGuide />
    </InfoPanel>
  )
})
