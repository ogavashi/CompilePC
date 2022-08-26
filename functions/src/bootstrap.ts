import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { MongoClient } from 'mongodb';
import { DEFAULT_REGION, DB_NAME } from './common/constants';

import config from './config';

admin.initializeApp();
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

let client: MongoClient | null;

const getClient = async () => {
  if (!client) {
    const mClient = new MongoClient(config.mongo.url || '', {});
    client = await mClient.connect();
    functions.logger.log('Connected to MongoDB');
  } else {
    functions.logger.log('Using existing MongoDB connection');
  }
  functions.logger.log('Returning client');
  return client;
};

const getDB = async () => {
  return (await getClient()).db(DB_NAME);
};

const helloWorld = functions
  .region(DEFAULT_REGION)
  .https.onRequest(async (request, response) => {
    const db = (await getClient()).db('CompilePC');
    const result = await db.collection('CPUs').findOne({});
    console.log(result);
    response.send('Hello from Firebase!');
  });

export { helloWorld, getDB };
