import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';

const getAssemblies = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { userId } = data;

    const db = await getDB();

    const cursor = await db.collection('assemblies').find({ userId });
    const rawAssemblies = await cursor.toArray();

    const assemblies = rawAssemblies.map((rawAssembly) => ({
      id: rawAssembly._id.toString(),
      ...rawAssembly,
    }));

    return assemblies;
  });

export default getAssemblies;
