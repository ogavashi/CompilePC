import Joi = require('joi');
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import naormalizeFilter from '../common/normalizeFilter';

const schema = Joi.object({
  minPrice: Joi.number(),
  maxPrice: Joi.number(),
}).pattern(Joi.string(), Joi.array().items(Joi.string()));

const getProducts = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { collectionName, filter } = data;
    await schema.validateAsync(filter);

    const db = await getDB();
    const normalizedFilter = naormalizeFilter(filter);
    const cursor = await db.collection(collectionName).find(normalizedFilter);
    const result = await cursor.toArray();

    return result;
  });

export default getProducts;
