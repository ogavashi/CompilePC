import { Assembly } from './../../../types/index';
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import { User, UserAssembly } from '../../../types';
import { ObjectId } from 'mongodb';

const saveAssembly = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data): Promise<string> => {
    const { user, assembly } = data;

    const db = await getDB();

    try {
      const { insertedId } = await db
        .collection('assemblies')
        .insertOne({ ...assembly, userId: user.id });

      await db
        .collection('users')
        .updateOne(
          { id: user.id, username: user.username, email: user.email },
          { $push: { assemblies: insertedId } },
          { upsert: true },
        );

      return insertedId.toString();
    } catch (error) {
      throw new functions.https.HttpsError(
        'internal',
        'Something went wrong. Please try again later.',
      );
    }
  });

interface RawAssembly extends Assembly {
  _id: ObjectId;
  title: string;
  userId: string;
}

const getAssembly = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data): Promise<UserAssembly> => {
    const { id } = data;

    const db = await getDB();

    try {
      const rawAssembly = (await db
        .collection<RawAssembly>('assemblies')
        .findOne({ _id: new ObjectId(id) })) as RawAssembly;

      if (!rawAssembly) {
        throw new Error('Assembly not found');
      }

      const { userId } = rawAssembly;

      const user = (await db
        .collection<User>('users')
        .findOne({ id: userId })) as User;

      if (!user) {
        throw new Error('User not found');
      }

      const { username } = user;

      const assembly: UserAssembly = {
        id: rawAssembly._id.toString(),
        ...rawAssembly,
        username,
      };

      return assembly;
    } catch (error) {
      if (error instanceof Error) {
        throw new functions.https.HttpsError('not-found', error.message);
      }
      throw new functions.https.HttpsError(
        'internal',
        'Something went wrong, please try again later',
      );
    }
  });

export { saveAssembly, getAssembly };
