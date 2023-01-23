import { Assembly, Part } from '../../../types';
import { getDB } from '../bootstrap';
import { ProductCategories } from './constants';

interface RawAssembly {
  CPU?: string;
  GPU?: string;
  PSU?: string;
  RAM?: string;
  case?: string;
  cooling?: string;
  motherboard?: string;
  SSD?: string;
  HDD?: string;
}

const getParts = async (assembly: RawAssembly) => {
  type AssemblyPartsKeys = keyof typeof assembly;

  const db = await getDB();

  const rawParts: Part[] = await Promise.all(
    Object.keys(assembly).map((key) => {
      const category = ProductCategories[key as AssemblyPartsKeys];

      const part = db.collection<Part>(category.collectionName).findOne({
        id: assembly[key as AssemblyPartsKeys],
      });

      return part as Promise<Part>;
    }),
  );

  const parts = Object.fromEntries(
    Object.keys(assembly).map((key, index) => [key, rawParts[index]]),
  );
  return parts as Assembly;
};

export default getParts;
