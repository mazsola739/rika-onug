import { getRandomItemFromArray } from '../utils';

//TODO save which interaction!

const randomBodysnatcher = [
  "bodysnatcher_steal_text",
  "bodysnatcher_center_text",
]
const bodysnatcherKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_bothneighbors_text",
]

const createBodysnatcher = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(randomBodysnatcher),
    getRandomItemFromArray(bodysnatcherKeys),
    "bodysnatcher_end_text",
  ]

export const bodysnatcher_narration = () => createBodysnatcher("bodysnatcher_kickoff_text");

export const doppelganger_bodysnatcher_narration = () => createBodysnatcher(
  "doppelganger_bodysnatcher_kickoff_text"
);
