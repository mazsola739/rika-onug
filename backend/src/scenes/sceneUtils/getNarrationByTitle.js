export const getNarrationByTitle = (title, narrations) => {
  for (const narration of narrations) {
    if (narration[title]) {
      return narration[title]
    }
  }
  return null
}
