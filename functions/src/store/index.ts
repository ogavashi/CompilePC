import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import { ObjectId, WithId } from 'mongodb';

interface Store extends WithId<Document> {
  _id: ObjectId;
  name: string;
  imageUrl: string;
}

const getStores = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data: any) => {
    const { storesId } = data;

    const db = await getDB();

    const mongofiedIds = storesId.map(
      (storeId: string) => new ObjectId(storeId),
    );

    const rawStores: Store[] = await Promise.all(
      mongofiedIds.map(
        (storeId: string) =>
          db.collection('stores').findOne({ _id: storeId }) as Promise<Store>,
      ),
    );

    const stores = rawStores.map((rawStore: Store) =>
      Object.fromEntries(
        Object.entries(rawStore).map(([key, value]) => [
          key === '_id' ? 'id' : key,
          key === '_id' ? value.toString() : value,
        ]),
      ),
    );

    return stores;
  });

export default getStores;
