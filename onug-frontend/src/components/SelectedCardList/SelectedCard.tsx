import { CardImage } from 'components'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { SelectedCardProps } from './SelectedCard.types'

export const SelectedCard: React.FC<SelectedCardProps> = observer(({ card }, index) => {
  const { id } = card
  const { handleSelectAndDeselect } = useClickHandler()

  return <CardImage image={card.card_name} key={index} onClick={() => handleSelectAndDeselect(id)} size={65} />
})
