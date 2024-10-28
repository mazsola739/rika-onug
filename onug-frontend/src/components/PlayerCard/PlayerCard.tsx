import { Card, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledPlayerCard, Tokens } from './PlayerCard.styles'
import { PlayerCardProps } from './PlayerCard.types'

//TODO strong refactor need!
export const PlayerCard: React.FC<PlayerCardProps> = observer(
  ({  position, isCenter, id, ready, playerName  }) => {
    const { hasMarks } = deckStore
    const card = id === 0 ? '' : deckStore.getCardById(id)
    const playerNumberToken = position.replace(/^player_/, '')

    let imgSrc = card && card.id !== 0 ? `${card.card_name}` : 'card_background'

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
        imgSrc = `${card_name}${randomDeluxe}`
      }
    }


    return (
      <StyledPlayerCard>
        <Card image={imgSrc} size={90} playerName={playerName}/>
        <Tokens>
          {!isCenter && <Token tokenName={playerNumberToken} size={35} />}
          {!isCenter && hasMarks && <Token tokenName='mark_back' size={35} />}{/* TODO mark of clarity now, but later background! */}
          {/* {!isCenter && hasShield && <Token tokenName='mark_of_clarity' size={35} />} TODO*/}
          {/* {!isCenter && hasArtifact && <Token tokenName='mark_of_clarity' size={35} />} TODO*/}
        </Tokens>
      </StyledPlayerCard>
    )
  }
)
