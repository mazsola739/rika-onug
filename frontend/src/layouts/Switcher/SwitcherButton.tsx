import { MenuButton } from 'components'
import { UPDATE_ROOM } from 'constants'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { deckStore, wsStore } from 'store'
import { SwitcherButtonProps } from './Switcher.types'

export const SwitcherButton: React.ComponentType<SwitcherButtonProps> = observer(({ style }) => {
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const isSelected = deckStore.selectedStyle.includes(style)

  const handleClick = useCallback(() => {
    sendJsonMessage?.({
      type: UPDATE_ROOM,
      style,
      room_id,
      token
    })
  }, [sendJsonMessage, room_id, style])

  const bgImg = `/assets/backgrounds/expansion_${style.toLocaleLowerCase().replace(' ', '')}.webp`

  return <MenuButton bgImg={bgImg} isSelected={isSelected} onClick={handleClick} />
})
