import React, { useState, useMemo, useContext } from 'react';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct, { ProductSpecPropType } from '../BuilderProduct';
import { ProductCategoryByCollection } from '../../../../../common/constants';
import { CPU } from '../../../../../../types';
import normalizeProducts from '../../../../../common/normalizeProduct';
import { BuildScreenContext } from '../../../BuildScreenContext';

const CPUBuilder: React.FC = () => {
  const { handleSelectBuilder } = useContext(BuildScreenContext);
  const [selectedId, setSelectedId] = useState<string>('');
  const specs: ProductSpecPropType<CPU>[] = useMemo(
    () => [
      { propName: 'series', name: 'Series' },
      { propName: 'socket', name: 'Socket' },
      { propName: 'threads', name: 'Threads' },
    ],
    [],
  );
  const handleAddProduct = (productId: string) => {
    handleSelectBuilder(ProductCategoryByCollection.CPUs);
    setSelectedId(productId);
  };

  const firestore = useFirestore();

  const productRef = firestore.collection('CPUs');

  const { data: products, status } =
    useFirestoreCollectionData<CPU>(productRef);

  const normalizedProducts = useMemo(
    () => products && normalizeProducts(products, specs),
    [products, specs],
  );

  const selectedProduct = useMemo(
    () => normalizedProducts?.find((product) => product.id === selectedId),
    [normalizedProducts, selectedId],
  );

  return (
    <ProductAccordion
      icon={CPUIcon}
      category={ProductCategoryByCollection.CPUs}
      selectedId={selectedId}
      selectedProduct={selectedProduct}
    >
      {status === 'success' &&
        normalizedProducts?.map((product) => (
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
