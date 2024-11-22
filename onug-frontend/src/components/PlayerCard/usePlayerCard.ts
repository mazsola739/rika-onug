import { selectionStore, deckStore } from 'store'
import { voteStore } from 'store/VoteStore'
import { TablePlayerCard, CardPosition } from 'types'
import { getCardImageSrc, getPlayerNumberToken } from './PlayerCards.utils'

export const usePlayerCard = (card: TablePlayerCard, ownCard: boolean) => {
  const { selectedCards, selectedMarks } = selectionStore

  const onCardClick = () => {
    if (voteStore.isGuessing) {
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
  let playerName = card?.player_name || ''
  const markName = card?.mark
  const isShielded = card?.shield
  const isArtifacted = card?.artifact
  const isWerewolf = card?.werewolves
  const isGroobzerb = card?.groobzerb
  const isDreamwolf = card?.dreamwolf
  const isMason = card?.masons
  const isLovers = card?.lovers
  const isVampire = card?.vampires
  const isAlien = card?.aliens

  const isSelectableCard = card?.selectable_card
  const isSelectableMark = card?.selectable_mark
  const isCardSelected = selectedCards.includes(position)
  const isMarkSelected = selectedMarks.includes(position)

  const guessTokens = voteStore.isGuessing ? voteStore.getGuessTokensByPosition(card.position) : null
  const hasMarks = deckStore.hasMarks
  const hasSentinel = deckStore.hasSentinel
  const hasCurator = deckStore.hasCurator

  /* ⚡-villains, 🦇-vampire, 🛸-alien, 🐺-wolf,💤-dreamwolf, 👽-groob zerb, 🩷-lover, ⚒️-masons, 🗡️-assassin, 🧪-mad, 🦠-blob, 🩵-family, 👁️ -seer, 🪢-tanner, */
  const roles = []
  if (isWerewolf) roles.push('🐺')
  if (isDreamwolf) roles.push('💤')
  if (isMason) roles.push('⚒️')
  if (isLovers) roles.push('🩷')
  if (isVampire) roles.push('🦇')
  if (isAlien) roles.push('🛸')
  if (isGroobzerb) roles.push('👽')

  if (ownCard) {
    playerName = 'You'
  }

  const formattedPlayerName = `${playerName} ${roles.join(' ')}`

  const cardProps = {
    image,
    isSelectable: isSelectableCard,
    isSelected: isCardSelected,
    werewolf: isWerewolf,
    dreamwolf: isDreamwolf,
    masons: isMason,
    vampires: isVampire,
    aliens: isAlien,
    groobzerb: isGroobzerb,
  }

  const markProps = {
    tokenName: markName,
    isSelectable: isSelectableMark,
    isSelected: isMarkSelected,
    lovers: isLovers,
    onClick: onMarkClick
  }

  return {
    position,
    playerNumberToken,
    playerName: formattedPlayerName,
    isCenterCard,
    cardProps,
    markProps,
    isShielded,
    isArtifacted,
    onCardClick,
    guessTokens,
    hasMarks,
    hasSentinel,
    hasCurator,
  }
}
