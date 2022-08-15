import React, { useState } from 'react';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct from '../BuilderProduct';

const parts = [
  {
    id: '1',
    title: 'Ryzen 5 3600',
    price: 700,
    mainImage:
      'https://www.amd.com/system/files/2019-06/238593-ryzen-5-pib-left-facing-1260x709.png',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
  {
    id: '2',
    title: 'Ryzen 5 2600',
    price: 600,
    mainImage: 'https://mzimg.com/120/61/g4tmbzmxe61.jpg',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
  {
    id: '3',
    title: 'Ryzen 5 5600',
    price: 500,
    mainImage:
      'https://ae04.alicdn.com/kf/S99721446a0814d2e9340b7938ebc2ca4D/AMD-Ryzen-5-5600-R5-5600-3-5-6-12.png',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
];

const CPUBuilder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(false);

  const onClickAdd = (productId: string) => {
    setExpand(false);
    setSelectedId(productId);
  };

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  const products = parts.map((part) => (
    <BuilderProduct
      {...part}
      key={part.id}
      handleSelect={onClickAdd}
      selectedId={selectedId}
    />
  ));

  return (
    <ProductAccordion
      icon={CPUIcon}
      category="CPU"
      selectedId={selectedId}
      expand={expand}
      toggleAccordion={toggleAccordion}
    >
      {products}
    </ProductAccordion>
  );
};

export default CPUBuilder;
