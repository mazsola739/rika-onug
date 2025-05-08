import { RoleToken } from 'components'
import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { StyledRoleTokenList } from './RoleTokenList.styles'

export const RoleTokenList: React.ComponentType = observer(() => {
  const { isGuessing, guessTokens } = voteStore

  return <StyledRoleTokenList>{isGuessing && guessTokens.map((token) => <RoleToken key={token.id} token={token} size={40} />)}</StyledRoleTokenList>
})
