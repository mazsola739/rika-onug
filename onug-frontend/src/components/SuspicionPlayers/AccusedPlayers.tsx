import { TokenImage } from 'components/TokenImage/TokenImage'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { AccusedPlayer, StyledAccusedPlayers } from './SuspicionPlayers.styles'

export const AccusedPlayers: React.FC = observer(() => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }
  const { selectedCards } = selectionStore

  return (
    <StyledAccusedPlayers>
      {selectedCards.map((card, index) => (
        <AccusedPlayer key={index}>
          <TokenImage image={card.replace(/player_/g, '')} onClick={() => onCardClick(card)} size={40} />
        </AccusedPlayer>
      ))}
    </StyledAccusedPlayers>
  )
})
