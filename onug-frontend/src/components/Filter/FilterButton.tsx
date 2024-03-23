import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { StyledFilterButton } from './Filter.styles'
import { FilterButtonProps } from './Filter.types'
import { deckStore, wsStore } from 'store'
import { useCallback } from 'react'
import { UPDATE_ROOM } from 'constant'

export const FilterButton: React.FC<FilterButtonProps> = observer(
  ({ expansion}) => {
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')

    const isSelected = deckStore.selectedExpansions.some((selectedExpansion) => selectedExpansion === expansion)

    const handleClick = useCallback(() => {
      sendJsonMessage?.({
        type: UPDATE_ROOM,
        expansion,
        room_id,
        token,
      })
    }, [
      room_id,
      sendJsonMessage,
    ])

    return (
      <StyledFilterButton onClick={handleClick} isSelected={isSelected} expansion={expansion} >
        {expansion}
      </StyledFilterButton>
    )
  }
)
