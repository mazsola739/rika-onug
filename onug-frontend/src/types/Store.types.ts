export type RoleActionType = {
  text: string
  time: number
}

export type RoleActionStoreType = {
  generateActions(): RoleActionType[]
}

export type RepeatroleType = {
  name: string
  isExist: boolean
  specialCondition?: () => boolean
}
