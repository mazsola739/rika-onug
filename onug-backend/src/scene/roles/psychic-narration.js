import { getRandomItemFromArray } from '../utils';

//TODO save which interaction!

const random_psychic = ["psychic_view1_text", "psychic_view2_text"]
const psychicKeys = ["identifier_anyeven_text", "identifier_anyodd_text"]

const createPsychic = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(random_psychic),
    getRandomItemFromArray(psychicKeys),
  ]

export const psychic = () => createPsychic("psychic_kickoff_text");

export const doppelganger_psychic = () =>
  createPsychic("doppelganger_psychic_kickoff_text");
