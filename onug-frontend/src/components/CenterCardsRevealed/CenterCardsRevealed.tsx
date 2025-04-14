import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { riseAndRestStore } from 'store'
import { CardPosition, CenterCard, StyledCenterCardsRevealed } from './CenterCardsRevealed.styles'

export const CenterCardsRevealed: React.FC = observer(() => {
  const { tableCenterCards } = riseAndRestStore

  return (
    <StyledCenterCardsRevealed>
      {tableCenterCards &&
        tableCenterCards.map((card, index) => {
          return (
            <CenterCard key={index}>
              <CardPosition>{card.position.replace('center_', '').replace(/^\w/, c => c.toUpperCase())}</CardPosition>
              <CardImage image={card.card_name} size={60} />
            </CenterCard>
          )
        })}
    </StyledCenterCardsRevealed>
  )
})
