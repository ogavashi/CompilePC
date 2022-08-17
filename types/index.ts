// collection categories
export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  mainImage: string;
  description?: string;
  officialWebsite?: string;
  manufacturer?: string;
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
  interface: string;
  GPUModel: string;
  memorySize: string;
  memoryType: string;
  memoryBus: string;
  GPUClockSpeed: string;
  litography: string;
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
