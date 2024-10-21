import { Token } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledDealtCard, CardBack, Tokens } from './DealtCard.styles'
import { DealtCardProps } from './DealtCard.types'

export const DealtCard: React.FC<DealtCardProps> = observer(
  ({ position, id, isCenter, ready }) => {
    const { hasMarks } = deckStore
    const card = id === 0 ? '' : deckStore.getCardById(id)
    const playerTokenName = position.replace(/^player_/, '')

    let imgSrc = card && card.id !== 0
      ? `/assets/playingcards/${card.card_name}.png`
      : '/assets/playingcards/card_background.png'

    if (card && card.id !== 0) {
      const { card_name } = card
      let randomDeluxe = ''

      if (['alien', 'robber', 'seer', 'tanner', 'troublemaker', 'vampire', 'werewolf'].includes(card_name)) {
        if (card_name === 'alien') {
          randomDeluxe = Math.random() < 0.5 ? '_male' : '_female'
        } else if (card_name === 'werewolf') {
          randomDeluxe = `_${Math.floor(Math.random() * 3) + 1}`
        } else {
          randomDeluxe = `_${Math.floor(Math.random() * 2) + 1}`
        }
        imgSrc = `/assets/playingcards/${card_name}${randomDeluxe}.png`
      }
    }

    return (
      <StyledDealtCard>
        <CardBack backgroundImage={imgSrc} />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName="mark_of_clarity" size={35} />}
        </Tokens>
      </StyledDealtCard>
    )
  }
)
