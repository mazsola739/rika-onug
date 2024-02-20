import { getRandomItemFromArray } from '../utils';

//TODO save which interaction!

const randomExposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]

const createExposer = (kickoffText) => () =>
  [kickoffText, getRandomItemFromArray(randomExposer)]

export const exposer_narration = () => createExposer("exposer_kickoff_text");

export const doppelganger_exposer = () =>
  createExposer("doppelganger_exposer_kickoff_text");
