import { CLASSIC_EXPANSIONS, COMIC_EXPANSIONS } from 'constants'
import { observer } from 'mobx-react-lite'
import { Expansion } from 'types'
import { Title } from 'typography'
import { StyledFilter, FilterButtons } from './Filter.styles'
import { FilterButton } from './FilterButton'
import { deckStore } from 'store/DeckStore'

export const Filter: React.ComponentType = observer(() => {
  const {selectedStyle} = deckStore;
  const expansionNames = Object.values(selectedStyle === 'classic' ? CLASSIC_EXPANSIONS : COMIC_EXPANSIONS)

  return (
    <StyledFilter>
      <Title title={'EXPANSIONS'} />
      <FilterButtons>
        {expansionNames.map(expansion => (
          <FilterButton key={expansion} expansion={expansion as Expansion} isSelected={false} />
        ))}
      </FilterButtons>
    </StyledFilter>
  )
})
