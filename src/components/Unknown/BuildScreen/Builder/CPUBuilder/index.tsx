import React, { useState, useMemo } from 'react';
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
  const specs = ['Series', 'Socket', 'Threads'];

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

  const normalizedProducts = useMemo(
    () => data && normalizeProducts(data, specs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const selectedProduct = useMemo(
    () =>
      normalizedProducts &&
      normalizedProducts.find((product) => product.id === selectedId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId],
  );

  return (
    <ProductAccordion
      icon={CPUIcon}
      category={ProductCategoryByCollection.CPUs}
      selectedId={selectedId}
      expand={expand}
      selectedProduct={selectedProduct}
      toggleAccordion={toggleAccordion}
    >
      {status === 'success' &&
        normalizedProducts &&
        normalizedProducts.map((product) => (
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
