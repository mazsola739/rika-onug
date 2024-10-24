import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { CardGroup, Cards, GroupTitle, StyledCenterCards } from './CenterCards.styles'

export const CenterCards: React.FC = observer(() => {
  const { hasAlphawolf, hasTemptress } = deckStore

  const renderCard = (position: string, title: string) => {
    return (
        <CardGroup>
          <GroupTitle>{title}</GroupTitle>
          <Cards>
            <PlayerCard id={0} position={position} isCenter={true} />
          </Cards>
        </CardGroup>
    )
  }

  return (
    <StyledCenterCards>
      {hasAlphawolf && renderCard('center_wolf', 'Wolf')}
      <CardGroup>
        <GroupTitle>Center</GroupTitle>
        <Cards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => <PlayerCard key={index} id={0} position={position} isCenter={true} />
          )}
        </Cards>
      </CardGroup>
      {hasTemptress && renderCard('center_villain', 'Villain')}
    </StyledCenterCards>
  )
})
