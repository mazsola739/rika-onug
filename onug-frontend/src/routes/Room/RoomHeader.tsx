import React from 'react'
import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import {
  Hello,
  RuleImage,
  RuleInfoDescription,
  StyledRuleInfo,
} from './Room.styles'
import { gamePlayStore, roomStore } from 'store'

const RuleInfo: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()
  const detailedTokenInfo = roomStore.getDetailedTokenInfo()

  const { isGameStopped } = gamePlayStore

  const displayInfo =
    detailedCardInfo.id !== 0 ? detailedCardInfo.rules : detailedTokenInfo.rules
  const imgSrc =
    detailedCardInfo.id !== 0
      ? `/assets/cards/${detailedCardInfo.card_name}.png`
      : `/assets/tokens/${detailedTokenInfo.token_name}.png`

  return (
    <StyledRuleInfo>
      {isGameStopped && displayInfo && (
        <>
          <RuleImage src={imgSrc} alt="info" />
          <RuleInfoDescription>{displayInfo}</RuleInfoDescription>
        </>
      )}
    </StyledRuleInfo>
  )
})

export const RoomHeader: React.FC = observer(() => {
  const player_name = sessionStorage.getItem('player_name')
  const room_id = sessionStorage.getItem('room_id')
  const room = (room_id.charAt(0).toUpperCase() + room_id.slice(1))
    .replace('_', ' ')
    .replace('room', '')

  return (
    <Header>
      <Hello>
        Welcome {player_name} in {room} room!
      </Hello>
      <RuleInfo />
    </Header>
  )
})
