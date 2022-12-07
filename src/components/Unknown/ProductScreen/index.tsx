import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import {
  CategoryName,
  GraphicsCard,
  ProductCategory,
  Store,
} from '../../../../types';
import { DEFAULT_REGION, ProductCategories } from '../../../common/constants';

import { UIContext } from '../UIContext';
import OverviewTab from './OverviewTab';
import PriceTable from './PriceTable';
import useStyles from './styles';

const mockProduct: GraphicsCard = {
  id: 'ASUS-GEFORCE-RTX-3060-DUAL-V2-OC-LHR',
  name: 'Asus GeForce RTX 3060 Dual V2 OC LHR',
  mainImage: 'https://s.ek.ua/jpg_zoom1/2066429.jpg',
  price: {
    offers: [
      {
        storeId: '6320c248332e9aa694fe5d53',
        price: 17777,
        link: 'https://ek.ua/en/clcp.php?ep_=U0LU031J510J1J2H3J1J4Q0J1J2J431J4P331J0P131J0Q0J1J361J1J13031J2P431J50531J2G131J51531J1Q0J1J51531I0E0J1J0Q131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '63219ee3332e9aa694f9ae6e',
        price: 18259,
        link: 'https://ek.ua/en/clcp.php?ep_=TGKI031J510J1J16231J1A0J1J2J4J1J2P231J1O2J1J1A0J1J361J1J13031J2P431J50531J2G131J51531J1Q131J51531I0E0J1J4A131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d58',
        price: 21101,
        link: 'https://ek.ua/en/clcp.php?ep_=SBRA031J543J1J35031J512J1J1P3J1J0H031J1L031J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J53531J0Q0313713J1J5223&model_=Asus+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cd92332e9aa69419bc23',
        price: 20897,
        link: 'https://ek.ua/en/clcp.php?ep_=3FRF031J560J1J0M1J1J512J1J1P3J1J1J4J1J2O4J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J54531J0Q0313713J1J5223&model_=Asus+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cd8a332e9aa69419ab52',
        price: 17499,
        link: 'https://ek.ua/en/clcp.php?ep_=0ULR031J510J1J2H031J4Q0J1J2J4J1J47131J2M031J3Q0J1J361J1J13031J2P431J50531J2G131J51531J1Q2J1J51531I0E0J1J3A131K&model_=Asus+%28DUAL-RTX3060-O12G-V&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d5a',
        price: 17465,
        link: 'https://ek.ua/en/clcp.php?ep_=SL07031J57331J421J1J512J1J1P1J1J07331J321J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J56531J0Q031371331J5223&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d55',
        price: 18331,
        link: 'https://ek.ua/en/clcp.php?ep_=1VPD031J51031J254J1J0Q0J1J2J4J1J184J1J3K4J1J2A0J1J361J1J13031J2P431J50531J2G131J51531J1Q3J1J51531I0E0J1J2Q131K&model_=Asus+RTX+3060+12Gb+Dual+O&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d5d',
        price: 17291,
        link: 'https://ek.ua/en/clcp.php?ep_=P0SO031J58431J0G031J512J1J1P1J1J022J1J2J031J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J58531J0Q0313712J1J5223&model_=ASUS+DUAL-RTX3060-O12G-V2&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cffe332e9aa6941f5e50',
        price: 18020,
        link: 'https://ek.ua/en/clcp.php?ep_=57UM031J59431J282J1J512J1J1P431J2O331J284J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J59531J0Q0313712J1J5223&model_=Asus+%28DUAL-RTX3060-O12G-V&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d5b',
        price: 18926,
        link: 'https://ek.ua/en/clcp.php?ep_=T9RQ031J55331J28131J512J1J1P431J3G031J4J231J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J51031J51531I0E0J1J2Q131K&model_=Asus+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d5f',
        price: 18722,
        link: 'https://ek.ua/en/clcp.php?ep_=RDNB031J55331J0K131J512J1J1P431J44031J1O0J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J510J1J51531I0E0J1J1A131K&model_=asus+GeForce+rtx3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cd6f332e9aa694196a22',
        price: 17777,
        link: 'https://ek.ua/en/clcp.php?ep_=P0TC031J560J1J393J1J512J1J1P131J16431J3K1J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J51131J51531I0E0J1J0Q131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d63',
        price: 18607,
        link: 'https://ek.ua/en/clcp.php?ep_=SURE031J59331J193J1J512J1J1P231J211J1J3M331J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J511J1J51531I0E0J1J0Q131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d64',
        price: 17777,
        link: 'https://ek.ua/en/clcp.php?ep_=RCOM031J58131J2K131J512J1J1P3J1J40331J03031J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J51231J51531I0E0J1J0Q131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d54',
        price: 17799,
        link: 'https://ek.ua/en/clcp.php?ep_=16Q9031J552J1J18231J512J1J1O3J1J150J1J4N331J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J512J1J51531I0E0J1J5223&model_=Asus+GeForce+RTX+3060+Dua&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cffe332e9aa6941f5e53',
        price: 18498,
        link: 'https://ek.ua/en/clcp.php?ep_=29UL031J56031J4M2J1J512J1J1O2J1J47431J4L131J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J51331J51531I0E0J1J5223&model_=Asus+DUAL-RTX3060-O12G-V2&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d66',
        price: 18686,
        link: 'https://ek.ua/en/clcp.php?ep_=SEOD031J592J1J32131J512J1J1P231J09131J0G0J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J513J1J51531I0E0J1J5223&model_=ASUS+GeForce+RTX+3060+DUA&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d67',
        price: 18000,
        link: 'https://ek.ua/en/clcp.php?ep_=0JQL031J560J1J2N2J1J512J1J1P231J112J1J3J231J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J51431J51531I0E0J1J5223&model_=Asus+%D0%92%D1%96%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D1%80%D1%82%D0%B0+DUAL-RTX3&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320d03a332e9aa6941fe6b9',
        price: 18315,
        link: 'https://ek.ua/en/clcp.php?ep_=6SQ8031J592J1J2P231J512J1J1P2J1J470J1J344J1J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J514J1J51531I0E0J1J5223&model_=Asus+DUAL-RTX3060-O12G-V2&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cda7332e9aa69419f0da',
        price: 19359,
        link: 'https://ek.ua/en/clcp.php?ep_=VANM031J583J1J122J1J512J1J1P331J2M031J1O231J51331J33131J1G2J1J4O531J0A2J1J02531J0Q1J1J52031J51531I0E0J1J5223&model_=ASUS+DUAL-RTX3060-O12G-V2&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320cd8a332e9aa69419ab51',
        price: 17499,
        link: 'https://ek.ua/en/clcp.php?ep_=6SLH031J58331J054J1J512J1J1P431J481J1J3O4J1J51331J33131J1G331J00531J0A2J1J02531J0Q1J1J520J1J51531I0E0J1J5223&model_=ASUS+GeForce+RTX+3060+12G&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d65',
        price: 16811,
        link: 'https://ek.ua/en/clcp.php?ep_=Q9J4031J510J1J27231J0A0J1J2J4J1J49031J100J1J4A0J1J361J1J13031J30031J50531J2G131J51531J1Q131J1A0J1J50721J0Q131K&model_=ASUS+GeForce+RTX3060+12Gb&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d69',
        price: 18699,
        link: 'https://ek.ua/en/clcp.php?ep_=1SLB031J552J1J03431J512J1J1P4J1J2J131J40231J51331J33131J1G331J00531J0A2J1J02531J0Q1J1J521J1J51531I0E031J3Q131K&model_=ASUS+RTX+3060+Dual+V2+OC+&idSite_=1&idGood_=2066429',
      },
      {
        storeId: '6320c248332e9aa694fe5d6b',
        price: 17809,
        link: 'https://ek.ua/en/clcp.php?ep_=UVJU031J59031J45131J512J1J1P1J1J4I231J01331J51331J33131J1G331J00531J0A2J1J02531J0Q1J1J52231J51531I0E031J3A131K&model_=Asus+PCI-Ex+GeForce+RTX+3&idSite_=1&idGood_=2066429',
      },
    ],
    range: {
      minPrice: 16811,
      maxPrice: 21101,
    },
  },
  brand: 'NVIDIA',
  vendor: 'Asus',
  description:
    'Relatively compact and powerful 2021 mid-range gaming graphics card for balanced, reasonably priced gaming PCs equipped with FullHD monitors. It belongs to the Lite Hash Rate class video adapters, which are equipped with a hardware system for blocking the mining of the Ethereum cryptocurrency and some other altcoins, the generation of which is based on the popular Ethash algorithm. The key element of the Asus GeForce RTX 3060 Dual V2 OC LHR graphics card is the Nvidia GA106 GPU (Ampere, 8 nm manufacturing process), equipped with second-generation RT cores that allow you to build realistic 3D images with Real-Time Ray Tracing, providing a fundamentally new the level of reliability of lighting and reflections. Thanks to 3rd generation Tensor Cores, intelligent scaling technology based on Deep Learning Super Sampling (DLSS) deep learning algorithms is supported. It differs from similar models from other manufacturers by modest overall dimensions (only 200 mm long), moderate cost, the presence of factory overclocked GPU profiles and the use of a proprietary heat dissipation system, which consists of copper heat pipes with aluminium fins and a pair of durable Axial-tech fans. The graphics card has moderate power consumption (up to 170 W) and fits easily into small Minitower cases.',
  interface: 'PCI-E v4.0',
  GPUModel: 'NVIDIA GeForce RTX 3060',
  memorySize: '12 GB',
  memoryType: 'GDDR6',
  memoryBus: '192 bit',
  GPUClockSpeed: '1867 MHz',
  maxResolution: '7680x4320 px',
  HDMI: '1',
  HDMIVersion: 'v.2.1',
  displayPort: '3',
  displayPortVersion: 'v.1.4a',
  directX: '12 Ultimate',
  openGL: '4.6',
  isVRReady: true,
  streamProcessors: '3584',
  textureUnits: '112',
  monitorsConnection: '4',
  cooling: 'active (cooler)',
  fans: '2',
  additionalPower: '8 pin',
  minPSU: '650 W',
  numberOfSlots: '2',
  size: '200 mm / 200x123x38 /',
};

