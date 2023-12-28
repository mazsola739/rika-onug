import { selectedDeckStore } from 'store'
import { StyledSelectedCard } from './SelectedCard.styles'
import { SelectedCardProps } from './SelectedCard.types'

export const SelectedCard = ({
  src,
  alt,
  id,
}: SelectedCardProps & { id: number }) => {
  const handleDeselect = () => {
    selectedDeckStore.toggleCardSelection({
      id,
      display_name: alt,
      expansion: '',
      team: '',
      wake_up_time: '',
      card_name: '',
      order: 0,
      rules: '',
    })
  }

  return (
    <StyledSelectedCard
      key={alt}
      src={src}
      alt={alt}
      onClick={handleDeselect}
    />
  )
}
