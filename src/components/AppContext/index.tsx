import React, { createContext, useCallback, useState } from 'react';
import useQueryParams from '../../hooks/useQueryParams';
import {
  Build,
  CategoryName,
  CPU,
  Part,
  ProductCategory,
} from '../../../types';

export const mockCPU: CPU = {
  id: 'AMD-3600-BOX',
  name: 'AMD Ryzen 5 Matisse 3600 BOX',
  mainImage: 'https://s.ek.ua/jpg_zoom1/1485969.jpg',
  brand: 'AMD',
  description:
    '<h3>The Fab Five</h3><p> The Ryzen 5 3600 is currently the youngest member of the AMD Matisse 7nm processor family (while the even more economical 3200G and 3400G hybrid processors belong to the 12nm Raven Ridge family). The 3600 has six physical cores of the Zen 2 architecture and twelve virtual SMT threads, as well as a little, no small amount, 32 MB of L3 cache.</p><h3> Multithreading and single threading</h3><p> The frequency formula of the Ryzen 5 3600 is 3.6 – 4.1 GHz. The first number means the base, that is, the guaranteed frequency for all cores, and the second — the maximum frequency of auto-overclocking when only one core is loaded. Most of the time, the frequency is kept somewhere in the middle — 3.8 – 3.9 GHz. A simple cooler is supplied with the boxed version of the processor, but it is not enough to even boost the processor to the maximum, not to mention manual overclocking.</p><h3> Can be overclocked</h3><p> The unlocked multiplier allows you to raise the frequency of the Ryzen 5 3600 to the level of $ 50 more expensive 3600X or even slightly higher (up to 4.2 – 4.3 GHz on all cores). But only if you have a motherboard with good power stabilization (Load-Line Calibration), and these are usually mid-price and flagship models based on the X570 chipset.</p><h3> Progress on the face</h3><p> Definitely, AMD Ryzen 5 3600 was a success. The increased number of instructions processed per cycle compared to Zen +, as well as an increase in the frequency of several hundred megahertz, led to the fact that the newcomer is faster than its predecessor 2600 by about a quarter. Well, in the future, if desired, it will be possible to upgrade to a twice as powerful Ryzen 9 3900X with twelve cores and twenty-four threads.</p>',
  price: {
    offers: [
      {
        storeId: '6320c248332e9aa694fe5d53',
        price: 6734,
        link: 'https://ek.ua/en/clcp.php?ep_=R0LV031J510J1J2H3J1J4Q0J1J2J4J1J090J1J18131J3Q0J1J361J1J13131J1N231J50531J2G131J51531J1Q0J1J51531I0E0J1J0Q331O&model_=AMD+Ryzen+5+3600+%28100-100&idSite_=1&idGood_=1485970',
      },
    ],
    range: {
      minPrice: 4499,
      maxPrice: 7926,
    },
  },
  officialWebsite: 'amd.com',
  series: 'Ryzen 5',
  codeName: 'Matisse (Zen 2)',
  socket: 'AMD AM4',
  cores: '6 cores',
  threads: '12 threads',
  clockSpeed: '3.6 GHz',
  turboBoost: '4.2 GHz',
  l2Cache: '3072 KB',
  l3Cache: '3072 KB',
  IGP: 'no',
  TDP: '65 W',
  PSIExpress: '4.0',
  maxDDR4Speed: '3200 MHz',
  channels: '2',
};

const emptyBuild: Build = {
  CPU: null,
  GPU: null,
  PSU: null,
  RAM: null,
  case: null,
  cooling: null,
  motherboard: null,
  SSD: null,
  HDD: null,
};

export const AppContext = createContext<BuildScreenProps>(
  {} as BuildScreenProps,
);

interface BuildScreenProps {
  selectedBuilder: ProductCategory | null;
  selectedFilter: string | null;
  filters: Record<string, string> | null;
  build: Build;
  addPart: (part: Part, category: CategoryName) => void;
  removePart: (category: CategoryName) => void;
  clearBuild: () => void;
  handleSelectBuilder: (value: ProductCategory) => void;
  handleSelectFilter: (value: string) => void;
  handleChangeFilters: (value: Record<string, string> | null) => void;
  setSelectedFilter: (value: string | null) => void;
}

export const AppContextProvider: React.FC = ({ children }) => {
  // TODO: Move selectedBuilder to query string
  const [selectedBuilder, setSelectedBuilder] =
    useState<ProductCategory | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string> | null>(null);
  const [build, setBuild] = useState<Build>(emptyBuild);

  const { setSearchParams } = useQueryParams();

  const addPart = (part: Part, category: CategoryName) => {
    setBuild((prev) => ({ ...prev, [category]: part }));
  };

  const removePart = (category: CategoryName) => {
    setBuild((prev) => ({ ...prev, [category]: null }));
  };

  const clearBuild = () => {
    setBuild(emptyBuild);
  };

  const handleSelectBuilder = (panel: ProductCategory) => {
    // Erase query string and filters in state whenever new builder is opened
    if (panel !== selectedBuilder && selectedBuilder !== null) {
      setSearchParams({});
      setFilters(null);
    }
    setSelectedBuilder((prev) => (prev === panel ? null : panel));
  };

  const handleSelectFilter = (panel: string) => {
    setSelectedFilter((prev) => (prev === panel ? null : panel));
  };

  const handleChangeFilters = useCallback(
    (filter: Record<string, string> | null) => {
      setFilters((prev) => ({ ...prev, ...filter }));
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{
        selectedBuilder,
        handleSelectBuilder,
        selectedFilter,
        handleSelectFilter,
        setSelectedFilter,
        filters,
        handleChangeFilters,
        build,
        addPart,
        removePart,
        clearBuild,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
