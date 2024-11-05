import { voteStore } from "store"

export const useRoleCard = (id: number) => {
  
    const handleGuessClick =() => {
      voteStore.selectGuessId(id)
    }
  
    return { handleGuessClick }
  }