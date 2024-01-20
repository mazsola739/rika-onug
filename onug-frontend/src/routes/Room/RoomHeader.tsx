import React from 'react'
import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { RuleImage, RuleInfoDescription, StyledRuleInfo } from './Room.styles'
import { gamePlayStore, roomStore } from 'store'

const RuleInfo: React.FC = observer(() => {
  const { isGameStopped } = gamePlayStore
  const detailedCardInfo = roomStore.getDetailedCardInfo()
  const detailedTokenInfo = roomStore.getDetailedTokenInfo()

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
  return (
    <Header>
      <RuleInfo />
    </Header>
  )
})
