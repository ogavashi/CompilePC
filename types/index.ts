import { ProductCategories } from '../src/common/constants';

// collection categories
export type Category = {
  id: string;
  name: string;
};

export type Offer = {
  storeId: string;
  price: number;
  link: string;
};

export type PriceRange = {
  minPrice: number;
  maxPrice: number;
};

export type Price = {
  offers: Offer[];
  range: PriceRange;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  mainImage: string;
  description?: string;
  officialWebsite?: string;
  manufacturer?: string;
  price: Price;
};

export type Store = {
  id: string;
  name: string;
  imageUrl: string;
};

// collection CPUs
export type CPU = Product & {
  series?: string;
  codeName?: string;
  socket?: string;
  litography?: string;
  cores?: string;
  threads?: string;
  clockSpeed?: string;
  turboBoost?: string;
  l1Cache?: string;
  l2Cache?: string;
  l3Cache?: string;
  IGP?: string;
  TDP?: string;
  PSIExpress?: string;
  maxOperatingTemperature?: string;
  maxDDR4Speed?: string;
  channels?: string;
};

// collection graphicsCards
export type GraphicsCard = Product & {
  vendor: string;
  interface: string;
  GPUModel: string;
  memorySize: string;
  memoryType: string;
  memoryBus: string;
  GPUClockSpeed: string;
  litography?: string;
  maxResolution: string;
  HDMI: string;
  HDMIVersion: string;
  displayPort?: string;
  displayPortVersion?: string;
  directX: string;
  openGL: string;
  isVRReady: boolean;
  streamProcessors: string;
  textureUnits: string;
  monitorsConnection: string;
  cooling: string;
  fans: string;
  additionalPower: string;
  minPSU: string;
  numberOfSlots: string;
  size: string; // e.g. 200x123x38
};

export type MotherboardFormFactor =
  | 'mini-ITX'
  | 'micro-ATX'
  | 'ATX'
  | 'E-ATX'
  | 'XL-ATX';

// collection motherboards
export type Motherboard = Product & {
  socket?: string;
  formFactor?: MotherboardFormFactor;
  powerPhases?: string;
  VRMHeatsink?: boolean;
  size?: string; // e.g. 226x211 mm
  chipset?: string;
  BIOS?: string;
  DDR4?: string;
  memoryModule?: string;
  operationMode?: string;
  maxClockFrequency?: string;
  maxMemory?: string;
  VGA?: boolean;
  HDMI?: boolean;
  HDMIVersion?: string;
  displayPort?: boolean;
  displayPortVersion?: string;
  audiochip?: string;
  sound?: string;
  sata3?: string;
  m2?: string;
  PSI_E_16x?: string;
  PCIExpressVerison?: string;
  ExternalUSB_2_0?: string;
  ExternalUSB_3_2_gen1?: string;
  ExternalUSB_3_2_gen2?: string;
  InternalUSB_2_0?: string;
  InternalUSB_3_2_gen1?: string;
  InternalUSB_3_2_gen2?: string;
  mainPowerSocket?: string;
  CPUPowerSocket?: string;
  FanPowerConnectors?: string;
};

// collection RAM
export type RAM = Product & {
  colour: string;
  capacity: string;
  modules: string;
  formFactor: string;
  type: string;
  speed: string;
  clockSpeed: string;
  timing: string;
  voltage: string;
  cooling: string;
  moduleProfile: string;
  moduleHeight: string;
};

// collection hardDrives
export type HardDrive = Product & {
  placement: string;
  type: string;
  capacity: string;
  formFactor: string;
  cacheMemory: string;
  recordTechnology: string;
  RPM: string;
  dataTransferRate: string;
  operationPowerConsumption: string;
  standbyPowerConsumption: string;
  MTBF: string;
  size: string; // e.g. 147x102x20 mm
  weight: string;
};

// collection solidStateDrives
export type SolidStateDrive = Product & {
  placement: string;
  capacity: string;
  formFactor: string;
  m2Interface: string;
  controller: string;
  cacheMemory: string;
  memoryType: string;
  nVMe: string;
  writeSpeed: string;
  readSpeed: string;
  writeIOPS: string;
  readIOPS: string;
  TBW: string;
  MTBF: string;
  trim: boolean;
  size: string;
  weight: string;
};

// collection cases
export type Case = Product & {
  colour: string | undefined;
  target: string;
  mount: string;
  motherboardFormFactor: string;
  boardPlacement: string;
  psuMaxLength: string;
  gpuMaxLength: string;
  rubberFeet: boolean;
  PSU: boolean;
  psuMount: string;
  expansionSlots: number;
  openMechanism: string;
  fansTotal: string;
  fansInfo: Record<string, string>[];
  fansMountTotal: number;
  gridFrontPanel: boolean;
  dustFilter: boolean;
  liquidCoolingSupport: boolean;
  liquidCoolingMountsTotal: number;
  liquidPlacement: string;
  liquidCoolingInfo: Record<string, string>[];
  usb32Gen1: number;
  usb32Gen2: number;
  usb20: number;
  audioPort: boolean;
  material: string;
  weight: string;
  size: string;
  frontPanel: string;
};

// collection coolings
export type Cooling = Product & {
  target: string;
  type: string;
  fans: number;
  heatPipes: number;
  heatPipeContact: string;
  heatSinkMaterial: string;
  plateMaterial: string;
  mountType: string;
  socket: string[];
  fanSize: string;
  bearing: string;
  minRPM: string;
  maxRPM: string;
  speedController: string;
  maxAirFlow: string;
  maxTDP: string;
  airFlowDirection: string;
  replaceable: boolean;
  staticPreasure: string;
  lighting: boolean;
  lightingColour: string;
  powerSource: string;
  minNoiseLevel: string;
  noiseLevel: string;
  dimensions: string;
  height: string;
  weight: string;
};

// collection PSUs
export type PSU = Product & {
  power: string;
  formFactor: string;
  PFC: string;
  efficiency: string;
  coolingSystem: string;
  fanSize: string;
  fanBearings: string;
  certification: string;
  atx12vVersion: number;
  powerSupply: string;
  SATA: number;
  MOLEX: number;
  PCIE8pin: number;
  cableSystem: string;
  braidedWires: boolean;
  mbCableLength: string;
  cpuCableLength: string;
  sataCableLength: string;
  molexCableLength: string;
  PCIECableLength: string;
};

export type CategoryName = keyof typeof ProductCategories;

// Product builders
export type BuilderCategory =
  typeof ProductCategories[CategoryName]['builderTitle'];

export type CollectionName =
  typeof ProductCategories[CategoryName]['collectionName'];

export type Part =
  | CPU
  | GraphicsCard
  | Motherboard
  | RAM
  | HardDrive
  | SolidStateDrive
  | Case
  | Cooling
  | PSU;

export type Spec = { title: string; value: string | boolean | number };

export type SpecBlock = {
  name: string;
  specs: Spec[];
};

export type ProductCategory = {
  categoryName: CategoryName;
  builderTitle: BuilderCategory;
  collectionName: CollectionName;
};

export type ShortSpec = { name: string; value?: string };

export type FullProduct = Product & {
  stores: Store[];
};

export type Build = {
  CPU: CPU | null;
  GPU: GraphicsCard | null;
  PSU: PSU | null;
  RAM: RAM | null;
  case: Case | null;
  cooling: Cooling | null;
  motherboard: Motherboard | null;
  SSD: SolidStateDrive | null;
  HDD: HardDrive | null;
};

export type QueryFilter = { [k: string]: string | string[] };
