import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore, riseAndRestStore } from 'store'
import { TableCenterCard } from 'types'
import { CardGroup, Cards, GroupTitle, StyledCenterCards } from './CenterCards.styles'

export const CenterCards: React.FC = observer(() => {
  const { hasAlphawolf, hasTemptress } = deckStore
  const { tableCenterCards } = riseAndRestStore

  const wolfCard = tableCenterCards.find(card => card.position === 'center_wolf') || { position: 'center_wolf', selectable: false }
  const leftCard = tableCenterCards.find(card => card.position === 'center_left') || { position: 'center_left', selectable: false }
  const middleCard = tableCenterCards.find(card => card.position === 'center_middle') || { position: 'center_middle', selectable: false }
  const rightCard = tableCenterCards.find(card => card.position === 'center_right') || { position: 'center_right', selectable: false }
  const villainCard = tableCenterCards.find(card => card.position === 'center_villain') || { position: 'center_villain', selectable: false }

  const renderCenterCard = (title: string, centerCard: TableCenterCard) => (
    <CardGroup>
      <GroupTitle>{title}</GroupTitle>
      <Cards>
        <PlayerCard card={centerCard} />
      </Cards>
    </CardGroup>
  )

  return (
    <StyledCenterCards>
      {hasAlphawolf && renderCenterCard('Wolf', wolfCard)}
      <CardGroup>
        <GroupTitle>Center</GroupTitle>
        <Cards>
          {[leftCard, middleCard, rightCard].map(card => (
            <PlayerCard key={card.position} card={card} />
          ))}
        </Cards>
      </CardGroup>
      {hasTemptress && renderCenterCard('Villain', villainCard)}
    </StyledCenterCards>
  )
})
