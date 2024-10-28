import { InfoPanel, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'
import { InterAction } from './Game.styles'

export const GameInfoPanel: React.FC = observer(() => {

  return (
    <InfoPanel>
      <InterAction />
      <QuickGuide />
    </InfoPanel>
  )
})
