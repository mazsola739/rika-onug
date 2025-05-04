import { InputField } from 'components'
import { observer } from 'mobx-react-lite'
import { Title } from 'typography'
import { StyledSearch } from './Search.styles'

//TODO its not working yet!
export const Search: React.ComponentType = observer(() => {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    return value
  }

  return (
    <StyledSearch>
      <Title title='SEARCH' />
      <InputField type='text' name='search' placeholder='Type...' value='' onChange={handleSearchChange} required={false} maxLength={20} pattern='[a-zA-Z0-9]*' title='Searchbar can only contain letters and numbers, and must be 20 characters or fewer.' />
    </StyledSearch>
  )
})
