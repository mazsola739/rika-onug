import { RoleToken } from 'components/RoleToken/RoleToken'
import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { StyledRoleTokenList } from './RoleTokenList.styles'

export const RoleTokenList: React.FC = observer(() => {
  const { isGuessing, guessTokens } = voteStore

  return (
    <StyledRoleTokenList>{isGuessing && guessTokens.map((token, index) => <RoleToken key={index} token={token} size={35} />)}</StyledRoleTokenList>
  )
})
