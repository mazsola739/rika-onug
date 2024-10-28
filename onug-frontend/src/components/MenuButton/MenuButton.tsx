import { observer } from 'mobx-react-lite'
import { StyledMenuButton } from './MenuButton.styles'
import { MenuButtonProps } from './MenuButton.types'

export const MenuButton: React.FC<MenuButtonProps> = observer(({ isSelected, isActive, expansion, anchor }) => {

  const buttonText = anchor ? anchor : expansion ? expansion : ''
  const isHighlighted = isSelected ? isSelected : isActive ? isActive : false

 /*  //nav
  const handleClick = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //filter
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
    ]) */

  
  return (
    <StyledMenuButton isHighlighted={isHighlighted}>{buttonText}</StyledMenuButton>
  )
})
