exports.familyman_kickoff = [ //doppelganger! random selected players, show focus, update players actual team
  "familyman_1pleft_text",
  "familyman_1pright_text",
  "familyman_eachside_text",
  "familyman_2pleft_text",
  "familyman_2pright_text",
  "familyman_3pleft_text",
  "familyman_3pright_text",
  "familyman_4pleft_text",
  "familyman_4pright_text",
  "familyman_2eachside_text",
]
exports.familyman_close = ["familyman_is_end_text", "familyman_are_end_text"]


exports.familyman = {}

/*   generateActions(): RoleActionType[] {
    const familymanActions: RoleActionType[] = []

    const firstActionKey = selectRandomKey(familyman_wake)

    const getSecondActionText = (key: string): string => {
      if (key.includes('1p')) {
        return familyman_close.familyman_is_end_text
      } else {
        return familyman_close.familyman_are_end_text
      }
    }

    familymanActions.push(
      {
        text: familyman_wake[firstActionKey as keyof typeof familyman_wake],
        time: BASE_TIME,
        image: 'onub_family_man',
      },
      {
        text: getSecondActionText(firstActionKey),
        time: BASE_TIME,
        image: 'onub_family_man',
      }
    )

    return familymanActions
  } */