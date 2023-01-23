import { UserAssembly } from './../../../types/index';
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import { User } from '../../../types';
import { ObjectId } from 'mongodb';
import getParts from '../common/getParts';

const saveAssembly = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data): Promise<string> => {
    const { user, assembly, title } = data;

    const db = await getDB();

    try {
      const { insertedId } = await db
        .collection('assemblies')
        .insertOne({ title, assembly, userId: user.id });

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

const updateAssembly = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data): Promise<string> => {
    const { assemblyId, user, assembly, title } = data;

    const db = await getDB();

    try {
      const mongofiedId = new ObjectId(assemblyId);

      await db
        .collection('assemblies')
        .updateOne(
          { _id: mongofiedId },
          { $set: { title, assembly, userId: user.id } },
        );

      return assemblyId;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw new functions.https.HttpsError(
        'internal',
        'Something went wrong. Please try again later.',
      );
    }
  });

const removeAssembly = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { userId, assemblyId } = data;

    const db = await getDB();

    try {
      const mongofiedAssemblyId = new ObjectId(assemblyId);

      await db.collection('assemblies').deleteOne({ _id: mongofiedAssemblyId });

      await db
        .collection('users')
        .updateOne(
          { id: userId },
          { $pull: { assemblies: mongofiedAssemblyId } },
        );
    } catch (error) {
      throw new functions.https.HttpsError(
        'internal',
        'Something went wrong. Please try again later.',
      );
    }
  });

interface RawAssembly {
  _id: ObjectId;
  title: string;
  userId: string;
  assembly: {
    CPU?: string;
    GPU?: string;
    PSU?: string;
    RAM?: string;
    case?: string;
    cooling?: string;
    motherboard?: string;
    SSD?: string;
    HDD?: string;
  };
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

      const parts = await getParts(rawAssembly.assembly);

      const user = (await db
        .collection<User>('users')
        .findOne({ id: userId })) as User;

      if (!user) {
        throw new Error('User not found');
      }

      const { username } = user;

      const result = {
        id: rawAssembly._id.toString(),
        ...rawAssembly,
        username,
        assembly: parts,
      };

      return result;
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

export { saveAssembly, getAssembly, updateAssembly, removeAssembly };
