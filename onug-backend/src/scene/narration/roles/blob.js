//TODO save wich interaction!

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

exports.blob = () => {
  const randomKickoff = getRandomItemFromArray(randomBlobKickoffText)

  return [
    randomKickoff,
    randomKickoff.includes("1p") ? "blob_is_end_text" : "blob_are_end_text",
  ]
}
