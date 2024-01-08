import { random_blob, blob, BASE_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { selectRandomKey } = utils

class BlobStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
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
  }
}

export default BlobStore
export const blobStore = new BlobStore()
