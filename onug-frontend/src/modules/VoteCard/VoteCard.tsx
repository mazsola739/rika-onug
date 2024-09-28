import { Token, Icon } from 'components'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { dealingStore, deckStore, interactionStore } from 'store'
import { StyledVoteCard, Tokens, CardBack, MarkBack, ArtifactBack } from './VoteCard.styles'
import { VoteCardProps } from './VoteCard.types'

export const VoteCard: React.FC<VoteCardProps> = observer(
  ({
    position,
    id,
    mark,
    isCenter,
    selectable_cards,
    shield,
    artifact,
    select,
  }) => {
    const [isSelectedCard, setIsSelectedCard] = useState(false)
    const { hasMarks } = dealingStore
    const card = id === 0 ? '' : deckStore.getCardById(id)

    const cardImageSrc =
      card && card.id !== 0
        ? `/assets/cards/${card.card_name}.png`
        : '/assets/backgrounds/card_back.png'

    const markImageSrc =
      mark && mark.length !== 0
        ? `/assets/tokens/${mark}.png`
        : '/assets/tokens/mark_back.png'

/*         const artifactImageSrc =
        artifact && artifact.length !== 0
          ? `/assets/tokens/${mark}.png`
          : '/assets/tokens/mark_back.png' */

    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')

    const cardClickHandler = (cardType: string) => {
      const maxPlayerCardSelection = interactionStore.selectablePlayerCardLimit
    }

    return (
      <StyledVoteCard>
        {!isCenter && (
          <Tokens>
            {!isCenter && <Token tokenName={position} size={25} />}
            {!isCenter && shield && <Token tokenName="shield" size={25} />}
          </Tokens>
        )}
        <CardBack cardBackgroundImage={cardImageSrc} selectable_cards={selectable_cards} onClick={() => cardClickHandler(isCenter ? 'center' : 'player')} isSelectedCard={isSelectedCard} />
        <Tokens>
          {!isCenter && select && <Icon iconName="select" size={25} />}
        </Tokens>
        {!isCenter && hasMarks && (<MarkBack markBackgroundImage={markImageSrc} />)}
        {!isCenter && artifact && (<ArtifactBack artifactBackgroundImage={markImageSrc} />)}
      </StyledVoteCard>
    )
  }
)
