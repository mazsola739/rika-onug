import { InfoPanel, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { deckStore, roomStore } from 'store'
import { Avatar, Character, Names, Player, PlayerName, Players, Rule, StyledInfo, StyledPlayerNames, StyledRoomInfoPanel } from './Room.styles'

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
              <Token tokenName={`player_${index + 1}`} size={25} />
              <PlayerName>{player_name}</PlayerName>
            </Player>
            {index < players.length - 1 && ', '}
          </Fragment>
        ))}</Names>
    </StyledPlayerNames>
  )
})

const Help: React.FC = observer(() => {
  const { selectedCards, selectedMarks, artifacts} = deckStore
  console.log(selectedCards)

  return (
    <StyledPlayerNames>
      <Players>QUICK GUIDE</Players>
{selectedCards.map((item, index)=>  
 (<p key={index}>{item.card_name}</p>)
)}
{selectedMarks.map((item, index)=>  
 (<p key={index}>{item.token_name}</p>)
)}
{artifacts.map((item, index)=>  
 (<p key={index}>{item.token_name}</p>)
)}
    </StyledPlayerNames>
  )
})

export const RoomInfoPanel: React.FC = observer(() => {

  return (
    <InfoPanel>
      <Info />
      <PlayerNames />
      <Help />
    </InfoPanel>
  )
})
