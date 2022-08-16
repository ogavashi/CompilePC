import React, { useState } from 'react';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct from '../BuilderProduct';
import { ProductCategoryByCollection } from '../../../../../common/constants';
import { CPU } from '../../../../../../types';
import normalizeProducts from '../../../../../common/normalizeProduct';

const CPUBuilder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(false);

  const handleAddProduct = (productId: string) => {
    setExpand(false);
    setSelectedId(productId);
  };

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  const firestore = useFirestore();

  const productRef = firestore.collection('CPUs');

  const { data, status } = useFirestoreCollectionData<CPU>(productRef);

  const selectedProduct =
    data && data.find((product) => product.id === selectedId);

  return (
    <ProductAccordion
      icon={CPUIcon}
      category={ProductCategoryByCollection.CPUs}
      selectedId={selectedId}
      selectedProduct={
        selectedProduct && normalizeProducts([selectedProduct])[0]
      }
      expand={expand}
      toggleAccordion={toggleAccordion}
    >
      {status === 'success' &&
        normalizeProducts(data).map((product) => (
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
