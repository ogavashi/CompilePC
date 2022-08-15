import React from 'react';
import BuilderProduct from '.';

const BuilderProductExample = () => {
  return (
    <BuilderProduct
      id="1"
      title="AMD Ryzen 5 3600"
      imageUrl="https://www.amd.com/system/files/2019-06/238593-ryzen-5-pib-left-facing-1260x709.png"
      price={120}
      specs={[
        { name: 'Socket', value: 'AM4' },
        { name: 'Series', value: 'AMD Ryzen' },
      ]}
    />
  );
};

export default BuilderProductExample;
