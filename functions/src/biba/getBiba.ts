import * as functions from 'firebase-functions';

import { DEFAULT_REGION } from '../common/constants';

const getBiba = functions.region(DEFAULT_REGION).https.onCall(async () => {
  return 'biba';
});

export default getBiba;
