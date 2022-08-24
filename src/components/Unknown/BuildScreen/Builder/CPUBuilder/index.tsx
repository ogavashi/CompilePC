import React, { useState, useMemo, useContext } from 'react';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import { CollectionReference } from '@firebase/firestore-types';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct, { ProductSpecPropType } from '../BuilderProduct';
import { ProductCategoryByCollection } from '../../../../../common/constants';
import { CPU } from '../../../../../../types';
import normalizeProducts from '../../../../../common/normalizeProduct';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useFilterRef from '../../../../../hooks/useFilterRef';

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

  const { filter } = useFilterRef();

  const productRef = useMemo(() => {
    const baseRef = firestore.collection('CPUs');

    const filterRef = Object.keys(filter).reduce(
      (acc, current) =>
        acc.where(
          filter[current].name,
          filter[current].operator,
          filter[current].value,
        ) as CollectionReference,
      baseRef,
    );

    return filterRef;
  }, [filter, firestore]);

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
