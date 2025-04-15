import { Title } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledSelectable } from './MessageBox.styles'
import { SelectableProps } from './MessageBox.types'
import { MessageBoxCards } from './MessageBoxCards'

export const MessageBoxSelectableCards: React.FC<SelectableProps> = observer(({ selectableCards, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE CARDS'} />
      <MessageBoxCards cards={selectableCards} />
      <Title title={'SELECTED CARDS'} />
      <MessageBoxCards cards={selected} />
    </StyledSelectable>
  )
})
