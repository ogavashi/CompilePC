import Joi = require('joi');
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import { Offer } from '../../../types';
import getStores from '../store';

const getProductSchema = Joi.object({
  id: Joi.string(),
});

const getProduct = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { id, collectionName } = data;

    await getProductSchema.validateAsync({ id });

    const db = await getDB();

    const product = await db.collection(collectionName).findOne({ id });

    const storesId = product?.price.offers.map((store: Offer) => store.storeId);

    const stores = await getStores(storesId);

    return { ...product, stores };
  });

export default getProduct;