const tabs = ['', 'stores', 'reviews'];

const ProductScreen: React.FC = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const { id, category: paramsCategory, '*': paramsTab } = useParams();

  const [value, setValue] = useState<string>('');
  const [productCetgory, setProductCategory] = useState<ProductCategory | null>(
    null,
  );
  const [stores, setStores] = useState<Store[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const { setAlert } = useContext(UIContext);

  const functions = useFirebaseApp().functions(DEFAULT_REGION);

  const getStores = useCallback(
    () => functions.httpsCallable('getStores'),
    [functions],
  );

  useEffect(() => {
    const tab = paramsTab || '';
    const category: ProductCategory =
      ProductCategories[paramsCategory as CategoryName];
    const tabExists = tabs.includes(tab);
    if (category && tabExists) {
      setValue(tab);
      setProductCategory(category);
    } else {
      navigate('/404');
    }
  }, [paramsCategory, paramsTab, navigate]);

  useEffect(() => {
    const getStoresData = async () => {
      try {
        setIsLoading(true);

        // Will be used to fetch the products
        // const {data: product}: {data: FetchedProduct} = await getProduct()({id, category.collectionName});

        const storesId = mockProduct.price.offers.map((store) => store.storeId);

        const { data: newStores }: { data: Store[] } = await getStores()({
          storesId,
        });
        setStores(newStores);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: 'Could not fetch stores',
        });
      }
      setIsLoading(false);
    };

    getStoresData();
  }, [getStores, setAlert]);

  return (
    <Box className={styles.mainContainer}>
      <Typography variant="h2" gutterBottom>
        {mockProduct.name}
      </Typography>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" value="" />
          <Tab label="Reviews" value="reviews" />
          <Tab label="Stores" value="stores" />
        </Tabs>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <img
            className={styles.image}
            alt={mockProduct.name}
            src={mockProduct.mainImage}
          />
        </Box>
        {stores && <PriceTable price={mockProduct.price} stores={stores} />}
      </Box>
      {productCetgory && (
        <Routes>
          <Route
            path="/"
            element={
              <OverviewTab
                product={mockProduct}
                categoryName={productCetgory.categoryName}
              />
            }
          />
          <Route path="/reviews" element={<div>Nothing yet</div>} />
          <Route path="/stores" element={<div>Nothing yet</div>} />
        </Routes>
      )}
    </Box>
  );
};

export default ProductScreen;
