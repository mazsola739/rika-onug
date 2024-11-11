import { selectionStore, voteStore, deckStore } from 'store'
import { CardPosition, TablePlayerCard } from 'types'
import { getCardImageSrc, getPlayerNumberToken } from './PlayerCards.utils'

export const usePlayerCard = (card: TablePlayerCard) => {
  const { selectedCards, selectedMarks } = selectionStore

  const onCardClick = () => {
    if (voteStore.isGuessing) {
      //TODO REFACTOR
      voteStore.selectGuessCardPosition(position as CardPosition)
    }
    if (isSelectableCard) selectionStore.toggleCardSelection(position)
  }

  const onMarkClick = () => {
    if (isSelectableMark) selectionStore.toggleMarkSelection(position)
  }

  const position = card?.position || ''
  const isCenterCard = position.startsWith('center_')
  const image = getCardImageSrc(card)
  const playerNumberToken = getPlayerNumberToken(position)
  const markName = card?.mark
  const isShielded = card?.shield
  const isArtifacted = card?.artifact
  const isWerewolf = card?.werewolves
  const isDreamwolf = card?.dreamwolf
  const isMason = card?.masons

  const isSelectableCard = card?.selectable_card
  const isSelectableMark = card?.selectable_mark
  const isCardSelected = selectedCards.includes(position)
  const isMarkSelected = selectedMarks.includes(position)

  const guessTokens = voteStore.isGuessing ? voteStore.getGuessTokensByPosition(card.position) : null
  const hasMarks = deckStore.hasMarks
  const hasSentinel = deckStore.hasSentinel
  const hasCurator = deckStore.hasCurator

  const cardProps = {
    image,
    isSelectable: isSelectableCard,
    isSelected: isCardSelected,
    werewolf: isWerewolf,
    dreamwolf: isDreamwolf,
    masons: isMason
  }

  const markProps = {
    tokenName: markName,
    isSelectable: isSelectableMark,
    isSelected: isMarkSelected,
    onClick: onMarkClick
  }

  return {
    position,
    playerNumberToken,
    isCenterCard,
    cardProps,
    markProps,
    isShielded,
    isArtifacted,
    isWerewolf,
    isDreamwolf,
    onCardClick,
    guessTokens,
    hasMarks,
    hasSentinel,
    hasCurator
  }
}
