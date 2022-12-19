import { getDB } from '../bootstrap';
import { ObjectId, WithId } from 'mongodb';
import { Store } from '../../../types';

interface RawStore extends WithId<Document> {
  _id: ObjectId;
  name: string;
  imageUrl: string;
}

const getStores = async (storeIDs: string[]) => {
  const db = await getDB();

  const mongofiedIds = storeIDs.map((storeId: string) => new ObjectId(storeId));

  const rawStores: RawStore[] = await Promise.all(
    mongofiedIds.map(
      (storeId: ObjectId) =>
        db.collection('stores').findOne({ _id: storeId }) as Promise<RawStore>,
    ),
  );

  const stores: Store[] = rawStores.map((rawStore: RawStore) => ({
    id: rawStore['_id'].toString(),
    name: rawStore.name,
    imageUrl: rawStore.imageUrl,
  }));

  return stores;
};

export default getStores;
