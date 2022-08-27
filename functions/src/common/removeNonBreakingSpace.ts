import { regexes } from './constants';

const removeNonBreakingSpace = (value: string) => {
  return value.replace(regexes.nonBreakingSpace, ' ');
};

export { removeNonBreakingSpace };
