import React, { useEffect, useState } from 'react';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct, { BuildProduct } from '../BuilderProduct';
import { ProductCategoryByCollection } from '../../../../../common/constants';
import { CPU } from '../../../../../../types';

const normalizeCPUs = (products: CPU[]) =>
  products.map(
    (product): BuildProduct => ({
      id: product.id,
      name: product.name,
      mainImage: product.mainImage,
      specs: [
        { name: 'Socket', value: product.socket },
        { name: 'Series', value: product.series },
        { name: 'Threads', value: product.threads },
      ],
    }),
  );

const CPUBuilder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(false);
  const [CPUs, setCPUs] = useState<BuildProduct[]>([]);

  const selectedProduct = CPUs.find((product) => product.id === selectedId);

  const handleAddProduct = (productId: string) => {
    setExpand(false);
    setSelectedId(productId);
  };

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  const firestore = useFirestore().collection('CPUs');
  const { data, status } = useFirestoreCollectionData<CPU>(firestore);

  useEffect(() => {
    if (status === 'success') {
      setCPUs(normalizeCPUs(data));
    }
  }, [data, status]);

  return (
    <ProductAccordion
      icon={CPUIcon}
      category={ProductCategoryByCollection.CPUs}
      selectedId={selectedId}
      expand={expand}
      toggleAccordion={toggleAccordion}
      selectedProduct={selectedProduct}
    >
      {CPUs &&
        CPUs.map((product) => (
          <BuilderProduct
            product={product}
            key={product.id}
            handleSelect={handleAddProduct}
            selectedId={selectedId}
          />
        ))}
    </ProductAccordion>
  );
};

export default CPUBuilder;
