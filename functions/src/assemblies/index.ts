import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import getParts from '../common/getParts';

const getAssemblies = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { userId } = data;

    const db = await getDB();

    const cursor = await db.collection('assemblies').find({ userId });
    const rawAssemblies = await cursor.toArray();

    const assemblies = await Promise.all(
      rawAssemblies.map(async (rawAssembly) => {
        const parts = await getParts(rawAssembly.assembly);

        const assembly = {
          id: rawAssembly._id.toString(),
          ...rawAssembly,
          assembly: parts,
        };

        return assembly;
      }),
    );

    const result = assemblies;

    return result;
  });

export default getAssemblies;
