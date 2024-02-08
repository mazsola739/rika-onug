import { observer } from 'mobx-react-lite'
import { CenterCardContainer, StyledBoardCards } from './BoardCards.styles'
import { dealtCardsUtils } from './BoardCards.utils'

const { renderPlayerCards, renderCenterCard } = dealtCardsUtils

export const BoardCards: React.FC = observer(() => {
  return (
    <StyledBoardCards>
      {renderPlayerCards()}
      <CenterCardContainer>{renderCenterCard()}</CenterCardContainer>
    </StyledBoardCards>
  )
})
