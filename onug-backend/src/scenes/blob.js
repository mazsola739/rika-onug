const random_blob_kickoff_text = [ 
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
const blob = ["blob_is_end_text", "blob_are_end_text"]

exports.blob = {}

/* generateActions(): RoleActionType[] {
    const blobActions: RoleActionType[] = []

    const firstActionKey = selectRandomKey(random_blob)

    const getSecondActionText = (key: string): string => {
      if (key.includes('1p')) {
        return blob.blob_is_end_text
      } else {
        return blob.blob_are_end_text
      }
    }

    blobActions.push(
      {
        text: random_blob[firstActionKey as keyof typeof random_blob],
        time: BASE_TIME,
        image: 'onua_blob',
      },
      {
        text: getSecondActionText(firstActionKey),
        time: BASE_TIME,
        image: 'onua_blob',
      }
    )

    return blobActions
  } */
