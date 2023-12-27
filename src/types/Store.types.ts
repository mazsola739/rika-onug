export interface RoleActionType {
  text: string
  time: number
}

export interface RoleActionStoreType {
  generateActions(): RoleActionType[]
}

export interface ConjunctionType {
  conjunction: 'and' | 'or'
} //TODO
