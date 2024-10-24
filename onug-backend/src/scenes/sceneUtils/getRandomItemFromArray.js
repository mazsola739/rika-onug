import { getRandomNumber } from './getRandomNumber';

export const getRandomItemFromArray = array => array[getRandomNumber(0, array.length - 1)]