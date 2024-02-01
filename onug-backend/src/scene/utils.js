exports.containsAnyIds = (selectedCardIds, roleIds) => roleIds.some((cardId) => selectedCardIds.includes(cardId))

exports.containsAllIds = (selectedCardIds, roleIds) => roleIds.every((cardId) => selectedCardIds.includes(cardId))

exports.hasRole = (selectedCards, roleId) => selectedCards.includes(roleId)

