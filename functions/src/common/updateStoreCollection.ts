import { Store } from '../../../types';
import { getDB } from '../bootstrap';

const updateStoresCollection = async (stores: Store[]) => {
  const db = await getDB();

  const categoryCollectionRef = db.collection('stores');
  const bulk = categoryCollectionRef.initializeUnorderedBulkOp();

  stores.forEach((store: Store) => {
    bulk.find(store).upsert().updateOne({ $setOnInsert: store });
  });
  await bulk.execute();

  const storeNames = stores.map((store: Store) => store.name);

  // TODO: will be fixed by @vitalyacode
  // You should do it with bulk
  const rawStoreIds = await Promise.all(
    storeNames.map(
      async (storeName: string) =>
        await db.collection('stores').findOne({ name: storeName }),
    ),
  );

  const storeIds = rawStoreIds.map((rawStoreId: any) =>
    rawStoreId['_id'].toString(),
  );

  return storeIds;
};

export default updateStoresCollection;
