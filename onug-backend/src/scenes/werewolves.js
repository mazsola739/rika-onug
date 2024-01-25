exports.werewolves = "werewolves_kickoff_text" //show player wolf cards, may choose any center card, swap with any player card - update selected card
exports.werewolves_dreamwolf = "werewolves_dreamwolf_kickoff_text" //show player wolf cards, dreamwolf thumb, may choose any center card, swap with any player card - update selected card
 
exports.werewolves = () => []


/*   generateActions(): RoleActionType[] {
    const werewolfActions: RoleActionType[] = []
    const isDreamWolfInDeck = isCardSelectedById(this.deck, 21)

    const werewolfWakeText = isDreamWolfInDeck
      ? werewolves.dreamwolf_wake_text
      : werewolves.werewolves_wake_text

    werewolfActions.push({
      text: werewolfWakeText,
      time: BASE_TIME,
      image: 'onuw_werewolf',
    })

    if (this.countWolvesInGame() <= 4) {
      werewolfActions.push(
        {
          text: werewolves.werewolves_lonewolf_text,
          time: BASE_TIME,
          image: 'onuw_werewolf',
        },
        generateTimedAction(ACTION_TIME)
      )
    }

    if (isDreamWolfInDeck) {
      werewolfActions.push({
        text: werewolves.dreamwolf_close_text,
        time: BASE_TIME,
        image: 'onud_dream_wolf',
      })
    }

    werewolfActions.push({
      text: werewolves.werewolves_close_text,
      time: BASE_TIME,
      image: 'onuw_werewolf',
    })

    return werewolfActions
  } */