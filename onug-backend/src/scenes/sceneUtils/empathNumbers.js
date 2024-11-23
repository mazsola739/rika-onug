export const empathNumbers = (totalPlayers, evenOdd = '') => {
  const numbers = []

  totalPlayers = Math.min(Math.max(1, totalPlayers), 12)

  let start = 1
  let step = 1
  if (evenOdd === 'even') {
    start = 2
    step = 2
  } else if (evenOdd === 'odd') {
    start = 1
    step = 2
  }

  for (let i = start; i <= totalPlayers; i += step) {
    numbers.push(i)
  }

  return numbers
}
