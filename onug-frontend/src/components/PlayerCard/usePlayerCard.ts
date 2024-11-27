import { deckStore, selectionStore } from 'store'
import { voteStore } from 'store/VoteStore'
import { CardPositionType, TablePlayerCard } from 'types'
import { getCardImageSrc, getPlayerNumberToken } from './PlayerCards.utils'

export const usePlayerCard = (card: TablePlayerCard, ownCard: boolean) => {
  const { selectedCards, selectedMarks } = selectionStore

  const onCardClick = () => {
    if (voteStore.isGuessing) {
      voteStore.selectGuessCardPosition(position as CardPositionType)
    }
    if (isSelectableCard) selectionStore.toggleCardSelection(position)
  }

  const onMarkClick = () => {
    if (isSelectableMark) selectionStore.toggleMarkSelection(position)
  }

  const position = card?.position || ''
  const isCenterCard = position.startsWith('center_')

  const hasMarks = deckStore.hasMarks
  const hasSentinel = deckStore.hasSentinel
  const hasCurator = deckStore.hasCurator

  const image = getCardImageSrc(card)
  const playerNumberToken = getPlayerNumberToken(position)
  let playerName = card?.player_name || ''
  const markName = card?.mark

  const isShielded = card?.shield
  const isArtifacted = card?.artifact

  const isSelectableCard = card?.selectable_card
  const isSelectableMark = card?.selectable_mark
  const isCardSelected = selectedCards.includes(position)
  const isMarkSelected = selectedMarks.includes(position)

  const isAlien = card?.aliens
  const isCow = card?.cow
  const isCurrentPlayer = card?.current
  const isDreamwolf = card?.dreamwolf
  const isGroobzerb = card?.groobzerb
  const isLovers = card?.lovers
  const isMason = card?.masons
  const isPartOfBlob = card?.part_of_blob
  const isPartOfFamily = card?.part_of_family
  const isVampire = card?.vampires
  const isWerewolf = card?.werewolves
  const isWitness = card?.witness

  const guessTokens = voteStore.isGuessing ? voteStore.getGuessTokensByPosition(card.position) : null

  /* ⚡-villains, 🗡️-assassin, 🧪-mad,  🔮 -seer, 🪢-tanner, */
  const roles = []
  if (isAlien) roles.push('🛸')
  if (isCow) roles.push('🐄')
  if (isCurrentPlayer) roles.push('🔦')
  if (isDreamwolf) roles.push('💤')
  if (isGroobzerb) roles.push('👽')
  if (isLovers) roles.push('🩷')
  if (isMason) roles.push('⚒️')
  if (isWitness) roles.push('👁️')
  if (isPartOfBlob) roles.push('🦠')
  if (isPartOfFamily) roles.push('🩵')
  if (isVampire) roles.push('🦇')
  if (isWerewolf) roles.push('🐺')

  if (ownCard) {
    playerName = 'You'
  }

  const formattedPlayerName = `${playerName} ${roles.join(' ')}`

  const cardProps = {
    image,
    isSelectable: isSelectableCard,
    isSelected: isCardSelected,
    onClick: onCardClick
  }

  const markProps = {
    tokenName: markName,
    isSelectable: isSelectableMark,
    isSelected: isMarkSelected,
    onClick: onMarkClick
  }

  const playerNumberProps = {
    aliens: isAlien,
    cow: isCow,
    current: isCurrentPlayer,
    dreamwolf: isDreamwolf,
    groobzerb: isGroobzerb,
    lovers: isLovers,
    masons: isMason,
    witness: isWitness,
    part_of_blob: isPartOfBlob,
    part_of_family: isPartOfFamily,
    vampires: isVampire,
    werewolf: isWerewolf
  }

  return {
    position,
    playerNumberToken,
    playerName: formattedPlayerName,
    isCenterCard,
    cardProps,
    markProps,
    playerNumberProps,
    isShielded,
    isArtifacted,
    guessTokens,
    hasMarks,
    hasSentinel,
    hasCurator
  }
}
