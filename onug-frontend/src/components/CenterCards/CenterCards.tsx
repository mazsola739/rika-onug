import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore, riseAndRestStore } from 'store'
import { TableCenterCard } from 'types'
import { CardGroup, Cards, StyledCenterCards } from './CenterCards.styles'

export const CenterCards: React.FC = observer(() => {
  const { hasAlphawolf, hasTemptress } = deckStore
  const { tableCenterCards } = riseAndRestStore

  const getCard = (position: string) => tableCenterCards.find(card => card.position === position) || { position, selectable: false }

  const renderCards = (positions: string[]) => (
    <CardGroup>
      <Cards>
        {positions.map(position => {
          const card = getCard(position)
          return <PlayerCard key={position} card={card as TableCenterCard} cardSize={75} />
        })}
      </Cards>
    </CardGroup>
  )

  return (
    <StyledCenterCards>
      {hasAlphawolf && renderCards(['center_wolf'])}
      {renderCards(['center_left', 'center_middle', 'center_right'])}
      {hasTemptress && renderCards(['center_villain'])}
    </StyledCenterCards>
  )
})
