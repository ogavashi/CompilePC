import { ObjectId, WithId } from 'mongodb';
import { getDB } from '../bootstrap';

export type ParsedStore = {
  name: string;
  imageUrl: string;
};

interface Store extends WithId<Document> {
  _id: ObjectId;
  name: string;
  imageUrl: string;
}

const updateStoresCollection = async (stores: ParsedStore[]) => {
  const db = await getDB();

  const categoryCollectionRef = db.collection('stores');
  const bulk = categoryCollectionRef.initializeUnorderedBulkOp();

  stores.forEach((store: ParsedStore) => {
    bulk.find(store).upsert().updateOne({ $setOnInsert: store });
  });
  await bulk.execute();

  const storeNames = stores.map((store: ParsedStore) => store.name);

  const rawStoreIds = await Promise.all(
    storeNames.map(
      async (storeName: string) =>
        (await db.collection('stores').findOne({ name: storeName })) as Store,
    ),
  );

  const storeIds = rawStoreIds.map((rawStoreId: Store) =>
    rawStoreId['_id'].toString(),
  );

  return storeIds;
};

export default updateStoresCollection;
