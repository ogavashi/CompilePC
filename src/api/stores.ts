import { Store } from '../../types';
import functions from '../common/firebaseFunctons';

const Stores = {
  getByIDs: async (ids: string[]): Promise<Store[]> => {
    const getStores = functions.httpsCallable('getStores');
    const { data: stores }: { data: Store[] } = await getStores({
      ids,
    });
    return stores;
  },
};

export default Stores;
