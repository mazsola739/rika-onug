import { observer } from 'mobx-react-lite'
import { formatPositionSimply } from 'utils'
import { messageStore, propStore, selectionStore } from 'store'
import { StyledMessageBoxAnswer, StyledMessageBoxCards, MessageBoxItem, ItemPosition, StyledSelectable, StyledMessageBoxVoteResult, PlayerPosition } from './MessageBox.styles'
import { MessageBoxAnswerProps, MessageBoxProps, LookProps, SelectableProps, MessageTokensProps, VoteResultProps } from './MessageBox.types'
import { Button, CardImage, Title, TokenImage } from 'components'

const MessageBoxAnswer: React.FC<MessageBoxAnswerProps> = observer(({ answer_options }) => {
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

const MessageBoxLook: React.FC<LookProps> = observer(({ roles, players }) => {
  return (
    <StyledSelectable>
      <Title title={roles.join(', ')} />
      <MessageBoxTokens players={players} />
    </StyledSelectable>
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

const MessageBoxSelectableCards: React.FC<SelectableProps> = observer(({ selectableCards, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE CARDS'} />
      <MessageBoxCards cards={selectableCards} />
      <Title title={'SELECTED CARDS'} />
      <MessageBoxCards cards={selected} />
    </StyledSelectable>
  )
})

const MessageBoxSelectableMarks: React.FC<SelectableProps> = observer(({ selectableMarks, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE MARKS'} />
      <MessageBoxMarks marks={selectableMarks} />
      <Title title={'SELECTED MARKS'} />
      <MessageBoxMarks marks={selected} />
    </StyledSelectable>
  )
})

const MessageBoxTokens: React.FC<MessageTokensProps> = observer(({ players }) => {
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

const MessageBoxVoteResult: React.FC<VoteResultProps> = observer(({ votes }) => {
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

export const RenderLook: React.FC = () => {
  const { identifiedPlayers } = messageStore
  return <MessageBoxLook roles={identifiedPlayers.roles} players={identifiedPlayers.players} />
}

export const RenderSelectableCards: React.FC = () => {
  const { allSelectableCards, allSelectedCards } = messageStore
  return <MessageBoxSelectableCards selectableCards={allSelectableCards} selected={allSelectedCards} />
}

export const RenderSelectableMarks: React.FC = () => {
  const { allSelectableMarks, allSelectedMarks } = messageStore
  return <MessageBoxSelectableMarks selectableMarks={allSelectableMarks} selected={allSelectedMarks} />
}

export const RenderAnswer: React.FC = () => {
  const { answer_options } = propStore
  return <MessageBoxAnswer answer_options={answer_options} />
}

export const RenderVoteResult: React.FC = () => {
  const { vampireVotes, alienVotes } = propStore
  const votes = alienVotes || vampireVotes
  return <MessageBoxVoteResult votes={votes} />
}
