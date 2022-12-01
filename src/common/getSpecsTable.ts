import {
  ProductCategory,
  CPU,
  GraphicsCard,
  Motherboard,
  RAM,
  HardDrive,
  SolidStateDrive,
  Case,
  Cooling,
  PSU,
} from '../../types/index';

export type Spec = { title: string; value: string | boolean | number };

export type SpecBlock = {
  name: string;
  specs: Spec[];
};

const isCPU = (obj: any): obj is CPU => !!obj.cores;
const isGPU = (obj: any): obj is GraphicsCard => !!obj.GPUModel;
const isMotherboard = (obj: any): obj is Motherboard => !!obj.BIOS;
const isRAM = (obj: any): obj is RAM => !!obj.timing;
const isHDD = (obj: any): obj is HardDrive => !!obj.RPM;
const isSSD = (obj: any): obj is SolidStateDrive => !!obj.nVMe;
const isCase = (obj: any): obj is Case => !!obj.boardPlacement;
const isCooling = (obj: any): obj is Cooling => !!obj.heatPipes;
const isPSU = (obj: any): obj is PSU => obj !== undefined;

const getSpecsTable = (product: ProductCategory) => {
  if (isMotherboard(product)) return 'Motherboard';
  if (isGPU(product)) return 'GPU';
  if (isCPU(product)) return 'CPU';
  return 0;
};

export default getSpecsTable;
