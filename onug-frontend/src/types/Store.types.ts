export type RoleActionType = {
  text: string
  time: number
  image: string
}

export type RoleActionStoreType = {
  generateActions(): RoleActionType[]
}

export type RepeatroleType = {
  name: string
  isExist: boolean
  specialCondition?: () => boolean
}
