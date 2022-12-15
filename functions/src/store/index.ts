import { getDB } from '../bootstrap';
import { ObjectId, WithId } from 'mongodb';

interface Store extends WithId<Document> {
  _id: ObjectId;
  name: string;
  imageUrl: string;
}

const getStores = async (storeIDs: string[]) => {
  const db = await getDB();

  const mongofiedIds = storeIDs.map((storeId: string) => new ObjectId(storeId));

  const rawStores: Store[] = await Promise.all(
    mongofiedIds.map(
      (storeId: ObjectId) =>
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
};

export default getStores;
