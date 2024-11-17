import { observer } from 'mobx-react-lite'
import { StyledTitle } from './Title.styles'
import { TitleProps } from './Title.types'

export const Title: React.FC<TitleProps> = observer(({ title, yourResult }) => {
  return <StyledTitle yourResult={yourResult}>{title}</StyledTitle>
})
