import { deckStore, selectionStore } from 'store'
import { TablePlayerCard } from 'types'
import { getCardImageSrc, getPlayerNumberToken } from './PlayerCards.utils'

export const usePlayerCardSelection = (card: TablePlayerCard) => {
  const { hasMarks, hasSentinel, hasCurator } = deckStore
  const { selectedCards, selectedMarks } = selectionStore

  const position = card?.position || ''
  const isCenterCard = position.startsWith('center_')
  const image = getCardImageSrc(card)
  const playerNumberToken = getPlayerNumberToken(position)
  const markName = card?.mark
  const isShielded = card?.shield
  const isArtifacted = card?.artifact
  const isWerewolf = card?.werewolves
  const isDreamwolf = card?.dreamwolf

  const isSelectableCard = card?.selectable_card
  const isSelectableMark = card?.selectable_mark
  const isCardSelected = selectedCards.includes(position)
  const isMarkSelected = selectedMarks.includes(position)

  const onCardClick = () => {
    if (isSelectableCard) selectionStore.toggleCardSelection(position)
  }

  const onMarkClick = () => {
    if (isSelectableMark) selectionStore.toggleMarkSelection(position)
  }

  const cardProps = {
    image,
    isSelectable: isSelectableCard,
    isSelected: isCardSelected,
    werewolf: isWerewolf,
    dreamwolf: isDreamwolf,
    position
  }

  const markProps = {
    tokenName: markName,
    isSelectable: isSelectableMark,
    isSelected: isMarkSelected,
    onClick: onMarkClick,
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
    hasMarks,
    hasSentinel,
    hasCurator,
  }
}
