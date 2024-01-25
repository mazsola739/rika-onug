exports.supervillains = "supervillains_kickoff_text"  //show known supervillains cards - no update


exports.supervillains = {}


/*   generateActions(): RoleActionType[] {
    const supervillainActions: RoleActionType[] = []

    const isHenchmanAlone =
      isCardSelectedById(this.deck, 60) &&
      !areAnyCardSelectedById(this.deck, [57, 65, 69])

    const wakeText = isHenchmanAlone
      ? supervillains.supervillain_wake_text
      : supervillains.supervillains_wake_text
    const closeText = isHenchmanAlone
      ? supervillains.supervillain_close_text
      : supervillains.supervillains_close_text

    supervillainActions.push({ text: wakeText, time: BASE_TIME, image: '' }) //! ???????

    const cardsToCheck = [69, 57, 65]
    const correspondingTexts = [
      supervillains.temptress_wake_text,
      supervillains.drpeeker_wake_text,
      supervillains.rapscallion_wake_text,
    ]
    const correspondingImages = [
      'onus_temptress',
      'onus_dr_peeker',
      'onus_rapscallion',
    ]

    cardsToCheck.forEach((cardId, index) => {
      if (isCardSelectedById(this.deck, cardId)) {
        supervillainActions.push({
          text: correspondingTexts[index],
          time: BASE_TIME,
          image: correspondingImages[index],
        })
      }
    })

    if (isCardSelectedById(this.deck, 58)) {
      supervillainActions.push(...evilometerStore.generateActions())
    }

    supervillainActions.push(generateTimedAction(2 * ACTION_TIME), {
      text: closeText,
      time: BASE_TIME,
      image: '',
    }) //! ???????

    return supervillainActions
  } */