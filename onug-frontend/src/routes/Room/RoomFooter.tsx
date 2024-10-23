import { Footer, FooterButtons, Button, Token } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { roomStore, gamePlayStore, deckStore } from 'store'
import { StyledInfo, RuleInfo, RuleImage, RuleInfoDescription, StyledPlayerNames, Player, PlayerName } from './Room.styles'
import { Fragment } from 'react'

const Info: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const { isGamePlayStopped } = gamePlayStore

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
      {isGamePlayStopped && displayInfo && (
        <RuleInfo>
          <RuleImage src={imgSrc} alt='info' />
          <RuleInfoDescription>{displayInfo}</RuleInfoDescription>
        </RuleInfo>
      )}
    </StyledInfo>
  )
})

const PlayerNames: React.FC = observer(() => {
  const { players } = roomStore

  return (
    <StyledPlayerNames>
      {`Player(s) in the room: `}
      {players && players.map(({ player_name }, index) => (
        <Fragment key={index}>
          <Player>
            <Token tokenName={`player_${index + 1}`} size={25} />
            <PlayerName>{player_name}</PlayerName>
          </Player>
          {index < players.length - 1 && ', '}
        </Fragment>
      ))}
    </StyledPlayerNames>
  )
})


export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const totalPlayers = deckStore.totalPlayers

  const buttonText = totalPlayers
    ? `${BUTTONS.deal_label} FOR ${totalPlayers}`
    : BUTTONS.deal_label

  const { handleResetGame, handleLeaveRoom, handleToGameTable } =
    useClickHandler(room_id, token)

  return (
    <Footer>
      <PlayerNames />
      <Info />
      <FooterButtons>
        <Button onClick={handleResetGame} buttonText={BUTTONS.reset_game_label} variant='blue' />
        <Button onClick={handleToGameTable} disabled={!deckStore.totalPlayers} buttonText={buttonText} variant='green' />
        <Button onClick={handleLeaveRoom} buttonText={BUTTONS.leave_room_label} variant='crimson' />
      </FooterButtons>
    </Footer>
  )
})
