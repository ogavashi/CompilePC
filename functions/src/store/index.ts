import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import { ObjectId } from 'mongodb';

const getStores = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data: any) => {
    const { storesId } = data;

    const db = await getDB();

    const normalizedIds = storesId.map(
      (storeId: string) => new ObjectId(storeId),
    );

    const cursor = await db
      .collection('stores')
      .find({ _id: { $in: normalizedIds } });
    const result = await cursor.toArray();

    return result;
  });

export default getStores;
