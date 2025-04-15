import { Title } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledSelectable } from './MessageBox.styles'
import { SelectableProps } from './MessageBox.types'
import { MessageBoxMarks } from './MessageBoxMarks'

export const MessageBoxSelectableMarks: React.FC<SelectableProps> = observer(({ selectableMarks, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE MARKS'} />
      <MessageBoxMarks marks={selectableMarks} />
      <Title title={'SELECTED MARKS'} />
      <MessageBoxMarks marks={selected} />
    </StyledSelectable>
  )
})
