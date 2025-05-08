import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { riseAndRestStore } from 'store'
import { CardPosition, CenterCard, StyledCenterCardsRevealed } from './CenterCardsRevealed.styles'

export const CenterCardsRevealed: React.ComponentType = observer(() => {
  const { tableCenterCards } = riseAndRestStore

  return (
    <StyledCenterCardsRevealed>
      {tableCenterCards &&
        tableCenterCards.map((card) => {
          return (
            <CenterCard key={card.position}>
              <CardPosition>{card.position.replace('center_', '').replace(/^\w/, c => c.toUpperCase())}</CardPosition>
              <CardImage image={card.card_name} size={60} />
            </CenterCard>
          )
        })}
    </StyledCenterCardsRevealed>
  )
})
