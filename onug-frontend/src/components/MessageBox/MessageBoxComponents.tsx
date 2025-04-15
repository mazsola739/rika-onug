import { observer } from 'mobx-react-lite'
import { formatPositionSimply } from 'utils'
import { messageStore, propStore, selectionStore } from 'store'
import { StyledMessageBoxAnswer, StyledMessageBoxCards, MessageBoxItem, ItemPosition, StyledSelectable, StyledMessageBoxVoteResult, PlayerPosition } from './MessageBox.styles'
import { MessageBoxProps, MessagePlayersProps } from './MessageBox.types'
import { Button, CardImage, Title, TokenImage } from 'components'


const MessageBoxCards: React.FC<MessageBoxProps> = observer(({ cards }) => {
  const onCardClick = (position: string) => selectionStore.toggleCardSelection(position)

  return (
    <StyledMessageBoxCards>
      {cards.map((card, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{card.name}</ItemPosition>
          <CardImage image="card_background" onClick={() => onCardClick(card.position)} size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const MessageBoxMarks: React.FC<MessageBoxProps> = observer(({ marks }) => {
  const onMarkClick = (position: string) => selectionStore.toggleMarkSelection(position)

  return (
    <StyledMessageBoxCards>
      {marks.map((mark, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{mark.name}</ItemPosition>
          <TokenImage image="mark_back" onClick={() => onMarkClick(mark.position)} size={35} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const MessageBoxPlayers: React.FC<MessagePlayersProps> = observer(({ players }) => {
  return (
    <StyledMessageBoxCards>
      {players.map((player, index) => (
        <MessageBoxItem key={index}>
          <TokenImage image={player.position} size={40} />
          <ItemPosition>{player.name}</ItemPosition>
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

export const MessageBoxAnswer: React.FC = observer(() => {
  const { answer_options } = propStore
  const onAnswerClick = (answer: string) => selectionStore.toggleAnswerSelection(answer)

  return (
    <StyledMessageBoxAnswer>
      {answer_options.map((answer_option, index) => {
        const isSelected = answer_option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(answer_option)} size={60} variant={isSelected ? 'magenta' : 'orange'} buttonText={answer_option} />
      })}
    </StyledMessageBoxAnswer>
  )
})

export const MessageBoxLook: React.FC = observer(() => {
  const { identifiedPlayers } = messageStore

  return (
    <StyledSelectable>
      <Title title={identifiedPlayers.roles.join(', ')} />
      <MessageBoxPlayers players={identifiedPlayers.players} />
    </StyledSelectable>
  )
})

export const MessageBoxSelectableCards: React.FC = observer(() => {
  const { allSelectableCards, allSelectedCards } = messageStore

  return (
    <StyledSelectable>
      <Title title={'SELECTABLE CARDS'} />
      <MessageBoxCards cards={allSelectableCards} />
      <Title title={'SELECTED CARDS'} />
      <MessageBoxCards cards={allSelectedCards} />
    </StyledSelectable>
  )
})

export const MessageBoxSelectableMarks: React.FC = observer(() => {
  const { allSelectableMarks, allSelectedMarks } = messageStore

  return (
    <StyledSelectable>
      <Title title={'SELECTABLE MARKS'} />
      <MessageBoxMarks marks={allSelectableMarks} />
      <Title title={'SELECTED MARKS'} />
      <MessageBoxMarks marks={allSelectedMarks} />
    </StyledSelectable>
  )
})

export const MessageBoxVoteResult: React.FC = observer(() => {
  const { vampireVotes, alienVotes } = propStore
  const votes = alienVotes || vampireVotes

  return (
    <StyledMessageBoxVoteResult>
      {Object.entries(votes).map(([key, values]) => (
        <div key={key}>
          <PlayerPosition>{formatPositionSimply(key)}</PlayerPosition>
          {values.map(value => (
            <TokenImage key={value} image={value} size={30} />
          ))}
        </div>
      ))}
    </StyledMessageBoxVoteResult>
  )
})

