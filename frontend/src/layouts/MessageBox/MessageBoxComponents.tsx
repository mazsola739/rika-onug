import { CardImage, TokenImage, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore, propStore, messageStore } from 'store'
import { Title } from 'typography'
import { formatPosition } from 'utils'
import { StyledMessageBoxCards, MessageBoxItem, ItemPosition, StyledMessageBoxAnswer, StyledSelectable, StyledMessageBoxVoteResult, PlayerPosition , ResultTable, ResultCell, ResultRow} from './MessageBox.styles'
import { MessageBoxProps, MessagePlayersProps } from './MessageBox.types'

const MessageBoxCards: React.ComponentType<MessageBoxProps> = observer(({ cards }) => {
  const onCardClick = (position: string) => selectionStore.toggleCardSelection(position)

  return (
    <StyledMessageBoxCards>
      {cards.map((card) => (
        <MessageBoxItem key={card.position}>
          <ItemPosition>{card.name}</ItemPosition>
          <CardImage image='card_background' onClick={() => onCardClick(card.position)} size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const MessageBoxMarks: React.ComponentType<MessageBoxProps> = observer(({ marks }) => {
  const onMarkClick = (position: string) => selectionStore.toggleMarkSelection(position)

  return (
    <StyledMessageBoxCards>
      {marks.map((mark) => (
        <MessageBoxItem key={mark.position}>
          <ItemPosition>{mark.name}</ItemPosition>
          <TokenImage image='mark_back' onClick={() => onMarkClick(mark.position)} size={35} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const MessageBoxPlayers: React.ComponentType<MessagePlayersProps> = observer(({ players }) => {
  return (
    <StyledMessageBoxCards>
      {players.map((player) => (
        <MessageBoxItem key={player.position}>
          <TokenImage image={player.position} size={40} />
          <ItemPosition>{player.name}</ItemPosition>
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

export const MessageBoxAnswer: React.ComponentType = observer(() => {
  const { answer_options } = propStore
  const onAnswerClick = (answer: string) => selectionStore.toggleAnswerSelection(answer)

  return (
    <StyledMessageBoxAnswer>
      {answer_options.map((answer_option) => {
        const isSelected = answer_option === selectionStore.selectedAnswer
        return <Button key={answer_option} onClick={() => onAnswerClick(answer_option)} size={60} variant={isSelected ? 'magenta' : 'orange'} buttonText={answer_option} />
      })}
    </StyledMessageBoxAnswer>
  )
})

export const MessageBoxLook: React.ComponentType = observer(() => {
  const { identifiedPlayers } = messageStore

  return (
    <StyledSelectable>
      <Title title={identifiedPlayers.roles.join(', ')} />
      <MessageBoxPlayers players={identifiedPlayers.players} />
    </StyledSelectable>
  )
})

export const MessageBoxSelectableCards: React.ComponentType = observer(() => {
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

export const MessageBoxSelectableMarks: React.ComponentType = observer(() => {
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

export const MessageBoxVoteResult: React.ComponentType = observer(() => {
  const votes = propStore.vampireVotes && Object.keys(propStore.vampireVotes).length > 0
    ? propStore.vampireVotes
    : propStore.alienVotes && Object.keys(propStore.alienVotes).length > 0
      ? propStore.alienVotes
      : {}

  return (
    <StyledMessageBoxVoteResult>
      <Title title={'VOTE RESULT'} />
      <ResultTable>
          <ResultRow>
            <ResultCell isFixedWidth>Selected</ResultCell>
            <ResultCell isMaxWidth>Voters</ResultCell>
          </ResultRow>
          {Object.entries(votes).map(([key, values]) => (
            <ResultRow key={key}>
              <ResultCell isFixedWidth><PlayerPosition>{formatPosition(key)}</PlayerPosition></ResultCell>
              <ResultCell isMaxWidth>
                {values.map(value => (
                  <TokenImage key={value} image={value} size={25} />
                ))}
              </ResultCell>
            </ResultRow>
          ))}
      </ResultTable>
    </StyledMessageBoxVoteResult>
  )
})

