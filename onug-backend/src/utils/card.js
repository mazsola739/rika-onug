exports.selectCard = (selectedCardIds, cardId) => {
    selectedCardIds.push(cardId)
    return Array.from(new Set(selectedCardIds))
}

exports.deselectCard = (selectedCardIds, cardId) => {
    const index = selectedCardIds.findIndex(
        (selectedCardId) => selectedCardId === cardId
    )
    if (index !== -1) {
        selectedCardIds.splice(index, 1)
    }
    return selectedCardIds
}