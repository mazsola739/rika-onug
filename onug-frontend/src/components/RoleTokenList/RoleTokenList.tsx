import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { StyledRoleTokenList } from './RoleTokenList.styles'
import { RoleToken } from 'components/RoleToken/RoleToken'

export const RoleTokenList: React.FC = observer(() => {
  const { guessTokens } = voteStore

  return (
    <StyledRoleTokenList>
      {guessTokens.map((token, index) => <RoleToken key={index} token={token} size={35} />)}
    </StyledRoleTokenList>
  )
})
