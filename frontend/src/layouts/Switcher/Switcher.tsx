import { STYLE } from 'constants'
import { observer } from 'mobx-react-lite'
import { Style } from 'types'
import { Title } from 'typography'
import { StyledSwitcher, SwitcherButtons } from './Switcher.styles'
import { SwitcherButton } from './SwitcherButton'

//TODO FINISH this layout

export const Switcher: React.ComponentType = observer(() => {
  const styleNames = Object.values(STYLE)

  return (
    <StyledSwitcher>
      <Title title={'STYLE'} />
      <SwitcherButtons>
        {styleNames.map(style => (
          <SwitcherButton key={style} style={style as Style} isSelected={false} />
        ))}
      </SwitcherButtons>
    </StyledSwitcher>
  )
})
