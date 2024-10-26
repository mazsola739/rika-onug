import { makeAutoObservable } from 'mobx'

class SceneStore {
  title = ''

  constructor() {
    makeAutoObservable(this)
  }

  setTitle(title: string): void {
    this.title = title
  }
}

export default SceneStore
export const sceneStore = new SceneStore()
