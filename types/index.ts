// collection categories
export type Category = {
  id: string;
  name: string;
  listNumber: string;
};

export type Product = {
  id: string;
  name: string;
  mainImage: string;
  description?: string;
  officialWebsite?: string;
  manufacturer: string;
};

// collection CPUs
export type CPU = Product & {
  series: string;
  codeName: string;
  socket: string;
  litography: number;
  cores: number;
  threads: number;
  clockSpeed: number;
  turboBoost?: number;
  l1Cache: number;
  l2Cache: number;
  l3Cache: number;
  IGP?: string;
  TDP: number;
  PSIExpress: string;
  maxOperatingTemperature: string;
  maxDDR4Speed: string;
  channels: string;
};

// collection graphicsCards
export type GraphicsCard = Product & {
  interface: string;
  GPUModel: string;
  memorySize: number;
  memoryType: string;
  memoryBus: number;
  GPUClockSpeed: number;
  litography: number;
  maxResolution: string;
  HDMI: number;
  HDMIVersion: string;
  displayPort?: number;
  displayPortVersion?: string;
  directX: string;
  openGL: number;
  isVRReady: boolean;
  streamProcessors: number;
  textureUnits: number;
  monitorsConnection: number;
  cooling: string;
  fans: number;
  additionalPower: string;
  minPSU: number;
  numberOfSlots: number;
  size: string; // e.g. 200x123x38
};

type MotherboardFormFactor =
  | 'mini-ITX'
  | 'micro-ATX'
  | 'ATX'
  | 'E-ATX'
  | 'XL-ATX';

// collection motherboards
export type Motherboard = Product & {
  socket: string;
  formFactor: MotherboardFormFactor;
  powerPhases: number;
  VRMHeatsink?: boolean;
  size: string; // e.g. 226x211 mm
  chipset: string;
  BIOS: string;
  DDR4: string;
  memoryModule: string;
  operationMode: number;
  maxClockFrequency: number;
  maxMemory: number;
  VGA: boolean;
  HDMI: boolean;
  HDMIVersion: string;
  displayPort?: boolean;
  displayPortVersion?: string;
  audiochip: string;
  sound: number;
  sata3: number;
  m2: string;
  PSI_E_16x: number;
  PCIExpressVerison: string;
  ExternalUSB_2_0: number;
  ExternalUSB_3_2_gen1: number;
  ExternalUSB_3_2_gen2: number;
  InternalUSB_2_0: number;
  InternalUSB_3_2_gen1: number;
  InternalUSB_3_2_gen2: number;
  mainPowerSocket: number;
  CPUPowerSocket: number;
  FanPowerConnectors: number;
};

// collection RAM
export type RAM = Product & {
  colour: string;
  capacity: number;
  modules: number;
  formFactor: string;
  type: string;
  speed: number;
  clockSpeed: number;
  timing: string;
  voltage: number;
  cooling: string;
  moduleProfile: string;
  moduleHeight: string;
};

// collection hardDrives
export type HardDrive = Product & {
  placement: string;
  type: string;
  capacity: number;
  formFactor: string;
  cacheMemory: number;
  recordTechnology: string;
  RPM: number;
  dataTransferRate: number;
  operationPowerConsumption: number;
  standbyPowerConsumption: number;
  MTBF: number;
  size: string; // e.g. 147x102x20 mm
  weight: number;
};
