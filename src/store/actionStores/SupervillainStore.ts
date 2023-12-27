import { BASE_TIME, supervillains } from 'constant'
import { evilometerStore } from 'store'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { formatActionTimeText, isCardSelectedById, areAnyCardsSelectedById } =
  actionStoreUtils

class SupervillainStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const supervillainActions: RoleActionType[] = []

    const isHenchmanAlone =
      isCardSelectedById(this.deck, 60) &&
      !areAnyCardsSelectedById(this.deck, [57, 65, 69])

    const wakeText = isHenchmanAlone
      ? supervillains.supervillain_wake_text
      : supervillains.supervillains_wake_text
    const closeText = isHenchmanAlone
      ? supervillains.supervillain_close_text
      : supervillains.supervillains_close_text

    supervillainActions.push({ text: wakeText, time: BASE_TIME })

    const cardsToCheck = [69, 57, 65]
    const correspondingTexts = [
      supervillains.temptress_wake_text,
      supervillains.drpeeker_wake_text,
      supervillains.rapscallion_wake_text,
    ]

    cardsToCheck.forEach((cardId, index) => {
      if (isCardSelectedById(this.deck, cardId)) {
        supervillainActions.push({
          text: correspondingTexts[index],
          time: BASE_TIME,
        })
      }
    })

    if (isCardSelectedById(this.deck, 58)) {
      supervillainActions.push(...evilometerStore.generateActions())
    }

    supervillainActions.push({
      text: formatActionTimeText(this.actionTime),
      time: this.actionTime,
    })
    supervillainActions.push({ text: closeText, time: BASE_TIME })

    return supervillainActions
  }
}

export default SupervillainStore
export const supervillainStore = new SupervillainStore()
