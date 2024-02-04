import { makeAutoObservable } from 'mobx'
import * as constants from '../constant'
import { ScriptType } from 'types'
import { script } from 'data'

class NarrationStore {
  narration: string[] = []
  title = ''

  constructor() {
    makeAutoObservable(this)
  }

  setNarration(narration: string[]): void {
    this.narration = narration
  }

  setTitle(title: string): void {
    this.title = title
  }

  getNarrationMessage(): string | undefined {
    if (!this.narration || this.narration.length === 0) {
      return ''
    }

    const narrationMessage = this.narration
      .map((constantName) => constants[constantName as keyof typeof constants])
      .filter((constantValue) => constantValue !== undefined)
      .join(' ')

    return narrationMessage || ''
  }

  getNarrationImage(): string {
    if (!this.title || this.title.length === 0) {
      return ''
    }

    const scene = script.find(
      (scene: ScriptType) => scene.scene_title === this.title
    )

    if (!scene || scene.scene_img === '') {
      return ''
    }

    return scene.scene_img
  }
}

export default NarrationStore
export const narrationStore = new NarrationStore()
