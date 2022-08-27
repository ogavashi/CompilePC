import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useFirebaseApp } from 'reactfire';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct, { ProductSpecPropType } from '../BuilderProduct';
import {
  DEFAULT_REGION,
  ProductCategoryByCollection,
} from '../../../../../common/constants';
import { CPU } from '../../../../../../types';
import normalizeProducts from '../../../../../common/normalizeProduct';
import { UIContext } from '../../../UIContext';

const CPUBuilder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [expand, setExpand] = useState<boolean>(false);
  const specs: ProductSpecPropType<CPU>[] = useMemo(
    () => [
      { propName: 'series', name: 'Series' },
      { propName: 'socket', name: 'Socket' },
      { propName: 'threads', name: 'Threads' },
    ],
    [],
  );

  const handleAddProduct = (productId: string) => {
    setExpand(false);
    setSelectedId(productId);
  };

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  const functions = useFirebaseApp().functions(DEFAULT_REGION);

  const getProduct = useCallback(
    () => functions.httpsCallable('getProduct'),
    [functions],
  );

  const [products, setProducts] = useState<CPU[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAlert } = useContext(UIContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const { data: newProducts }: { data: CPU[] } = await getProduct()({
          collectionName: 'CPUs',
          filter: {},
        });
        setProducts(newProducts);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: 'Could not fetch products',
        });
      }
      setIsLoading(false);
    };

    getProducts();
  }, [getProduct, setAlert]);

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
      {!isLoading &&
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
