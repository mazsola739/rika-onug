//TODO save which interaction!

const randomBlobKickoffText = [
  "blob_1pleft_text",
  "blob_1pright_text",
  "blob_eachside_text",
  "blob_2pleft_text",
  "blob_2pright_text",
  "blob_3pleft_text",
  "blob_3pright_text",
  "blob_4pleft_text",
  "blob_4pright_text",
  "blob_2eachside_text",
]

export const blob = (gameState) => {
  const randomKickoff = getRandomItemFromArray(randomBlobKickoffText)

  return [
    randomKickoff,
    randomKickoff.includes("1p") ? "blob_is_end_text" : "blob_are_end_text",
  ]
}

/* if (conditions.hasBlobPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.blob_interaction(newGameState, tokens, sceneTitle)
} */


//TODO doppelganger same result as blob
//! NEM KEL FEL, BLOB-NAK AZ ICON-T
//? INFO: Blob -  Wins if no player part of him (left, right or both), via app, dies
export const blob_interaction = (gameState, tokens, title) => {}