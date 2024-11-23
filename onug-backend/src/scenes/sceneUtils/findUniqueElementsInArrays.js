export const findUniqueElementsInArrays = (array1, array2) => {
    const set = new Set(array1)
    const uniqueFromArray2 = array2.filter(item => !set.has(item))
    const uniqueFromArray1 = array1.filter(item => !array2.includes(item))
    const uniqueElements = uniqueFromArray1.concat(uniqueFromArray2)
  
    return uniqueElements
  }
  